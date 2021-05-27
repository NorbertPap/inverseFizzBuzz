import { InverseFizzBuzzAlgorithm } from "./InverseFizzBuzzAlgorithm";

const input = "fizz buzz";
console.log(
  `For input "${input}", output is: ${new InverseFizzBuzzAlgorithm(
    input
  ).execute()}`
);
