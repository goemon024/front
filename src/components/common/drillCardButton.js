import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./css/cardButton.css";
import dayjs from "dayjs";

const DrillCardButton = ({ titleText, link }) => {
    const navigate = useNavigate();
    const today = dayjs().format("YYYY-MM-DD");
    const oneWeekAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");
    const [isHovered, setIsHovered] = useState(false);

    const [startDate, setStartDate] = useState(oneWeekAgo)
    const [endDate, setEndDate] = useState(today)


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(startDate, endDate)
        navigate(`/${link}/calendar?startDate=${startDate}&endDate=${endDate}`);
    };

    return (

        <div className="card-wrapper">
            <div
                className={`hover-card-drill ${isHovered ? "hovered" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="card-text-drill">{titleText}</div>

                <div style={{
                    border: '2px solid #888888', borderRadius: '10px', padding: '5%',
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1em'
                }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', width: '100%' }}>
                            <label htmlFor="start_date" style={{ justifyContent: 'flex-start' }}>From:</label>
                            <input type="date" id="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', width: '100%', marginTop: '0.5rem' }}>
                            <label htmlFor="end_date">to:</label>
                            <input type="date" id="end_date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                            /></div>
                        <button type="submit" className="btn btn-primary block" style={{ width: '75%', alignSelf: 'right', marginTop: '0.5rem' }}>開始</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default DrillCardButton;