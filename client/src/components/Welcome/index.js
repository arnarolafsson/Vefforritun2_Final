import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSession } from '../../actions/sessionActions';
import "./style.scss";


const Welcome = ({history}) => {
    const [nickname, setNickname] = useState('');
    const dispatch = useDispatch();
    const socket = useSelector(({socket}) => socket);
    const [error, setError] = useState(null);
    const handleSubmit = (name) => {
        socket.auth = {username: name};
        socket.connect();
    };
    useEffect(() => {
        socket.on('session', session => {
            dispatch(addSession(session));
            history.push('/dashboard')
        });
        socket.on('connect_error', error => {
            setError('Username unavailable');
        })
        
        return () => {
            socket.off('session');
        };
    }, [dispatch, history, socket]);
    return(
        <div className="container">
            <form>
                <h1>Tic Tackity Toe</h1>
                <div className="logo"></div>
                <label htmlFor="name">
                    <input type="text" name="name" placeholder="Username" value={ nickname } required onChange={(e) => setNickname(e.target.value)} />
                    <span>Username</span>
                </label>
                {error ? <p>{error}</p> : <p ></p>}
                <input type="submit" value="CONNECT" onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(nickname);
                }}/>
                
            </form>
        </div>
    );
};

export default Welcome;