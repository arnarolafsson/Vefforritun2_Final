import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import "./style.scss";

const Navigation = ({history}) => {
    const socket = useSelector(({socket}) => socket);
    const session = useSelector(({session}) => session);
    const onLeave = () => {
        socket.emit('leave');
        socket.disconnect();
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="navcontainer">
            <div className="navlogo"></div>
            <div className="navitem">
                <h2>{session.username}</h2>
            </div>
            <button className="navitem" onClick={() => onLeave()}>LEAVE</button>
        </div>
    );
};

export default withRouter(Navigation);