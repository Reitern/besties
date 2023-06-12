import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import s from'./vote.module.css'
import { useParams } from 'react-router-dom';
import {votes} from '../../../data/votes.data.js' 
import InfoPanel from './comp/infoPanel';
import Filter from './comp/Filter';
import Users from './comp/users';
import axios from 'axios';

const Vote = (props) => {

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [submittedSearch, setSubmittedSearch] = useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value === '') {
            setSubmittedSearch('');
            return;
          }
    };

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };


    const {id} = useParams()

    const [users, setUsers] = useState(null);

    console.log(id);

    useEffect(() => {
        axios.post("http://localhost:2222/users", { vote_id: id })
          .then(response => {
            const users = response.data;
            setUsers(users);
          })
          .catch(error => {
            console.error(error);
          });
      }, [id]);

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

      function getMonthName(monthNumber) {
        const date = new Date(2021, monthNumber - 1);
        const monthName = date.toLocaleString('default', { month: 'long' });
        return monthName;
      }

    function getDays(lday) {
        var vform

        (lday === 0) ? (
        vform = "Последний день"
        )
    :   (lday>10) && (lday<20) ? (
        vform = lday + " дней до окончания"
        )
    :   (lday % 10 === 1) ? (
        vform = lday + " день до окончания"
        )
    :   (lday % 10 === 2) || (lday % 10 === 3) || (lday % 10 === 4) ? (
        vform = lday + " дня до окончания"
        )
    :   vform = lday + " дней до окончания";
    return vform;
    }
    

    if(currentVotes === null){
        return
    }
    else
    return ( 
        <div>
            <Header user={props.user}/>
            {(id === "1") ? (
                <div className={s.main}>
                <h1>Голосование за {getMonthName(currentVotes[id-1].month)} {currentVotes[id-1].year}<br />{getDays(currentVotes[id-1].days_diff)}</h1>
                <div className={s.candidates}>
                    <InfoPanel vote={currentVotes} voteId={id} user={props.user}/>
                    <Filter search={search} filter={filter} handleSearch={handleSearch} handleFilter={handleFilter} setSubmittedSearch={setSubmittedSearch}/>
                    <Users users={users} voteId={id} search={submittedSearch} filter={filter}/>
                </div>
                </div>
            )
            :   (
                <div className={s.main}>
                <h1>Голосование за {votes[id-1].month} {votes[id-1].year}<br />голосование окончено</h1>
                <div className={s.candidates}>
                    <InfoPanel vote={currentVotes} voteId={id} user={props.user}/>
                    <Filter search={search} filter={filter} handleSearch={handleSearch} handleFilter={handleFilter}/>
                    <Users users={users} voteId={id} search={submittedSearch} filter={filter}/>
                </div>
                </div>
            )
            } 
        </div>
     );
}
 
export default Vote;