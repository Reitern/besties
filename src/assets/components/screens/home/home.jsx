import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import Body from './Body';
import axios from 'axios';


 function Home(props){
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

    return(
        <div>
           <Header user={props.user}/>
           <Body votes={currentVotes}/>
        </div>
    )
}

export default Home