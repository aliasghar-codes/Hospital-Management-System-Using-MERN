import React from 'react'
import "./DepartmentCard.css"
import useMainContext from "../../Context.js"

const DepartmentCard = ({ heading, title, img, content }) => {
    const { themeMode } = useMainContext();

    return (
        <div className="card" style={themeMode ? { background: "var(--color-dark)", borderBottom: ".1px solid #2d2e31", boxShadow: "white 4px 7px 14px -8px" } : null}>
            <article>
                <h2>{heading}</h2>
                <div className="title">{title}</div>
                <div className="pic"><img src={img} /></div>
                <div style={themeMode ? { color: "var(--color-white)" } : null} className="desc">
                    {content}
                </div>
            </article>
        </div>
    )
}

export default DepartmentCard