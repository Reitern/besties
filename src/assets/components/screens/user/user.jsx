import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import UserInfoPanel from './comp/userInfoPanel';
import Comments from './comp/Comments';
import axios from 'axios';

const User = (props) => {

    const userId = window.location.pathname.split('/').pop();
    const voteId = window.location.pathname.split('/')[2];

    console.log("voteId = " + voteId + "; userId = " + userId);

    const [users, setUsers] = useState(null);

    console.log(voteId);

    useEffect(() => {
        axios.post("http://localhost:2222/users", { vote_id: voteId })
          .then(response => {
            const users = response.data;
            setUsers(users);
          })
          .catch(error => {
            console.error(error);
          });
      }, [voteId]);

    const [currentVotes, setVotes] = useState(null);
      
    console.log(props.user.id);

    useEffect(() => {
        axios.post("http://localhost:2222/votes", { user: props.user.id })
          .then(response => {
            const votes = response.data;
            //console.log(votes);
            setVotes(votes);
          })
          .catch(error => {
            console.error(error);
          });
      }, [props.user.id]);
    

    if(currentVotes === null){
        return
    }
    else
    return ( 
        <div>
            <Header user={props.user}/>
            <UserInfoPanel user={props.user} a_user={users.find((obj) => {return obj.id == userId})} user_id={userId} voteId={voteId}/>
            <Comments a_user={users.find((obj) => {return obj.id == userId})} voteId={voteId}/>
            
        </div>
     );
}
 
export default User;