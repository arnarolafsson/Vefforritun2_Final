import React from 'react';
import User from '../Users';
import { useSelector } from 'react-redux';
import "./style.scss";
const UserList = ({ users }) => {
    const session = useSelector(({session}) => session);
    var online =[];
    var offline = [];
    for(var i = 0; i < users.length; i++){
        if (users[i].username !== session.username){
            if (users[i].connected) {
                online.push(users[i]);
            }
            else {
                offline.push(users[i]);
            }
        }
    }
    return (
        <div className="userlist">
            <div className="usersonline">
                <div className="connection">ONLINE ({online.length})</div>
                { online.map(u => <User key={u.username}{...u}/>) }
            </div>
            <div className="usersoffline">
                <div className="connection">OFFLINE ({offline.length})</div>
                { offline.map(u => <User key={u.username}{...u}/>) }
            </div>

        </div>
    );
};

export default UserList;