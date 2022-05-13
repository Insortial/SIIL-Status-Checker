import React from 'react'

function Cases(props) {
    return (
        <div className="case">
            <h3>Has completed {props.type} training:</h3>
            {props.isTrue ? (<div style={{backgroundColor: '#97D172'}} className="caseBox">YES</div>) : (<div style={{backgroundColor: '#D84B59'}} className="caseBox">NO</div>)}
        </div>
    )
}

export default Cases;