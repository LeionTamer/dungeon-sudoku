import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

type SudokuStateType = {
  puzzle: string; // puzzle would be the original puzzle and will determine if the cell is disabled
  values: string; // this is where the user inputs would be stored
};

const initState: SudokuStateType = {
  puzzle:
    "...465......2..7..9....76..6....234..15...2.9.4...8........6..17.1...9.3..9...5..",
  values:
    "...465......2..7..9....76..6....234..15...2.9.4...8........6..17.1...9.3..9...5..",
};

const SudokuContext = createContext<{
  state: SudokuStateType;
  dispatch: Dispatch<Partial<SudokuStateType>>;
}>({
  state: initState,
  dispatch: () => null,
});

const reducer = (
  state: SudokuStateType,
  nextState: Partial<SudokuStateType>
): SudokuStateType => {
  return { ...state, ...nextState };
};

export const useSudokuContext = () => {
  const sudokuContext = useContext(SudokuContext);

  if (!sudokuContext) {
    throw new Error("Please use this context within the Sudoku Provider");
  }

  return sudokuContext;
};

export const SudokuContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <SudokuContext.Provider value={{ state, dispatch }}>
      {children}
    </SudokuContext.Provider>
  );
};
