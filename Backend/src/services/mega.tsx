// mega.js
import { Storage } from "megajs";
import { config } from "../config.js";

export const megaStorage = new Storage({
  email: config.email,    // your MEGA account email
  password: config.password, // your MEGA password
}, function(err) {
  if (err) throw err;
  console.log("Connected to MEGA");
});
