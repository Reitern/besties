import React, { useEffect, useState } from 'react';
import s from './Comments.module.css'
import axios from 'axios';

const Comments = (props) => {

    const [comments, setComments] = useState(null);

    useEffect(() => {
        axios.post("http://localhost:2222/comments", { vote_id: props.voteId, user_id: props.a_user.id })
          .then(response => {
            const comments = response.data;
            console.log(comments)
            setComments(comments);
          })
          .catch(error => {
            console.error(error);
          });
      }, [props.voteId, props.a_user.id]);
    
    return ( 
        <div className={s.comments}>
            <div className={s.vote_for}>За что голосуют:</div>
            
        {comments ? (
            comments.map(v => (
            <div className={s.comment} key={v.id}>
                <div className={s.text}>
                    {v.description}
                </div>
                <div className={s.coin_count}>
                    <span>{v.coin_count}</span>
                    <img src="/coin_SC.png" alt="coin" className={s.coin} />
            </div>
            </div>
        ))
        )
        : <p>Комментариев ещё нет)</p>
        }
        </div> 
        
            );
}
 
export default Comments;