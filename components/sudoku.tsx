import { Fragment, useState, KeyboardEvent } from "react";

const Sudoku = () => {
  const puzzle =
    "...465......2..7..9....76..6....234..15...2.9.4...8........6..17.1...9.3..9...5..";
  const [values, setValues] = useState(
    "...465......2..7..9....76..6....234..15...2.9.4...8........6..17.1...9.3..9...5.."
  );

  const handleChange = (index: number, value: string) => {
    if (parseInt(value) >= 1 && parseInt(value) <= 9 && value.length === 1) {
      let splitArray = values.split("");
      splitArray[index] = value;
      const updated = splitArray.join("");
      setValues(updated);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);

    if (!e.repeat) e.preventDefault();
    e.stopPropagation();
  };

  const Cell = ({ row, column }: { row: number; column: number }) => {
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
          disabled ? "bg-gray-500" : "bg-slate-200"
        } inline-block w-12 h-12 border ${
          column < 8 && (column + 1) % 3 === 0 && "border-r-4"
        } ${row < 8 && (row + 1) % 3 === 0 && "border-b-4"} border-sky-500`}
      >
        <input
          type="number"
          min="1"
          max="9"
          maxLength={1}
          className="bg-transparent text-slate-700 text-2xl w-10"
          value={currentValue}
          onChange={(e) => {
            handleChange(sudokuIndex, e.currentTarget.value as string);
          }}
          onBlur={() => console.log("I was called")}
          disabled={disabled}
        />
      </span>
    );
  };

  const Grid = () => {
    return (
      <div className="mx-auto p-0.5 border-4 border-green-700">
        {[...Array(9)].map((_, row) => {
          return (
            <div key={row} className="p-0 m-0 ">
              {[...Array(9)].map((_, column) => (
                <Cell key={`${row}_${column}`} column={column} row={row} />
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Grid />
    </>
  );
};

export default Sudoku;
