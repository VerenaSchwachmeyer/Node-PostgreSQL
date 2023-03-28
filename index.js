const app = require("./server");
const port = 8000;
require("dotenv").config();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
