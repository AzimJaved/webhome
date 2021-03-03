import React, { useState, useEffect } from 'react';
import './styles/room.css'
import light from './images/appliances/light.jpg'
import Button from './components/Button/Button'
import Textbox from './components/Textbox/Textbox'
import { serverEndpoint } from '../config.json'

function Room() {
    let [user, setUser] = useState({ authenticated: true, token: null })
    let [appliances, setAppliances] = useState([])
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [lastAction, setLastAction] = useState('ON')

    useEffect(() => {
        fetchAppliances()
    }, [])
    function fetchAppliances() {
        fetch(serverEndpoint + '/appliance')
            .then(response => response.json())
            .then(data => {
                let res = data.data.map(element => { let el = element; let dt = new Date(el.lastStatusTime); el.lastStatusTime = dt.toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}); return el })
                setAppliances(res)
                
            })
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
    function handlePing() {
        fetch(serverEndpoint + '/pingAppliances', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "token": user.token })
        })
            .then(response => response.json())
            .then(data => {
                if (data.type === 'success') {
                    fetchAppliances()
                }
            })

    }
    function handleSubmit(event) {
        fetch(serverEndpoint + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": email, "password": password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.authenticated) {
                    setUser({ authenticated: true, token: data.token })
                    fetch(serverEndpoint + '/pingAppliances', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ "token": data.token })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.type === 'success') {
                                fetchAppliances()
                            }
                        })
                    setEmail("")
                    setPassword("")
                } else {
                    setUser({ authenticated: false, token: null })
                }
            })
    }

    function applianceToggle(event, id) {
        let action = ''
        if (appliances[id].lastStatus === 'ON') {
            action = 'OFF'
        } else if (appliances[id].lastStatus === 'OFF') {
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
            <div>
                <Button id={"ping"} onClick={(event => { handlePing(event) })}>Update Status</Button>
            </div>
            {user.authenticated ?
                (
                    <div className="appliances-card">
                        {appliances.map((appliance, index) => <div className="appliance-card" style={appliance.lastStatus==='ON'? {backgroundColor: '#fffda4'}: {backgroundColor: '#7a7a7a'}}onClick={(event) => { applianceToggle(event, index) }}>
                            <div className="appliance-image">
                                <img src={appliance.image === '/' ? light : appliance.image} alt={""} />
                            </div>
                            <div className="appliance-meta">
                                <p>{appliance.name}</p>
                                <p>{appliance.lastStatus}</p>
                                <p>{appliance.lastStatusTime}</p>
                            </div>
                        </div>)}
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
                )
            }

        </article >
    )
}

export default Room;