import React from "react";
import "../Css/Topheading.css"

export default function TopHeading(props) {
    return (
        <div className="Topheading">
            <p className="Actualheadingtext">
                {props.value}
            </p>
        </div>
    )
}

