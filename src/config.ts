require("dotenv").config();

export const PORT = process.env.PORT || 3000;
export const JWT_KEY = <string>process.env.JWT_KEY;
