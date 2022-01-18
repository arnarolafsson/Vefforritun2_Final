import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import "./style.scss";
const Challenge = ({username, userID, history}) => {
    const socket = useSelector(({socket}) => socket);
    const [declined, setDeclined] = useState(true);
    const handleAccept = () => {
        const matchID = uuidv4();
        socket.emit('game_challenge_accepted', matchID, userID);

        history.push(`/match/${matchID}`)
    }
    const handleDecline = () => {
        socket.emit('game_challenge_declined', userID);
        setDeclined(false);
    }
    return (
        
            declined ? 
            <>
            <div className="challenger">
                <div className="name">FROM { username }</div>
                <div className="btncontainer">
                    <button className="acceptbtn" onClick={() => handleAccept()}>
                    ACCEPT
                    </button>
                    <button className="declinebtn" onClick={() => handleDecline()}>
                    DECLINE
                    </button>
                </div>
                    
                
            </div>
            </>
            :
            <div></div>

        
    );
};

export default withRouter(Challenge);