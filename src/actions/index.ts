type SquareType = string | null;

export interface SquareProps {
  value: SquareType;
  onClick: () => void;
}

export interface BoardState {
  squares: SquareType[];
  xIsNext?: boolean;
  onClick: (arg0: number) => void;
}
