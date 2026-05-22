// DEFINITIVE DNS FIX (Copied from working server)
const dns = require("node:dns");
if (typeof window === "undefined") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

import { betterAuth } from "better-auth";
import { MongoClient, ServerApiVersion } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
        // Forcing standard Node resolution behavior
        connectTimeoutMS: 20000,
        serverSelectionTimeoutMS: 20000,
    });
    global._mongoClientPromise = client.connect();
    console.log("Auth: Singleton connected to MongoDB Cluster.");
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

/**
 * Auth Client
 */
const connectedClient = await clientPromise;
const db = connectedClient.db("medique");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: connectedClient
  }),
  emailAndPassword:{
    enabled: true,
  },
  socialProviders:{
    google:{
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    }
  },
  session:{
    cookieCache:{
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 7, //7 days
    }
  },
  plugins:[
    jwt(),
  ]
});