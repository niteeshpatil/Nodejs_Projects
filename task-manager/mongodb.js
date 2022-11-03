const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";

const databaseName = "task-manager";

const id = new ObjectID();

// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     name: "laxman",
    //     age: 22,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("unable to insert user");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    //     db.collection("users").insertMany(
    //       [
    //         { name: "sateesh", age: 20 },
    //         {
    //           name: "manju",
    //           age: 22,
    //         },
    //       ],
    //       (error, result) => {
    //         if (error) {
    //           return console.log("unable to insert");
    //         }

    //         console.log(result.ops);
    //       }
    //     );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "recode writeup",
    //       complited: false,
    //     },
    //     {
    //       description: "dsa problem's ",
    //       complited: true,
    //     },
    //     {
    //       description: "devlopment",
    //       complited: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("unable to insert");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").findOne(
    //   { _id: new ObjectID("636361100302a5387c3f2a4a") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("unable to fecht");
    //     }

    //     console.log(user);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 22 })
    //   .toArray((error, users) => {
    //     if (error) {
    //       return console.log("unable to fecht");
    //     }

    //     console.log(users);
    //   });

    // db.collection("tasks")
    //   .find({ complited: false })
    //   .toArray((error, tasks) => {
    //     if (error) {
    //       return console.log("unable to fecht");
    //     }

    //     console.log(tasks);
    //   });
  }
);
