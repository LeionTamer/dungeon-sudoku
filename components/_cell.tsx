import { KeyboardEvent } from "react";
import { useSudokuContext } from "./_context";

interface ICellProps {
  row: number;
  column: number;
  error?: boolean;
}

export default function Cell(props: ICellProps) {
  const { state, dispatch } = useSudokuContext();

  const handleChange = (index: number, value: string) => {
    if (parseInt(value) >= 1 && parseInt(value) <= 9 && value.length === 1) {
      let splitArray = values.split("");
      splitArray[index] = value;
      const updated = splitArray.join("");
      dispatch({ values: updated, error: undefined });
    }
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      let splitArray = values.split("");
      splitArray[index] = ".";
      const updated = splitArray.join("");
      dispatch({ values: updated, error: undefined });
    }
  };

  const puzzle = state.puzzle as string;
  const values = state.values as string;
  const { row, column, error } = props;

  const sudokuIndex = row * 9 + column;
  const disabled = puzzle[sudokuIndex] !== ".";
  const currentValue = disabled
    ? puzzle[sudokuIndex]
    : values[sudokuIndex] === "."
    ? undefined
    : values[sudokuIndex];

  return (
    <span
      className={`${
        disabled
          ? "bg-gray-500"
          : error
          ? `bg-red-100 opacity-90`
          : `bg-slate-200`
      } inline-block w-12 h-12 border ${
        column < 8 && (column + 1) % 3 === 0 && "border-r-4"
      } ${row < 8 && (row + 1) % 3 === 0 && "border-b-4"} border-sky-500`}
    >
      <input
        type="number"
        min="1"
        max="9"
        maxLength={1}
        className={`bg-transparent text-2xl w-10 ${
          error ? `text-red-700 font-bold` : ` text-slate-700`
        }`}
        value={currentValue || ""}
        onChange={(e) => {
          handleChange(sudokuIndex, e.currentTarget.value as string);
        }}
        onKeyUp={(e) => handleKeyPress(e, sudokuIndex)}
        disabled={disabled}
      />
    </span>
  );
}
