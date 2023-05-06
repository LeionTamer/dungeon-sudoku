export type GenerateSudokuType = {
  puzzle: string
  seed: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export type SolveSudokuRequestType = {
  values: string
}

export type SolveSudokuResponseType = {
  result: 'unique solution' | 'no solutions'
  solution?: string
}