import {InverseFizzBuzzAlgorithm} from "../src/InverseFizzBuzzAlgorithm";

describe("InverseFizzBuzzAlgorithm", () => {
    it("should return 9, 10 for input \"fizz buzz\"", () => {
        const inverseFizzBuzzAlgorithm = new InverseFizzBuzzAlgorithm("fizz buzz");

        expect(inverseFizzBuzzAlgorithm.execute()).toStrictEqual([9, 10]);
    });

    it("should reject non fizz buzz input tokens", () => {
        expect(() => new InverseFizzBuzzAlgorithm("incorrect tokens")).toThrowError();
    });

    it("should reject empty input sequence", () => {
        expect(() => new InverseFizzBuzzAlgorithm("")).toThrowError()
    });

    it("should reject improperly formatted input sequence", () => {
        expect(() => new InverseFizzBuzzAlgorithm("fizz ")).toThrowError()
    });

    it("should return empty list for impossible input", () => {
        // we can't find a sequence of numbers that result in "buzz buzz", there has to be a "fizz"
        // in between, since out of the 4 numbers in between the two that are dividable by 5,
        // there has to be at least one that can be divided by 3
        const inverseFizzBuzzAlgorithm = new InverseFizzBuzzAlgorithm("buzz buzz");

        expect(inverseFizzBuzzAlgorithm.execute()).toStrictEqual([]);
    })
});
