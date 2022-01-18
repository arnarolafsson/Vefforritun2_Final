import React from 'react';
import Challenges from '../Challenges';
import "./style.scss";

const ChallengesList = ({ challengers }) => {
    return(
        <div className="challengelist">
            <div className="ctitle">CHALLENGES</div>
            { challengers.map(c => <Challenges key={c.userID}{...c}/>) }
        </div>
    );
}

export default ChallengesList;