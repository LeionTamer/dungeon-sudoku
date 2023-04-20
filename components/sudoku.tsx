import { Fragment, useState, KeyboardEvent, useMemo } from "react";

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

  const Cell = ({
    row,
    column,
    error = false,
  }: {
    row: number;
    column: number;
    error?: boolean;
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
        } inline-block w-12 h-12 border ${
          column < 8 && (column + 1) % 3 === 0 && "border-r-4"
        } ${row < 8 && (row + 1) % 3 === 0 && "border-b-4"} border-sky-500`}
      >
        <input
          type="number"
          min="1"
          max="9"
          maxLength={1}
          className={`bg-transparent text-slate-700 text-2xl w-10 ${
            error && `text-red-700 font-bold`
          }`}
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
    const gridData = [...Array(9)].map((_, row) =>
      [...Array(9)].map((_, column) => values[row * 9 + column])
    );

    const getColumnArrays = () => {
      let columnArray = [];
      for (let column = 0; column <= 8; column++) {
        let rowArray = [];
        for (let row = 0; row <= 8; row++) {
          if (gridData[row][column] !== ".")
            rowArray.push(gridData[row][column]);
        }
        columnArray.push(rowArray);
      }
      return columnArray;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const columnValues = useMemo(getColumnArrays, []);

    const validColumn = (column: number, value: string) => {
      const count = columnValues[column].filter(
        (entry) => entry === value
      ).length;
      return count >= 2;
    };

    return (
      <>
        <div className="mx-auto p-0.5 border-4 border-green-700">
          {[...Array(9)].map((_, row) => {
            return (
              <div key={row} className="p-0 m-0 ">
                {[...Array(9)].map((_, column) => {
                  const error = validColumn(column, gridData[row][column]);
                  // console.log(columnValues[column]);
                  return (
                    <Cell
                      key={`${row}_${column}`}
                      column={column}
                      row={row}
                      error={error}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <Grid />
    </>
  );
};

export default Sudoku;
