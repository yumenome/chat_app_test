import React, { useEffect, useRef, useState } from 'react';
import Echo from '../bootstrap'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './message.css';

function Conversation({userId, users}) {

    const messageRef = useRef();
    const [incomeMessages, setIncomeMessages] = useState([]);

    const { roomId } = useParams();
    const room = Number(roomId);


    useEffect(() => {

        axios.post('http://127.0.0.1:8000/api/messages', {room_id: room})
        .then((data) => {
            setIncomeMessages(data.data);
        })
    },[])

    const channel = window.Echo.join(`presence.playground.${room}`);
    channel.subscribed(() => {
        console.log('presence channel subscribed!');
    })
    .listen('.chat_message', (event) => {
        console.log(event)
        setIncomeMessages([...incomeMessages,
            { sender_id: event.user.id, message: event.message }]);
    })
    // console.log(incomeMessages);


    const toSendMessage = (e) => {
        e.preventDefault();
        const inputs = {
            room_id: room,
            sender_id: Number(userId),
            message: messageRef.current.value,
        }
        axios.post('/send_message', inputs);
        document.getElementById('input').value = '';
    }

    return (
        <>
           {/* {toName && <p> to_{toName}</p>} */}
            <div style={{display:'flex',alignItems: 'center',justifyContent: 'center', width: '100%', height: '100vh'}}>
                <div style={{width: '400px',display: 'flex',flexDirection: 'column',border: '1px solid #fff',borderRadius: '10px 10px 0 0'}} >
                    <div className='container' style={{height: '500px',background: 'lightblue',padding: '25px 15px',borderRadius: '10px 10px 0 0'}} >

                    {incomeMessages.length > 0 && (
                        <>
                        {incomeMessages.map((item) => (
                            <div key={item.id} style={{marginBottom: '30px',textAlign: item.sender_id !== Number(userId) ? 'left' : 'right'}}>
                                <p
                            className={item.sender_id !== Number(userId) ? 'sender' : 'receiver'}
                            >
                                {item.message} </p>
                            </div>
                        ))}
                        </>
                    )}
                    </div>
                    <form onSubmit={toSendMessage} style={{display: 'flex'}}>
                        <input  id='input' style={{width: '80%',border: 0,outline: 0,background: '#E5E5E5',padding: '10px 10px 10px 5px'}} ref={messageRef} type='text'/>
                        <button style={{width: '20%',background: 'black',color: 'white',border: 0,outline: 0,padding: '10px'}} type='submit' >send</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Conversation;

