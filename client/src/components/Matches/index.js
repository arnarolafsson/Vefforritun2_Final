import React from 'react';
import "./style.scss";

const Matches = ({ matchId, participants, winner, isOngoing }) => {
    return (
        <div className="match">
            
            {
                isOngoing ?
                <div className="matchItem">
                    { participants[0].username} VS {participants[1].username }
                </div>
                :
                <div className="matchItem">
                    <div>
                        { participants[0].username } VS { participants[1].username }
                    </div>
                    {winner ?<div> Winner: {winner.username}</div> : <div> Draw</div>}

                </div>
            }
            
        </div>
    );
    
}
export default Matches;