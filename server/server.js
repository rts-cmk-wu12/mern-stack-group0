import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

// MongoDB connection URI
const uri =
"mongodb+srv://farzana1984bd:0D2RSFqkq2nFKPA4@mongo.icgkx.mongodb.net/blogdb"
const client = new MongoClient(uri);

// Connect to MongoDB
let db;
client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    db = client.db(); // Access the database
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

app.use(
  cors({
    origin: corsOptions.origin,
    credentials: true,
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// RESTful API Endpoints

// GET /api/posts - Get a list of all blog posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await db.collection("posts").find().toArray();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
});

// GET /api/posts/:id - Get details about a single blog post
app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post", error });
  }
});

// POST /api/posts - Create a new blog post
app.post("/api/posts", async (req, res) => {
  const { title, author, content, tags, coverImage } = req.body;
  if (!title || !author || !content) {
    return res
      .status(400)
      .json({ message: "Title, author, and content are required" });
  }

  const newPost = {
    title,
    author,
    content,
    tags: tags || [],
    coverImage: coverImage || "",
    createdAt: new Date(),
  };

  try {
    const result = await db.collection("posts").insertOne(newPost);
    res.status(201).json({
      message: "Post created successfully",
      postId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
});

// PUT /api/posts/:id - Update an existing blog post
app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, content, tags, coverImage } = req.body;

  try {
    const updatedPost = {
      ...(title && { title }),
      ...(author && { author }),
      ...(content && { content }),
      ...(tags && { tags }),
      ...(coverImage && { coverImage }),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("posts")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedPost });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error });
  }
});

// DELETE /api/posts/:id - Delete a blog post
app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
