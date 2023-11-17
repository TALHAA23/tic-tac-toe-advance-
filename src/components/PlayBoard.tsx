import React from "react";
import { Sign } from "../assets/type";
import Mark from "./Mark";
import { useToggleTurn, useTurn } from "../hooks/TurnAndToggleProvider";
import { MouseEvent, ReactElement, useEffect, useRef, useState } from "react";
import {
  useBoard,
  useBoardChangeHandler,
  useWinner,
} from "../hooks/WinnerProvider";
import Result from "./Result";
import readURL from "../assets/readURL";
import updateUIforCurrentMove from "../assets/updateUIforCurrentMove";
import { useBoardTheme } from "../hooks/ThemeProvider";

export default function PlayBoard() {
  const [boxes, setBoxes] = useState<undefined | ReactElement[]>();
  const winnerAttributes = useWinner();
  const turn = useTurn();
  const { grid } = readURL();

  useEffect(() => {
    const renderBoxes: ReactElement[] = [];
    for (let i = 0; i < grid; i++)
      for (let j = 0; j < grid; j++)
        renderBoxes.push(<Box key={`${i},${j}`} cords={`${i},${j}`} />);
    setBoxes(renderBoxes);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center font-[playPretend]">
      <div
        className={`w-[90%] aspect-square max-w-[500px] ${
          turn.title == "Computer" && "opacity-50 pointer-events-none"
        }`}
      >
        <h1
          className={`my-6 py-2 w-auto border text-center rounded-md  text-black/80 ${
            turn.sign == "X" ? "bg-red-400/50" : "bg-blue-500/60"
          } `}
        >
          {turn.title}
        </h1>
        <div
          className={`w-full h-full p-1 grid gap-1 ${useBoardTheme()}`}
          style={{ gridTemplateColumns: `repeat(${grid},1fr)` }}
        >
          {boxes}
        </div>
      </div>
      {winnerAttributes.isAnnounced && <Result />}
    </section>
  );
}

interface BoxProps {
  cords: string;
}

const Box = React.memo((props: BoxProps) => {
  const board = useBoard();
  const boxReverseCount = useRef(0);
  const [x, y] = props.cords.split(",");
  const turn = useTurn();
  const toogleTurn = useToggleTurn();
  const boardChangeHandler = useBoardChangeHandler();
  const currentCord: Sign = board[x][y];

  function markCurrentBox(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    toogleTurn();
    boardChangeHandler(target.id, turn.sign);
    updateUIforCurrentMove(target);
  }

  return (
    <div
      onClick={(e) => markCurrentBox(e)}
      id={props.cords}
      data-reserve-count={boxReverseCount.current}
      className="relative rounded border border-slate-600/30 flex items-center justify-center"
    >
      <Mark markedBy={currentCord} />
    </div>
  );
});

// function Box(props: BoxProps) {
//   console.log("creating");
//   const board = useBoard();
//   const boxReverseCount = useRef(0);
//   const [x, y] = props.cords.split(",");
//   const turn = useTurn();
//   const toogleTurn = useToggleTurn();
//   const boardChangeHandler = useBoardChangeHandler();
//   const currentCord: Sign = board[x][y];

//   function markCurrentBox(event: MouseEvent) {
//     const target = event.currentTarget as HTMLElement;
//     toogleTurn();
//     boardChangeHandler(target.id, turn.sign);
//     updateUIforCurrentMove(target);
//   }

//   return (
//     <div
//       onClick={(e) => markCurrentBox(e)}
//       id={props.cords}
//       data-reserve-count={boxReverseCount.current}
//       className="relative rounded border border-slate-600/30 flex items-center justify-center"
//     >
//       <Mark markedBy={currentCord} />
//     </div>
//   );
// }

// function createBoxes() {
//   const { grid } = readURL();
//   console.log(grid);
//   const renderBoxes: ReactElement[] = [];
//   return () => {
//     if (renderBoxes.length) return renderBoxes;
//     console.log("creating");
//     for (let i = 0; i < grid; i++)
//       for (let j = 0; j < grid; j++)
//         renderBoxes.push(<Box key={`${i},${j}`} cords={`${i},${j}`} />);

//     return renderBoxes;
//   };
// }
// const myBoxes = createBoxes();
