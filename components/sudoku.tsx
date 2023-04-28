import { SudokuContextProvider } from "./_context";
import Grid from "./_grid";

const Sudoku = () => {
  return (
    <>
      <SudokuContextProvider>
        <Grid />
      </SudokuContextProvider>
    </>
  );
};

export default Sudoku;
