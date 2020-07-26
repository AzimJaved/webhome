import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './styles/home.css'


function Home() {
    let [highlighted, setHighlighted] = useState(null)
    let colors = ['#fafd54', '#54fdfd', '#a6ffa6', '#ffa6fe', '#ffd9a6']
    let headingEnum = { 'blog': 0, 'room': 1, 'resume': 2, 'contact': 3, 'click': 4 }
    function handleMouseEnter(event) {
        setHighlighted(event.currentTarget.id)
    }
    function handleMouseLeave(event) {
        setHighlighted(null)
    }
    return (
        <article className="home">
            <div className="headings" style={highlighted === null ? { backgroundColor: 'black' } : { backgroundColor: colors[headingEnum[highlighted]] }}>
                <div id="blog" onTouchStart={(event) => { handleMouseEnter(event) }} onTouchEnd={(event) => { handleMouseLeave(event) }} onMouseEnter={(event) => { handleMouseEnter(event) }} onMouseLeave={(event) => { handleMouseLeave(event) }}
                    style={highlighted === null ? { color: '#fafd54' } : highlighted === 'blog' ? { color: '#000' } : { color: colors[headingEnum[highlighted]] }}>
                    <h1>
                        <a href={'http://blog.azims.space'}>Blog</a>
                    </h1>
                </div>
                <div id="room" onTouchStart={(event) => { handleMouseEnter(event) }} onTouchEnd={(event) => { handleMouseLeave(event) }} onMouseEnter={(event) => { handleMouseEnter(event) }} onMouseLeave={(event) => { handleMouseLeave(event) }}
                    style={highlighted === null ? { color: '#54fdfd' } : highlighted === 'room' ? { color: '#000' } : { color: colors[headingEnum[highlighted]] }}>
                    <h1>
                        <a href={'http://room.azims.space'}>Room</a>
                    </h1>
                </div>
                <div id="resume" onTouchStart={(event) => { handleMouseEnter(event) }} onTouchEnd={(event) => { handleMouseLeave(event) }} onMouseEnter={(event) => { handleMouseEnter(event) }} onMouseLeave={(event) => { handleMouseLeave(event) }}
                    style={highlighted === null ? { color: '#a6ffa6' } : highlighted === 'resume' ? { color: '#000' } : { color: colors[headingEnum[highlighted]] }}>
                    <h1>
                        <a href={'http://resume.azims.space'}>Resume
                        </a>
                    </h1>
                </div>
                <div id="contact" onTouchStart={(event) => { handleMouseEnter(event) }} onTouchEnd={(event) => { handleMouseLeave(event) }} onMouseEnter={(event) => { handleMouseEnter(event) }} onMouseLeave={(event) => { handleMouseLeave(event) }}
                    style={highlighted === null ? { color: '#ffa6fe' } : highlighted === 'contact' ? { color: '#000' } : { color: colors[headingEnum[highlighted]] }}>
                    <h1>
                        <Link to={'/contact'}>Contact me</Link>
                    </h1>
                </div>
                <div id="click" onTouchStart={(event) => { handleMouseEnter(event) }} onTouchEnd={(event) => { handleMouseLeave(event) }} onMouseEnter={(event) => { handleMouseEnter(event) }} onMouseLeave={(event) => { handleMouseLeave(event) }}
                    style={highlighted === null ? { color: '#ffd9a6' } : highlighted === 'click' ? { color: '#000' } : { color: colors[headingEnum[highlighted]] }}>
                    <h5>
                        <Link to={'/click'}>Do not click here</Link>
                    </h5>
                </div>
            </div>
        </article>
    )
}

export default Home;