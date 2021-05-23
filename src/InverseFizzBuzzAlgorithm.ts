type FizzBuzzToken = ("fizz" | "buzz" | "fizzbuzz")

export class InverseFizzBuzzAlgorithm {
    private fizzBuzzTokens: FizzBuzzToken[];
    private static possibleElements = ["fizz", "buzz", "fizzbuzz"];

    constructor(fizzBuzzSequence: string) {
        let fizzBuzzTokens = fizzBuzzSequence.split(" ");

        if(this.isCorrectTokenList(fizzBuzzTokens)) {
            this.fizzBuzzTokens = fizzBuzzTokens;
        } else {
            throw Error("Incorrect fizz buzz sequence")
        }
    }

    private isCorrectTokenList(fizzBuzzTokens: string[]): fizzBuzzTokens is FizzBuzzToken[] {
        for (const token of fizzBuzzTokens) {
            if(!InverseFizzBuzzAlgorithm.possibleElements.includes(token)) {
                return false
            }
        }
        return true
    }

    public execute(): number[] {
        return []
    }
}
