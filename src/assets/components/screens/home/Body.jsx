import React from 'react';
import s from './Body.module.css'
import { NavLink } from 'react-router-dom';

const Body = (props) => {

    console.log(props.votes);
    const votes = props.votes;

    function getMonthName(monthNumber) {
        const date = new Date(2021, monthNumber - 1);
        const monthName = date.toLocaleString('default', { month: 'long' });
        return monthName;
      }

    return ( 
        <div className={s.votes}>
        {votes ? (
            votes.map(v => (
            <NavLink to={"/vote/" + v.id} key={v.id}>
            <div className={s.vote_item}>
                <div className={s.content}>
                    <div className={s.header}>
                        <span>Голосование за {getMonthName(v.month)} {v.year}</span>
                        <div className={s.count_to}>
                            <img src="/time.png" alt="clock" className={s.clock} />
                        {   (v.days_diff == -1) ? (
                            <span>Голосование окончено</span>
                            )    
                        :   (v.days_diff == 0) ? (
                            <span>Последний день</span>
                            )
                        :   (v.days_diff>10) && (v.days_diff<20) ? (
                            <span>{v.days_diff} дней до окончания</span>
                            )
                        :   (v.days_diff % 10 == 1) ? (
                            <span>{v.days_diff} день до окончания</span>
                            )
                        :   (v.days_diff % 10 == 2) || (v.days_diff % 10 == 3) || (v.days_diff % 10 == 4) ? (
                            <span>{v.days_diff} дня до окончания</span>
                            )
                        :   (
                            <span>{v.days_diff} дней до окончания</span>
                            )
                        }
                        </div>
                    </div>
                    <div className={s.body}>
                        <span>
                            {v.id == 1 ? "Выбираем коллегу месяца! Голосуем, не стесняемся. Всё в ваших руках)))\n Можете отдать трём коллегам по одному голосу, а можете отдать все тому одному самому лучшему коллеге"
                            : "Коллега месяца уже был выбран, но можно ещё разок взглянуть на славных ребят и почитать за что их все так любят)"}
                        </span>
                    </div>
                    <div className={s.footer}>
                        <div className={s.count_vote}>
                            <img src="/like.png" alt="like" className={s.like} />
                            <span>{v.total_coin_count}</span>
                        </div>
                        <span>{v.coin_counts_from_user == 0 ? "Вы ещё не голосовали" : 
                        v.coin_counts_from_user == 1 ? "Вы отдали " + v.coin_counts_from_user + " голос" : 
                        "Вы отдали " + v.coin_counts_from_user + " голоса"}</span>
                    </div>
                </div> 
            </div>
            </NavLink>
            
        ))
        )
        
        : <p>No items</p>

        }   

        </div>
     );
}
 
export default Body;