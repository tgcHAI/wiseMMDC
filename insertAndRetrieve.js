const { MongoClient } = require('mongodb');
require("node:dns/promises").setServers(["1.1.1.1","8.8.8.8"]);

// Insert your MongoDB Atlas connection string here
const uri = "mongodb+srv://AA_WebTech_App_Group5:6QK7n0WCe0Vx2y9d@cluster0.yw71yag.mongodb.net/testDB?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    const database = client.db("testDB");
    const usersCollection = database.collection("Users");
    
// You can edit the user profile data as needed
    const userProfile = {
      user_id: "102",
      name: "Samantha",
      email: "samantha@example.com",
      role: "Admin",
      date_joined: new Date().toISOString()
    };

    const result = await usersCollection.insertOne(userProfile);
    console.log("Inserted ID:", result.insertedId);

    const query = { user_id: "101" };
    const user = await usersCollection.findOne(query);
    console.log("Retrieved user:", user);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);