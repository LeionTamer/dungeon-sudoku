import { Fragment, useState } from "react";

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
    const updated = values.split("").splice(index, 1, value).join();
    setValues(updated);
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
    return (
      <span
        className={`${disabled ? "bg-gray-500" : "bg-slate-200"} w-12 h-12`}
      >
        <input
          type="number"
          min="1"
          max="9"
          className="bg-transparent text-slate-700 text-2xl "
          value={values[sudokuIndex]}
          onChange={(e) =>
            handleChange(sudokuIndex, e.currentTarget.value as string)
          }
          defaultValue={puzzle[sudokuIndex]}
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
