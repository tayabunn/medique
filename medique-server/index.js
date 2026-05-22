// DNS settings removed as they can cause issues on Vercel boot

const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const { createRemoteJWKSet, jwtVerify } = require("jose");
dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("CRITICAL: MONGODB_URI is missing in environment variables!");
}
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["https://medique-client.vercel.app", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));
app.use(express.json());

// Root path health check - Move to top to prove server is running
app.get("/", (req, res) => {
  res.send("MediQue Server is running");
});

// Favicon fix
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Global error handlers to prevent function crashes
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

// Favicon handler already added at the top

let client;
let dbReady = false;
let tutorsCollection, bookingsCollection;

async function connectToDB() {
  if (dbReady) return;
  try {
    if (!client) {
      client = new MongoClient(uri, {
        serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
        serverSelectionTimeoutMS: 5000,
      });
    }
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    const db = client.db("medique");
    tutorsCollection = db.collection("tutors");
    bookingsCollection = db.collection("bookings");
    dbReady = true;
    console.log("Database collections initialized!");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}

// Initial connect call
connectToDB();

// JWKS from auth server - move outside run
let JWKS;
try {
  let clientUrl = process.env.CLIENT_URL || 'https://medique-client.vercel.app';
  if (!clientUrl.startsWith('http')) clientUrl = `https://${clientUrl}`;
  JWKS = createRemoteJWKSet(new URL(`${clientUrl}/api/auth/jwks`));
} catch (e) {
  console.error("JWKS Initialization Error:", e);
}

// Verify token middleware
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Unauthorized token" });
  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

app.get("/featured-tutors", async (req, res) => {
  await connectToDB();
  if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
  const result = await tutorsCollection.find().limit(6).toArray();
  res.json(result);
});

    app.get("/tutors", async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const { search, startDate, endDate } = req.query;
      const query = {};
      if (search) {
        query.$or = [
          { tutorName: { $regex: search, $options: "i" } },
          { subject: { $regex: search, $options: "i" } },
          { language: { $regex: search, $options: "i" } }
        ];
      }
      if (startDate || endDate) {
        query.sessionStartDate = {};
        if (startDate) query.sessionStartDate.$gte = startDate;
        if (endDate) query.sessionStartDate.$lte = endDate;
      }
      try {
        const result = await tutorsCollection.find(query).toArray();
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: "Search failed", error: err.message });
      }
    });

    app.get("/tutors/count", async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const count = await tutorsCollection.countDocuments();
      res.json({ count });
    });

