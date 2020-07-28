import React, { useState, useEffect } from 'react';
import './styles/room.css'
import light from './images/appliances/light.jpg'
import Button from './components/Button/Button'
import Textbox from './components/Textbox/Textbox'
import { serverEndpoint } from '../config.json'
// appliances = {"tl-01": {"name":"Tubelight", "image": "/", "pin":1, "lastStatus":"ON", "lastStatusTime":"UTC Time","type": "light"}}

function Room() {
    let [user, setUser] = useState({ authenticated: true, token: null })
    let [appliances, setAppliances] = useState(null)
    let [email, setEmail] = useState(null)
    let [password, setPassword] = useState(null)
    let [lastAction, setLastAction] = useState('ON')

    useEffect(() => {
        fetchAppliances()
    }, [])
    function fetchAppliances() {
        fetch(serverEndpoint + '/appliances')
            .then(response => response.json())
            .then(data => setAppliances(data))
    }
    function handleChange(event) {
        switch (event.target.id) {
            case 'email': setEmail(event.target.value)
                break;
            case 'password': setPassword(event.target.value)
                break;
            default: return;
        }
    }
    function handleSubmit(event) {
        fetch(serverEndpoint + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.authenticated) {
                    setUser({ authenticated: true, token: data.token })
                } else {
                    setUser({ authenticated: false, token: null })
                }
            })
    }

    function applianceToggle(event, id) {
        let action = ''
        if (appliances[id].lastAction === 'ON') {
            action = 'OFF'
        } else if (appliances[id].lastAction === 'OFF') {
            action = 'ON'
        }
        fetch(serverEndpoint + '/applianceToggle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payload: { appliance: appliances[id], action: action }, token: user.token })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'SUCCESS') {
                    fetchAppliances()
                    setLastAction(action)
                }

            })
    }
    return (
        <article className="room" style={lastAction === 'ON' ? { backgroundColor: '#54fdfd' } : { backgroundColor: "#000000" }}>
            <div className="heading" style={lastAction === 'ON' ? { color: '#000000' } : { color: "#ffffff" }}>
                <h1>Room</h1>
            </div>
            {user.authenticated ?
                (
                    <div className="appliances-card">
                        <div className="appliance-card" onClick={(event) => { applianceToggle(event, 'tl-01') }}>
                            <div className="appliance-image">
                                <img src={light} alt={""} />
                            </div>
                            <div className="appliance-meta">
                                <p>Tubelight</p>
                                <p>ON</p>
                                <p>Last updated on 24:00:00</p>
                            </div>
                        </div>
                        <div className="appliance-card">
                            <div className="appliance-image">
                                <img src={light} alt={""} />
                            </div>
                            <div className="appliance-meta">
                                <p>Tubelight</p>
                                <p>ON</p>
                                <p>Last updated on 24:00:00</p>
                            </div>
                        </div>
                        <div className="appliance-card">
                            <div className="appliance-image">
                                <img src={light} alt={""} />
                            </div>
                            <div className="appliance-meta">
                                <p>Tubelight</p>
                                <p>ON</p>
                                <p>Last updated on 24:00:00</p>
                            </div>
                        </div>
                        <div className="appliance-card">
                            <div className="appliance-image">
                                <img src={light} alt={""} />
                            </div>
                            <div className="appliance-meta">
                                <p>Tubelight</p>
                                <p>ON</p>
                                <p>Last updated on 24:00:00</p>
                            </div>
                        </div>
                        <div className="appliance-card">
                            <div className="appliance-image">
                                <img src={light} alt={""} />
                            </div>
                            <div className="appliance-meta">
                                <p>Tubelight</p>
                                <p>ON</p>
                                <p>Last updated on 24:00:00</p>
                            </div>
                        </div>
                        <div className="appliance-card">
                            <div className="appliance-image">
                                <img src={light} alt={""} />
                            </div>
                            <div className="appliance-meta">
                                <p>Tubelight</p>
                                <p>ON</p>
                                <p>Last updated on 24:00:00</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="heading">
                            <h2>Login</h2>
                        </div>
                        <div className="login-form">
                            <Textbox id={"email"} placeholder={"Email"} onChange={(event) => { handleChange(event) }} />
                            <Textbox id={"password"} placeholder={"Password"} type="password" onChange={(event) => { handleChange(event) }} />
                            <Button id={'submit'} onClick={(event) => { handleSubmit(event) }}>Login</Button>
                        </div>
                    </div>
                )}

        </article>
    )
}

export default Room;