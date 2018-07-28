import React from "react";
import "./Title.css";

const Title = props => 
<div className="bg-dark box-shadow text-white text-center">
    <h1>
        {props.children}
    </h1>
</div>
;

export default Title;
