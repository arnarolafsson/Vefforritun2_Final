import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import UserList from '../Userlist';
import { addSession } from '../../actions/sessionActions';
import Navigation from '../Navigation';
import MatchesList from '../MatchesList';
import ChallengesList from '../ChallengesList';
import "./style.scss";
export const Dashboard = ({history}) => {
    const sessionID = localStorage.getItem("s.id");
    const [users, setUsers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [challengers, setChallenger] = useState([]);
    const socket = useSelector(({socket}) => socket);
    const dispatch = useDispatch();
    if(sessionID)
    {
        socket.auth = {sessionID: sessionID};
        
        socket.connect();
    }
    else {
        history.push('/');
    }

    useEffect(() => {
        socket.emit('users');
        socket.emit('matches');
        socket.on('users', users => setUsers(users));
        socket.on('session', session => {
            dispatch(addSession(session));
        });
        socket.on('connected_user', user => setUsers(users => [...users, user]));
        socket.on('disconnected_user', userID => setUsers(users => users.filter(u => u.userID !== userID)));
        
        socket.on('matches', matches => setMatches(matches));
        socket.on('game_challenge', challenger => setChallenger(challengers => [...challengers, challenger.challenger]));
        socket.on('game_challenge_accepted', (matchID, userID) => {
            history.push(`/match/${matchID}`)
        })
        socket.on('new_match', match => setMatches(matches => [...matches, match]));
        socket.on('match_ended', (matchId, winner) => {
            socket.emit('matches');
        });
        socket.on('user_left', userID => setUsers(users => users.filter(u=> u.userID !== userID)));
        return () => {
            socket.off('users');
            socket.off('connected_user');
            socket.off('disconnected_user');
            socket.off('session');
            socket.off('game_challenge');
            socket.off('game_challenge_accepted');
            socket.off('new_match');
            socket.off('match_ended');
            socket.off('userID');
        } 
    }, [dispatch, history, socket]);
    return (
        <div className="dashboard">
            <Navigation />
            <div className="content">
                <ChallengesList challengers={challengers} />
                <MatchesList matches={matches} />
                <UserList users={users}/>
            </div>
        </div>
    );
}

export default Dashboard;