import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./style.scss";
const User = ({username, userID, connected}) => {
    const socket = useSelector(({socket}) => socket);
    const [waiting, setWaiting] = useState(false);
    const [declined, setDeclined] = useState(false);
    const [btnValue, setBtnValue] = useState("Challenge")
    socket.connect();
    const handleChallenge = () => {
        
        setDeclined(false);
        socket.emit('game_challenge', userID);
        setBtnValue("Challenge sent");
        setWaiting(true);
        socket.on('game_challenge_declined', userID => {
            setBtnValue("Challenge");
            setWaiting(false);
            setDeclined(true);
        });
    }
    return(
        <div className="user">
            <div className="name">{ username }</div>
            {
                connected ? 
                <>
                <button className="challenge" disabled={waiting} onClick={() => handleChallenge()}>
                {btnValue}
                </button>
                </>
                : 
                <div></div>
                
                
            }
            {declined ? <p>{username} declined! Try again</p> : <></>}
        </div>
    );
}

export default User;