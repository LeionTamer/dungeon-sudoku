import { useMemo } from "react";
import { useSudokuContext } from "./_context";
import Cell from "./_cell";

export default function Grid() {
  const { state } = useSudokuContext();

  const gridData = [...Array(9)].map((_, row) =>
    [...Array(9)].map((_, column) => state.values[row * 9 + column])
  );

  // These arrays would be referenced when checking for multiple occurences of values
  const getColumnArrays = () => {
    let columnArray = [];
    for (let column = 0; column <= 8; column++) {
      let rowArray = [];
      for (let row = 0; row <= 8; row++)
        if (gridData[row][column] !== ".") rowArray.push(gridData[row][column]);
      columnArray.push(rowArray);
    }
    return columnArray;
  };
  const getRowArrays = () => {
    let rowArray = [];
    for (let row = 0; row <= 8; row++) {
      let columnArray = [];
      for (let column = 0; column <= 8; column++)
        if (gridData[row][column] !== ".")
          columnArray.push(gridData[row][column]);
      rowArray.push(columnArray);
    }
    return rowArray;
  };
  const getGridArrays = () => {
    let gridArray = [];
    for (let gridRow = 0; gridRow <= 8; gridRow += 3) {
      for (let gridColumn = 0; gridColumn <= 8; gridColumn += 3) {
        let squareArray = [];
        for (let row = gridRow; row <= gridRow + 2; row++) {
          for (let column = gridColumn; column <= gridColumn + 2; column++) {
            if (gridData[row][column] !== ".")
              squareArray.push(gridData[row][column]);
          }
        }
        gridArray.push(squareArray);
      }
    }
    return gridArray;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnValues = useMemo(getColumnArrays, [gridData]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rowValues = useMemo(getRowArrays, [gridData]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const gridValues = useMemo(getGridArrays, [gridData]);

  // These would be the validation checks for mutliple entries in the array (see reference above)
  const invalidColumn = (column: number, value: string) => {
    const count = columnValues[column].filter(
      (entry) => entry === value
    ).length;
    return count >= 2;
  };
  const invalidRows = (row: number, value: string) => {
    const count = rowValues[row].filter((entry) => entry === value).length;
    return count >= 2;
  };
  const invalidGrid = (row: number, column: number, value: string) => {
    const index = Math.floor(row / 3) * 3 + Math.floor(column / 3);
    const count = gridValues[index].filter((entry) => entry === value).length;
    return count >= 2;
  };

  return (
    <>
      <div className="mx-auto p-0.5 border-4 border-green-700">
        {[...Array(9)].map((_, row) => {
          return (
            <div key={row} className="p-0 m-0 ">
              {[...Array(9)].map((_, column) => {
                const error =
                  invalidColumn(column, gridData[row][column]) ||
                  invalidRows(row, gridData[row][column]) ||
                  invalidGrid(row, column, gridData[row][column]);
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
}