app.post("/tutors/seed", async (req, res) => {
       await connectToDB();
       if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
       const sampleTutors = [
         {
           tutorName: "Dr. Sarah Johnson",
           slug: "dr-sarah-johnson",
           subject: "Mathematics",
           hourlyFee: 75,
           teachingMode: "Online",
           location: "New York, NY",
           photo: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80",
           totalSlot: 5,
           sessionStartDate: "2024-01-15",
           bio: "Expert in calculus and algebra with 10+ years experience",
           rating: 4.8,
           reviews: 124
         },
         {
           tutorName: "Prof. Michael Chen",
           slug: "prof-michael-chen",
           subject: "Physics",
           hourlyFee: 80,
           teachingMode: "Online",
           location: "San Francisco, CA",
           photo: "https://images.unsplash.com/photo-1507003211189-3e5dba8c60e3?w=600&q=80",
           totalSlot: 3,
           sessionStartDate: "2024-01-20",
           bio: "PhD in Theoretical Physics, loves making complex concepts simple",
           rating: 4.9,
           reviews: 89
         },
         {
           tutorName: "Emily Rodriguez",
           slug: "emily-rodriguez",
           subject: "Chemistry",
           hourlyFee: 65,
           teachingMode: "Offline",
           location: "Los Angeles, CA",
           photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
           totalSlot: 4,
           sessionStartDate: "2024-01-10",
           bio: "Organic chemistry specialist with practical lab experience",
           rating: 4.7,
           reviews: 67
         },
         {
           tutorName: "Dr. James Wilson",
           slug: "dr-james-wilson",
           subject: "Biology",
           hourlyFee: 70,
           teachingMode: "Online",
           location: "Chicago, IL",
           photo: "https://images.unsplash.com/photo-1559839734-27d0d4c2a4e0?w=600&q=80",
           totalSlot: 6,
           sessionStartDate: "2024-01-18",
           bio: "Molecular biology expert with research background",
           rating: 4.6,
           reviews: 92
         },
         {
           tutorName: "Lisa Thompson",
           slug: "lisa-thompson",
           subject: "Computer Science",
           hourlyFee: 85,
           teachingMode: "Online",
           location: "Austin, TX",
           photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
           totalSlot: 4,
           sessionStartDate: "2024-01-22",
           bio: "Full-stack developer teaching programming and algorithms",
           rating: 4.9,
           reviews: 156
         },
         {
           tutorName: "Robert Kim",
           slug: "robert-kim",
           subject: "Statistics",
           hourlyFee: 60,
           teachingMode: "Online",
           location: "Seattle, WA",
           photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
           totalSlot: 7,
           sessionStartDate: "2024-01-12",
           bio: "Data science professional with 8 years teaching experience",
           rating: 4.7,
           reviews: 78
         },
         {
           tutorName: "Dr. Amanda Lee",
           slug: "dr-amanda-lee",
           subject: "English Literature",
           hourlyFee: 55,
           teachingMode: "Offline",
           location: "Boston, MA",
           photo: "https://images.unsplash.com/photo-1438768570352-0c4d4b7c0c0f?w=600&q=80",
           totalSlot: 5,
           sessionStartDate: "2024-01-25",
           bio: "Literature PhD specializing in Shakespeare and modern classics",
           rating: 4.8,
           reviews: 95
         },
         {
           tutorName: "Carlos Martinez",
           slug: "carlos-martinez",
           subject: "Spanish",
           hourlyFee: 50,
           teachingMode: "Online",
           location: "Miami, FL",
           photo: "https://images.unsplash.com/photo-1552058547-13bfae83a203?w=600&q=80",
           totalSlot: 8,
           sessionStartDate: "2024-01-08",
           bio: "Native speaker teaching conversational Spanish and grammar",
           rating: 4.9,
           reviews: 112
         },
         {
           tutorName: "Dr. Rachel Green",
           slug: "dr-rachel-green",
           subject: "Psychology",
           hourlyFee: 75,
           teachingMode: "Online",
           location: "Denver, CO",
           photo: "https://images.unsplash.com/photo-1534528393725-4e6f0e0a2f5b?w=600&q=80",
           totalSlot: 3,
           sessionStartDate: "2024-01-30",
           bio: "Clinical psychologist teaching cognitive and behavioral psychology",
           rating: 4.8,
           reviews: 81
         },
         {
           tutorName: "Thomas Anderson",
           slug: "thomas-anderson",
           subject: "History",
           hourlyFee: 60,
           teachingMode: "Offline",
           location: "Portland, OR",
           photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
           totalSlot: 4,
           sessionStartDate: "2024-01-28",
           bio: "History professor specializing in American and European history",
           rating: 4.6,
           reviews: 63
         }
       ];
       await tutorsCollection.deleteMany({});
       const result = await tutorsCollection.insertMany(sampleTutors);
       res.json({ message: "10 tutors seeded successfully", insertedCount: result.insertedCount });
     });

    app.get("/tutors/subjects", async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const subjects = await tutorsCollection.distinct("subject");
      res.json(subjects);
    });

    app.get("/tutors/:id/availability", async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const { id } = req.params;
      let query;
      if (ObjectId.isValid(id)) {
        query = { _id: new ObjectId(id) };
      } else {
        query = { tutorName: { $regex: new RegExp(id.replace(/-/g, ' '), 'i') } };
      }
      const tutor = await tutorsCollection.findOne(query);
      if (!tutor) return res.status(404).json({ error: "Tutor not found" });
      const availability = {
        totalSlots: tutor.totalSlot || 0,
        sessionStartDate: tutor.sessionStartDate,
        available: (tutor.totalSlot || 0) > 0
      };
      res.json(availability);
    });

    app.get("/tutors/:id", async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const { id } = req.params;
      let query;
      if (ObjectId.isValid(id)) {
        query = { _id: new ObjectId(id) };
      } else {
        query = { $or: [{ slug: id }, { tutorName: { $regex: new RegExp(id.replace(/-/g, ' '), 'i') } }] };
      }
      const result = await tutorsCollection.findOne(query);
      res.json(result);
    });

    app.get("/my-tutors/:userId", verifyToken, async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const result = await tutorsCollection.find({ userId: req.params.userId }).toArray();
      res.json(result);
    });

    app.post("/tutor", verifyToken, async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const result = await tutorsCollection.insertOne(req.body);
      res.json(result);
    });

    app.patch("/tutor/:id", verifyToken, async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const result = await tutorsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      res.json(result);
    });

    app.delete("/tutor/:id", verifyToken, async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const result = await tutorsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.json(result);
    });

    app.post("/booking", verifyToken, async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const { tutorId } = req.body;
      const tutor = await tutorsCollection.findOne({ _id: new ObjectId(tutorId) });
      if (!tutor) return res.status(404).json({ error: "Tutor not found" });
      if (parseInt(tutor.totalSlot) <= 0) return res.status(400).json({ error: "No available slots left." });
      const today = new Date(); today.setHours(0,0,0,0);
      const sDate = new Date(tutor.sessionStartDate); sDate.setHours(0,0,0,0);
      if (today < sDate) return res.status(400).json({ error: "Booking is not available yet for this tutor." });

      const sessionToken = `MQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
      const result = await bookingsCollection.insertOne({
        ...req.body,
        sessionToken,
        status: "confirmed",
        bookedAt: new Date().toISOString(),
      });
      await tutorsCollection.updateOne({ _id: new ObjectId(tutorId) }, { $inc: { totalSlot: -1 } });
      res.json({ ...result, sessionToken });
    });

    app.get("/booking/:userId", verifyToken, async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const result = await bookingsCollection.find({ userId: req.params.userId }).toArray();
      res.json(result);
    });

    app.patch("/booking/:bookingId", verifyToken, async (req, res) => {
      await connectToDB();
      if (!dbReady) return res.status(503).json({ message: "Database connecting..." });
      const result = await bookingsCollection.updateOne(
        { _id: new ObjectId(req.params.bookingId) },
        { $set: { status: "cancelled" } }
      );
      res.json(result);
    });

// End of routes

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`MediQue server is running on port ${PORT}`);
  });
}

module.exports = app;
