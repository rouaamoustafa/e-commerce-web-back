import bcrypt from "bcryptjs";

const dbHash = "$2b$10$xXJnkO8lOtaqAPvNKdS4Hu5RC/cnmwWusTJWVp3asfyfCgrrpvV5W"; // from your DB
const plaintext = "1111"; // the password you think the user typed

bcrypt.compare(plaintext, dbHash, (err, isMatch) => {
  if (err) {
    console.error("Error comparing:", err);
  } else {
    console.log(`Does "1111" match the hash?`, isMatch);
  }
});
const newPassword = "1111";
const saltRounds = 10;
const hashed = bcrypt.hashSync(newPassword, saltRounds);
console.log("New hash:", hashed);