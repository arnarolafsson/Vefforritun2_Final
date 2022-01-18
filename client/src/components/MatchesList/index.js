import React from 'react';
import Matches from '../Matches';
import "./style.scss";
const MatchesList = ({ matches }) => {
    var ongoing =[];
    var finished = [];
    for(var i = 0; i < matches.length; i++){
        if (matches[i].isOngoing) {
            ongoing.push(matches[i]);
        }
        else {
            finished.push(matches[i]);
        }
    }

    return (
        <div className="matches">
            <h2>MATCHES</h2>
            <div className="matchContainer">
                <h2>ONGOING</h2>
                { ongoing.map(m => <Matches key={m.matchId}{...m}/>) }
            </div>
            <div className="matchContainer">
                <h2>FINISHED</h2>
                { finished.map(m => <Matches key={m.matchId}{...m}/>) }
            </div>
        </div>
    );


}

export default MatchesList;