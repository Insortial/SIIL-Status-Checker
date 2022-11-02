import React, { useEffect } from 'react'
import Cases from './Cases';

function SearchOutput(props) {
    useEffect(() => {
        return () => {
        
        }
    }, [props])
    
    return (
        <div id="searchOutput">
            <h2>{props.name}</h2>
            {
                props.namebadges.map((badge) => {
                    //console.log(badge)
                    return <Cases key={badge.entityId} type={badge.name} isTrue={badge.finished}/>
                })
            }
        </div>
    )
}

export default SearchOutput;
