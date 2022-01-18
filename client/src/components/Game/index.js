import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Board from '../Board';
import { addSession } from '../../actions/sessionActions';
import "./style.scss";

const Game = ({history}) => {
    const sessionID = localStorage.getItem("s.id");
    const socket = useSelector(({socket}) => socket);
    const { matchID } = useParams();
    const [symbol, setSymbol] = useState(null);
    const [next, setNext] = useState('X');
    const [winner, setWinner] = useState(null);
    const [finished, setFinished] = useState(false);
    const [draw, setDraw] = useState(false);
    const dispatch = useDispatch();
    if (sessionID){
        socket.auth = {sessionID: sessionID};
        socket.connect();

    }
    else {
        history.push('/');
    }

    const [board, setBoard] = useState(Array(9).fill(null));
    const handleClick = (i) => {
        const temp = board.concat();
        if(next === symbol && !board[i] && !finished){
            temp[i] = symbol;
            const winner = checkWinner(temp);
            if(winner) {
                socket.emit('game_move', matchID, symbol, i, true, false);
            }
            else if(!temp.includes(null) && !winner){
                socket.emit('game_move', matchID, symbol, i, false, true);
            }
            socket.emit('game_move', matchID, symbol, i, false, false);
        }
    }
    const handleBack = () => {
        history.push('/dashboard');
    }
    const move = (s,i) => {
        setBoard(board => {
            const newBoard = board.concat();
            newBoard[i] = s;
            return newBoard;
        });
    }
    const checkWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (var i = 0; i < lines.length; i++){
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                return squares[a];
            }
        }
        return null;
    }

    useEffect(() => {
        socket.on('session', session => {
            dispatch(addSession(session));
        })
        socket.emit('ready', matchID);
        socket.on('assign_symbol', symbol => setSymbol(symbol));
        socket.on('game_move', (symbol, idx) => {
            move(symbol, idx);
            if (symbol === 'X') {
                setNext('O');
            }
            else {
                setNext('X');
            }
        });
        socket.on('match_ended', (matchId, winner) =>{
            setFinished(true);
            if (winner)
            {
                setWinner(winner.username);
            }
            else{
                setDraw(true);
            }
        }) 
        return () => {
            socket.off('assign_symbol');
            socket.off('game_move');
            socket.off('match_ended');
        }
    }, [socket, matchID, dispatch])
    return(
        <div className="game">
            <h1>YOU ARE {symbol} </h1>
            {winner ? <h2>{winner} wins!</h2> : draw ? <h2>DRAW</h2> : <h2>Turn: {next}</h2>}
            
            <Board squares={board} onClick={handleClick}/>
            {finished ? <button className="backbtn" onClick={() => handleBack()}>Back to Dashboard</button> : <p></p>}
        </div>
        
    ); 
}

export default Game;
