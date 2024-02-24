import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import Conversation from './Conversation'
import UserList from './UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import CreateRoom from './CreateRoom';

const Example = (prop) => {

    const [users, setUsers] = useState([]);
    useEffect( () => {
        axios.get('http://127.0.0.1:8000/api/users')
        .then((data) => {
            console.log(data.data);
            setUsers(data.data);
        })
    },[])
  return (
   <Routes>
        <Route path='/react' element={<UserList userId={prop.name} users={users} />}  />
        <Route path='/chat/:roomId' element={<Conversation userId={prop.name} users={users}/>}  />
        <Route path='/createGroup' element={<CreateRoom userId={prop.name} users={users}/>}  />
    </Routes>
  )
}

export default Example

    const root = ReactDOM.createRoot(document.getElementById("example"));
    const value = document.getElementById('example').getAttribute('name');
    root.render(
        // <React.StrictMode>
        <BrowserRouter>
            <Example name={value} />
        </BrowserRouter>
        // </React.StrictMode>
    )
