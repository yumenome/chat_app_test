import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserList = ({userId, users}) => {


    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [memebers, setMemebers] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/groups/${userId}`)
        .then((data) => {
            console.log(data.data.users);
            setGroups(data.data);
        })
    },[])

    const toSelected = (id) => {
        console.log(id)

        const inputs ={'creater_id': Number(userId), 'joined_id': id}

        axios.post('http://127.0.0.1:8000/api/searchRoom', inputs)
        .then((data) => {
            // console.log(data.data);
            navigate(`/chat/${data.data}`);
        })
    }
    // console.log(groups);

  return (
    <div>
        <button onClick={() => { navigate('/createGroup')}} >+room</button>
        {groups.length > 0 && (
            <div>
            <h2>your group chats</h2>
            <ul>
                {groups.map((group,i) => (
                   <div>
                    {/* {group.users} */}
                     <li onClick={() => {navigate(`/chat/${group.id}`)}} key={i}>{group.name}</li>
                    <ul>
                        {group.users.map((user,i) => (
                            <li>{user.name}</li>
                        ))}
                    </ul>
                   </div>
                ))}
            </ul>
            </div>
        )}
        <h3>friends</h3>
        <ul>
        {users.length > 0 && (
            <>
                {users.map((user,i) => (
                    <>
                    {(user.id !== Number(userId)) && (
                        <li onClick={(e) => {toSelected(user.id)} } key={i} >{user.name}</li>
                    )}
                    </>
                ))}
            </>
        )}
        </ul>
    </div>
  )
}

export default UserList
