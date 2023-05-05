import { SudokuContextProvider } from "./_context";
import Grid from "./_grid";
import Controls from "./_controls";

const Sudoku = () => {
  return (
    <>
      <SudokuContextProvider>
        <div className="flex flex-col space-y-3">
          <Grid />
          <Controls />
        </div>
      </SudokuContextProvider>
    </>
  );
};

export default Sudoku;
