import React from 'react';
import s from './infoPanel.module.css'
import {user_info} from '../../../../data/user.data.js'
import { useParams } from 'react-router-dom';

const Info_panel = (props) => {

    const votes = props.vote;

    const {id} = useParams();

    let form = votes[id-1].total_coin_count === 1 ? "проголосовал" : "проголосовало"

    if(votes === null){
        return
    }
    else 
    return ( 
        <div className={s.info_panel}>
            <div className={s.votes}>
                <img src="/like.png" alt="like" className={s.like} />
                <span>{votes[id-1].total_coin_count} {form}</span>
            </div>
            <div className={s.coin_count}>
            {(id === "1") ? (
                <>
                    <span>Вам доступно: {user_info.coins}</span>
                    <img src="/coin_SC.png" alt="coin" className={s.coin} />
                </>
                )    
            :   (
                <>
                    <span>Вы отдали: {props.your_vote}</span>
                    <img src="/coin_SC.png" alt="coin" className={s.coin} />
                </>
                )
            }    
            </div>
        </div>
     );
}
 
export default Info_panel;