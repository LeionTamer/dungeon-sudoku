import { GenerateSudokuType } from "@/types/sudoku";
import { useSudokuContext } from "./_context";

export default function Controls() {
  const { dispatch } = useSudokuContext();

  const generatePuzzle = async () => {
    const response = await fetch("/api/generate");
    const data = (await response.json()) as GenerateSudokuType;

    dispatch({ puzzle: data.puzzle, values: data.puzzle });

    console.log(data);
  };

  return (
    <div>
      <button className="btn" onClick={generatePuzzle}>
        Generate Puzzle
      </button>
    </div>
  );
}
