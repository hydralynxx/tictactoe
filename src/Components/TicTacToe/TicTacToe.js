import { React, useState, useEffect } from "react";
import "./TicTacToe.css";
import { minimax } from "./ai";

const TicTacToe = () => {
    const winCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const [cells, setCells] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    const [turn, setTurn] = useState("X");
    const [winner, setWinner] = useState(null);
    const [ai, setAI] = useState(false);
    const titles = {
        base: "Tic Tac Toe with a player",
        ai: "Tic Tac Toe with computer",
        win: "The winner: ",
        draw: "Draw!"
    };
    const [title, setTitle] = useState(titles.base);

    useEffect(() => {
        if (!winner) {
            const board = cells.flat();
            for (let i = 0; i < 8; i++) {
                const [x, y, z] = winCombination[i];
                if (board[x] === board[y] && board[x] === board[z] && board[x]) {
                    setWinner(prevWinner => {
                        setTitle(titles.win + board[x]);
                        return board[x];
                    });                   
                    console.log("Winner found ", );
                }
            }
            if (!board.some((x) => x === null)) {
                setTitle(titles.draw);
            }
        }
    }, [cells]);

    useEffect(() => {
        setTitle(ai ? titles.ai : titles.base);    
    }, [ai]);

    useEffect(() => {
        if(ai && turn === "O") {
            console.log("Move of kompjuta");
            console.log("Turn in  kompjuta: ", turn);
            setTurn(turn === "X" ? "O" : "X");
        }
    }, [turn]);

    const writeSign = (rowIndex, cellIndex) => {
        if (!cells[rowIndex][cellIndex] && !winner) {
            setCells((prevBoard) => {
                const newBoard = [...prevBoard];
                newBoard[rowIndex][cellIndex] = turn;
                return newBoard;
            });
            setTurn((prevTurn) => {
                return prevTurn === "X" ? "O" : "X";
            });
            console.log("Turn in writeSign: ", turn);
        }
    };

    const reset = () => {
        setCells(() => {
            const newBoard = Array(3).fill(null).map(() => Array(3).fill(null));
            return newBoard;
        });
        setWinner(null);
        setTitle(titles.base);
        setTurn("X");
    }

    const toggleAI = () => {
        setAI(ai === false ? true : false);
    };

    return (
        <div className="container">
            <h1>{title}</h1>
            <div className="board">
                {cells.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, cellIndex) => (
                            <div
                                key={cellIndex}
                                className="cell"
                                onClick={() => writeSign(rowIndex, cellIndex)}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="buttons">
                <button className="button" onClick={() => reset()}>Reset</button>
                <button className={`button ${ai ? "toggled" : ""}`} onClick={() => toggleAI()}>Toggle AI</button>
            </div>
        </div>
    );
};
export default TicTacToe;
