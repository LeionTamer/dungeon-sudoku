// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GenerateSudokuType } from '@/types/sudoku'
import type { NextApiRequest, NextApiResponse } from 'next'

const API_KEY = process.env.SUDOKU_API_KEY

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateSudokuType | Error>
) {
  try {
    fetch('https://sudoku-generator1.p.rapidapi.com/sudoku/generate', {
      headers: {
        'X-RapidAPI-Key': API_KEY as string,
        'X-RapidAPI-Host': 'sudoku-generator1.p.rapidapi.com'
      },
    }).then(response => response.json())
      .then(data => {
        res.status(200).send(data)
      })

  } catch (e) {
    const error = new Error("something went wrong")
    res.status(500).send(error)
  }
}
