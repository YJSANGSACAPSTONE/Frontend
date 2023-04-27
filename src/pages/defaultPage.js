import React from 'react';
import { Link } from 'react-router-dom';

function defaultPage(props){
    return(
        <>
            {props.header}
            {props.footer}
        </>
    )
}

export default defaultPage;