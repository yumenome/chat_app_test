import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateRoom = ({users,userId}) => {

    const [selectdMembers, setSelectedMembers] = useState([]);
    const navigate = useNavigate();
    const groupRef = useRef();

    const toCreateGroup = () => {
        console.log(selectdMembers);
        const inputs = {
            'creater_id': userId,
            'members': selectdMembers,
            'name': groupRef.current.value,
        }

        axios.post('http://127.0.0.1:8000/api/createGroup', inputs)
        .then((data) => {
                navigate(`/chat/${data.data}`);
        })
    }

  return (
    <div>
        <ul>
        {users.length > 0 && (
            <>
                {users.map((user) => (
                    <>
                    {(user.id !== Number(userId)) && (
                        <li onClick={(e) => {setSelectedMembers([...selectdMembers, user])} } key={user.id} >{user.name}</li>
                    )}
                    </>
                ))}
            </>
        )}
        </ul>
        <input ref={groupRef} type="text" placeholder='group_name' />
        <button onClick={toCreateGroup}>let's go!</button>
        <h2>selected users</h2>
        <ul>
            {selectdMembers.length > 0 && (
                <>
                    {selectdMembers.map((member) => (
                        <li key={member.id} >{member.name}</li>
                    ))}
                </>
            )}
        </ul>

    </div>
  )
}

export default CreateRoom
