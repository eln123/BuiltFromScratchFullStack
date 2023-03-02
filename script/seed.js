"use strict";

const db = require("../server/db/index");
const Person = require("../server/db/models/index");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Persons
  const persons = await Promise.all([
    Person.create({
      name: "Hi",
    }),
    Person.create({
      name: "Hi#2",
    }),
  ]);

  console.log(`seeded ${persons.length} users`);
  console.log(`seeded successfully`);
  return {
    persons: {
      ethan: persons[0],
      helen: persons[1],
    },
  };
}

/*
   We've separated the `seed` function from the `runSeed` function.
   This way we can isolate the error handling and exit trapping.
   The `seed` function is concerned only with modifying the database.
  */
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
    Execute the `seed` function, IF we ran this module directly (`node seed`).
    `Async` functions always return a promise, so we can use `catch` to handle
    any errors that might occur inside of `seed`.
  */
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;