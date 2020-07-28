import React, { useState } from 'react';
import './styles/room.css'
import light from './images/appliances/light.jpg'
// appliances = {"tl-01": {"name":"Tubelight", "image": "/", "pin":1, "lastStatus":"ON", "lastStatusTime":"UTC Time","type": "light"}}
function Room(){
    let [user, setUser] = useState(null)
    let [appliances, setAppliances] = useState(null)

    return (
        <article className="room">
            <div className="heading">
                <h1>Room</h1>
            </div>
            <div className="appliances-card">
                <div className="appliance-card">
                    <div className="appliance-image">
                        <img src={light} alt={""}/>
                    </div>
                    <div className="appliance-meta">
                        <p>Tubelight</p>
                        <p>ON</p>
                        <p>Last updated on 24:00:00</p>
                    </div>
                </div>
                <div className="appliance-card">
                    <div className="appliance-image">
                        <img src={light} alt={""}/>
                    </div>
                    <div className="appliance-meta">
                        <p>Tubelight</p>
                        <p>ON</p>
                        <p>Last updated on 24:00:00</p>
                    </div>
                </div>
                <div className="appliance-card">
                    <div className="appliance-image">
                        <img src={light} alt={""}/>
                    </div>
                    <div className="appliance-meta">
                        <p>Tubelight</p>
                        <p>ON</p>
                        <p>Last updated on 24:00:00</p>
                    </div>
                </div>
                <div className="appliance-card">
                    <div className="appliance-image">
                        <img src={light} alt={""}/>
                    </div>
                    <div className="appliance-meta">
                        <p>Tubelight</p>
                        <p>ON</p>
                        <p>Last updated on 24:00:00</p>
                    </div>
                </div>
                <div className="appliance-card">
                    <div className="appliance-image">
                        <img src={light} alt={""}/>
                    </div>
                    <div className="appliance-meta">
                        <p>Tubelight</p>
                        <p>ON</p>
                        <p>Last updated on 24:00:00</p>
                    </div>
                </div>
                <div className="appliance-card">
                    <div className="appliance-image">
                        <img src={light} alt={""}/>
                    </div>
                    <div className="appliance-meta">
                        <p>Tubelight</p>
                        <p>ON</p>
                        <p>Last updated on 24:00:00</p>
                    </div>
                </div>
                
            </div>
        </article>
    )
}

export default Room;