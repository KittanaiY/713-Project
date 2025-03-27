import { createAdmin } from './db/createadmin';
import { createAdvisor } from './db/createadvisor';
import { createStudent } from './db/createstudent';
import { createComment } from './db/createcomment';
import { createAppointment } from './db/createappointment';
import { createAnnouncement } from './db/createannouncement';

async function seed() {
  try {
    console.log("Creating admin...");
    await createAdmin();

    console.log("Creating advisors...");
    const advisors = await createAdvisor();

    console.log("Creating students...");
    const students = await createStudent();

    console.log("Creating comments...");
    const comments = await createComment();

    console.log("Creating appointments...");
    const appointments = await createAppointment();

    console.log("Creating announcements...");
    const announcements = await createAnnouncement();

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});