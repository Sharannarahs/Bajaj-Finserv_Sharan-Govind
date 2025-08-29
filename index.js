const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

function alternatingCaps(str) {
  let result = "";
  let upper = true;
  for (let char of str) {
    result += upper ? char.toUpperCase() : char.toLowerCase();
    upper = !upper;
  }
  return result;
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) throw new Error("Data must be an array");

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let lettersConcat = "";

    data.forEach((item) => {
      if (!isNaN(item)) {
        let num = Number(item);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item.toString());
        else odd_numbers.push(item.toString());
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        lettersConcat += item;
      } else {
        special_characters.push(item);
      }
    });

    let concat_string = alternatingCaps(lettersConcat.split("").reverse().join(""));

    res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(400).json({ is_success: false, message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
