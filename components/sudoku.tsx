import { Fragment, useState, KeyboardEvent } from "react";

const Sudoku = () => {
  const puzzle =
    "...465......2..7..9....76..6....234..15...2.9.4...8........6..17.1...9.3..9...5..";
  const [values, setValues] = useState(
    "...465......2..7..9....76..6....234..15...2.9.4...8........6..17.1...9.3..9...5.."
  );

  // for the answer, have array and find the index and replace it on Blur

  // puzzleNumber => disabled if defined and set it as value if defined value = puzzleNumber ?? answers[aIndex]
  // onBlur function => setAnswer (), validateCell

  const handleChange = (index: number, value: string) => {
    if (parseInt(value) >= 1 && parseInt(value) <= 9) {
      const updated = values.split("").splice(index, 1, value).join();
      setValues(updated);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    console.table(e);
  };

  const Cell = ({
    row,
    column,
  }: // puzzleNumber,
  {
    row: number;
    column: number;
    // puzzleNumber: string | undefined;
  }) => {
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
        } inline-block w-12 h-12 border border-sky-500`}
      >
        <input
          type="number"
          min="1"
          max="9"
          className="bg-transparent text-slate-700 text-2xl w-10"
          value={currentValue}
          onKeyUp={(e) => handleKeyPress(e)}
          onChange={(e) =>
            handleChange(sudokuIndex, e.currentTarget.value as string)
          }
          onBlur={() => console.log("I was called")}
          // defaultValue={puzzle[sudokuIndex]}
          disabled={disabled}
        />
      </span>
    );
  };

  const Grid = () => {
    return (
      <div className="m-0 p-0">
        {[...Array(9)].map((_, row) => {
          return (
            <div key={row} className="p-0 m-0 ">
              {[...Array(9)].map((_, column) => (
                <Cell
                  key={`${row}_${column}`}
                  column={column}
                  row={row}
                  // puzzleNumber={puzzle[row]}
                />
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
