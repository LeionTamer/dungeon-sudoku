import { GenerateSudokuType, SolveSudokuResponseType } from "@/types/sudoku";
import { useSudokuContext } from "./_context";

export default function Controls() {
  const { state, dispatch } = useSudokuContext();

  const generatePuzzle = async () => {
    const response = await fetch("/api/generate");
    const data = (await response.json()) as GenerateSudokuType;

    dispatch({ puzzle: data.puzzle, values: data.puzzle, error: undefined });
  };

  const solvePuzzle = async () => {
    const response = await fetch("/api/solve", {
      method: "POST",
      body: JSON.stringify({
        values: state.values,
      }),
    });

    try {
      const data = (await response.json()) as SolveSudokuResponseType;

      if (data.solution) {
        dispatch({ values: data.solution, error: undefined });
      } else {
        dispatch({ error: "cannot find a solution" });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const disableSolve = state.values.length === 0 || !state.values.includes(".");

  return (
    <div>
      <button className="btn m-2" onClick={generatePuzzle}>
        Generate Puzzle
      </button>
      <button
        className={`btn m-2 ${disableSolve && `bg-slate-500`}`}
        disabled={disableSolve}
        onClick={solvePuzzle}
      >
        Solve Puzzle
      </button>
      {state.error && (
        <div className="text-red-700 bg-red-200 m-2">{state.error}</div>
      )}
    </div>
  );
}
