import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/cardButton.css";

const CardButton = ({ titleText, detailText1, href, detailText2 = null }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to={href} >
            <div className="card-wrapper">
                <div
                    className={`hover-card ${isHovered ? "hovered" : ""}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="card-text1">{titleText}</div>
                    {detailText1 && <div className="card-text2">{detailText1}</div>}
                    {detailText2 && <div className="card-text2">{detailText2}</div>}
                </div>
            </div>
        </Link>
    );
};

export default CardButton;