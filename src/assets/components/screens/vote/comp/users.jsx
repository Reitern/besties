import React from 'react';
import s from './users.module.css'
import { Link } from 'react-router-dom';

const Users = (props) => {

    console.log(props.search + " && " + props.filter);

    console.log(props.users);
    const users = props.users;

    return (
        <div className={s.list}>
        {users ? (
            users.map(u => (
            <Link to={`/vote/${props.voteId}/user/${u.id}`} key={u.id}>
            <div className={s.candidate}>
                <div className={s.cand_img}>
                <img src={u.img} alt="avatar" className={s.avatars} />
                </div>
                <div className={s.cand_name}>
                    {u.fio}
                </div>
                <div className={s.footer}>
                    <div className={s.count_vote}>
                        <img src="/like.png" alt="like" className={s.like} />
                        <span>{u.total_coin_count}</span>
                    </div>
                    <span>{u.main_co}</span>
                </div>
            </div> 
            </Link>
        ))
        )

        : <p>No items</p>

        }
        </div> 
        
            );
        }
 
export default Users;