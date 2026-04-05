require("dotenv").config();
const app = require("./src/app");

app.listen(3000, () => {
  console.log("server run on port 3000");
});
