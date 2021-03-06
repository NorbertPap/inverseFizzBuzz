type FizzBuzzToken = "fizz" | "buzz" | "fizzbuzz";

export class InverseFizzBuzzAlgorithm {
  private readonly inputTokens: FizzBuzzToken[];

  constructor(fizzBuzzSequence: string) {
    const fizzBuzzTokens = fizzBuzzSequence.split(" ");

    if (InverseFizzBuzzAlgorithm.isCorrectTokenList(fizzBuzzTokens)) {
      this.inputTokens = fizzBuzzTokens;
    } else {
      throw Error("Incorrect fizz buzz sequence");
    }
  }

  private static isCorrectTokenList(
    fizzBuzzTokens: string[]
  ): fizzBuzzTokens is FizzBuzzToken[] {
    return fizzBuzzTokens.reduce(
      (isCorrect: boolean, token: string) =>
        isCorrect && ["fizz", "buzz", "fizzbuzz"].includes(token),
      true
    );
  }

  public execute(): number[] {
    const numbersAndTokens: Map<number, FizzBuzzToken | ""> =
      this.getFirstHundredFizzBuzzTokens();
    const matchingSublists = this.getMatchingSublists(
      numbersAndTokens,
      this.inputTokens
    );
    return this.getShortestSublist(matchingSublists);
  }

  private getFirstHundredFizzBuzzTokens(): Map<number, FizzBuzzToken | ""> {
    const numbersAndTokens: Map<number, FizzBuzzToken | ""> = new Map();
    for (let i = 1; i <= 100; i++) {
      numbersAndTokens.set(i, this.getFizzBuzzToken(i));
    }
    return numbersAndTokens;
  }

  private getFizzBuzzToken(number: number): FizzBuzzToken | "" {
    return `${number % 3 === 0 ? "fizz" : ""}${
      number % 5 === 0 ? "buzz" : ""
    }` as FizzBuzzToken | "";
  }

  // this is the heart of the algorithm: in here we look for all the possible
  // number sequences that result in the same output as the input string
  private getMatchingSublists(
    numbersAndTokens: Map<number, FizzBuzzToken | "">,
    inputTokens: FizzBuzzToken[]
  ) {
    const matchingSublists: number[][] = [];
    const numbersAndTokensList = Array.from(numbersAndTokens.entries());

    // we only want to iterate until the last element from which we can construct a sequence,
    // e.g: if the input sequence is 3 tokens long, we need at least 3 numbers to construct it from,
    // so we don't need to check from the 99th or 100th element onward
    for (let i = 0; i < numbersAndTokensList.length - inputTokens.length; i++) {
      // a minimal length sequence wouldn't start off with an empty string so let's skip those
      if (numbersAndTokensList[i][1] === "") continue;

      // we start from every entry and look from there onwards to see if we can find a sequence of numbers that
      // results in the same fizzbuzz output as the input string
      const matchingSublist = this.lookForwardToGetMatch(
        numbersAndTokensList,
        i,
        inputTokens
      );
      if (matchingSublist) matchingSublists.push(matchingSublist);
    }

    return matchingSublists;
  }

  private lookForwardToGetMatch(
    numbersAndTokensList: [number, "" | FizzBuzzToken][],
    starterIndex: number,
    inputTokens: FizzBuzzToken[]
  ) {
    const numberIndex = 0;
    const tokenIndex = 1;

    let matchingSublist: number[] | null = [];
    // we have to track the index of the input tokens separately since we only move forward within them when we find non-empty tokens
    let currentInputTokenIndex = 0;
    for (
      let j = 0;
      j < numbersAndTokensList.length - starterIndex &&
      currentInputTokenIndex < inputTokens.length;
      j++
    ) {
      const currentToken = numbersAndTokensList[starterIndex + j][tokenIndex];
      if (currentToken === "") {
        // if we're already in the process of finding a match, let's put the numbers in the sequence
        // that have an empty token since they don't change the fizzbuzz output
        if (matchingSublist.length !== 0) {
          matchingSublist.push(
            numbersAndTokensList[starterIndex + j][numberIndex]
          );
        }
        continue;
      }
      // if we differ anywhere in our sequence from the one we're trying to match, we jump ship
      if (currentToken !== inputTokens[currentInputTokenIndex]) {
        matchingSublist = null;
        break;
      }

      // we found a match, let's move forward to the next token in the input sequence
      matchingSublist.push(numbersAndTokensList[starterIndex + j][numberIndex]);
      currentInputTokenIndex++;
    }
    return matchingSublist;
  }

  private getShortestSublist(matchingSublists: number[][]): number[] {
    return matchingSublists.reduce(
      (shortest, current) =>
        (shortest = current.length < shortest.length ? current : shortest),
      matchingSublists[0] || []
    );
  }
}
