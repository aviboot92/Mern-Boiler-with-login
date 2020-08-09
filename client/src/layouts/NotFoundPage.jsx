import React from 'react';
import history from 'historyConfig';


export default function NotFoundPage() {
    return (
        <div>
            404
        <button onClick={()=> history.push("/")}>Redirect</button>
        </div>
    )
}
