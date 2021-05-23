type FizzBuzzToken = ("fizz" | "buzz" | "fizzbuzz")

export class InverseFizzBuzzAlgorithm {
    private inputTokens: FizzBuzzToken[];
    private static possibleElements = ["fizz", "buzz", "fizzbuzz"];

    constructor(fizzBuzzSequence: string) {
        let fizzBuzzTokens = fizzBuzzSequence.split(" ");

        if(InverseFizzBuzzAlgorithm.isCorrectTokenList(fizzBuzzTokens)) {
            this.inputTokens = fizzBuzzTokens;
        } else {
            throw Error("Incorrect fizz buzz sequence")
        }
    }

    private static isCorrectTokenList(fizzBuzzTokens: string[]): fizzBuzzTokens is FizzBuzzToken[] {
        if(fizzBuzzTokens.length === 0) return false;

        for (const token of fizzBuzzTokens) {
            if(!InverseFizzBuzzAlgorithm.possibleElements.includes(token)) {
                return false
            }
        }
        return true
    }

    public execute(): number[] {
        const numbersAndTokens: Map<number, FizzBuzzToken | ""> = this.getFirstHundredFizzBuzzTokens();
        const matchingSublists = this.getMatchingSublists(numbersAndTokens, this.inputTokens);
        console.log(matchingSublists);
        return this.getShortestSublist(matchingSublists);
    }

    private getFirstHundredFizzBuzzTokens():  Map<number, FizzBuzzToken | ""> {
        const numbersAndTokens: Map<number, FizzBuzzToken | ""> = new Map();
        for (let i = 1; i <= 100; i++) {
            numbersAndTokens.set(i, this.getFizzBuzzToken(i))
        }
        return numbersAndTokens;
    }

    private getFizzBuzzToken(number: number): FizzBuzzToken | "" {
        let returnValue = "";
        if(number % 3 === 0) {
            returnValue += "fizz";
        }
        if(number % 5 === 0) {
            returnValue += "buzz";
        }
        return returnValue as FizzBuzzToken | "";
    }

    // this is the heart of the algorithm: we look for all the possible number sequences that result in the same output
    // as the input string, then we find the shortest among those
    private getMatchingSublists(numbersAndTokens: Map<number, FizzBuzzToken | "">, inputTokens: FizzBuzzToken[]) {
        const matchingSublists: number[][] = [];
        const numbersAndTokensList = Array.from(numbersAndTokens.entries());
        const numberIndex = 0;
        const tokenIndex = 1;

        // we only want to iterate until the last element from which we can construct a sequence,
        // e.g: if the input sequence is 3 tokens long, we need at least 3 numbers to construct it from,
        // so we don't need to check from the 99th or 100th element onward
        for (let i = 0; i < numbersAndTokensList.length - inputTokens.length; i++) {
            // a minimal length sequence wouldn't start off with an empty string so let's skip those
            if(numbersAndTokensList[i][tokenIndex] === "") continue;

            // we start from every entry and look from there onwards to see if we can find a sequence of numbers that
            // results in the same fizzbuzz output as the input string
            let matchingSublist: number[] | null = [];
            let currentInputTokenIndex = 0; // we have to track the index of the input tokens separately since we only move forward with them when we find non-empty tokens
            for (let j = 0; j < numbersAndTokensList.length - i && currentInputTokenIndex < inputTokens.length; j++) {
                const currentToken = numbersAndTokensList[i + j][tokenIndex];
                if(currentToken === "") {
                    // if we're already in the process of finding a match, let's put the numbers in the sequence
                    // that have an empty token since they don't change the fizzbuzz output
                    if(matchingSublist!==[]) {
                        matchingSublist.push(numbersAndTokensList[i + j][numberIndex]);
                    }
                    continue
                }
                // if we differ anywhere in our sequence from the one we're trying to match, we jump ship
                if(currentToken !== inputTokens[currentInputTokenIndex]){
                    matchingSublist = null;
                    break
                }

                // we found a match, let's move forward to the next token in the input sequence
                matchingSublist.push(numbersAndTokensList[i + j][numberIndex]);
                currentInputTokenIndex++
            }
            if(matchingSublist !== null) {
                matchingSublists.push(matchingSublist)
            }
        }

        return matchingSublists
    }

    private getShortestSublist(matchingSublists: number[][]) {
        if(matchingSublists.length == 0) return [];

        let sublistToReturn: number[] = matchingSublists[0];
        for (let matchingSublist of matchingSublists) {
            if(matchingSublist.length < sublistToReturn.length) {
                sublistToReturn = matchingSublist
            }
        }

        return sublistToReturn;
    }
}
