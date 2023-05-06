import { SolveSudokuRequestType } from "@/types/sudoku";
import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.SUDOKU_API_KEY

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // console.table(req.body)
      const request = JSON.parse(req.body) as SolveSudokuRequestType
      const puzzle = request.values

      fetch(`https://sudoku-generator1.p.rapidapi.com/sudoku/solve?puzzle=${puzzle}`,
        {
          headers: {
            'X-RapidAPI-Key': API_KEY as string,
            'X-RapidAPI-Host': 'sudoku-generator1.p.rapidapi.com'
          },
        })
        .then(response => response.json())
        .then(data => {
          res.status(200).send(data)
        })

    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    const error = new Error('Not allowed')
    res.status(405).send(error)
  }
}