import React, { useState, useEffect } from 'react';
import s from './Modal.module.css'
import axios from 'axios';

const Modal = (props) => {

    const [selectedValue, setSelectedValue] = useState('one');
    const [comment, setComment] = useState('');
    const [submittedValue, setSubmittedValue] = useState('one');
    const [submittedComment, setSubmittedComment] = useState('');


    const handleChangeV = (event) => {
        setSelectedValue(event.target.id);
    }

    const handleChangeC = (event) => {
        setComment(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmittedValue(selectedValue);
        setSubmittedComment(comment);
        props.setShowModal(false);
        axios.post("http://localhost:2222/add_comment", { selectedValue: selectedValue=="one"?1:selectedValue=="two"?2:3, comment: comment, auserId: props.user.id, vote_id: props.voteId, user_id: props.a_user.id})
          .then(response => {

          })
          .catch(error => {
            console.error(error);
          });
    };

    useEffect(() => {
        console.log(submittedValue + " ## " + submittedComment);
    });

    return (
        <div className={s.modal_container}>
            <div className={s.modal_window}>
                <div className={s.modal_header}>
                    <img src="/x-button.png" alt="cross" className={s.cross} onClick={props.onClose}/>
                </div>

                <form onSubmit={handleSubmit} className={s.form}> 
                <div className={s.modal_body}>
                    <section className={s.choice}>
                        Отдать голосов:
                        <input type="radio" id="one" name="coins" checked={selectedValue === 'one'} onChange={handleChangeV}/>
                        <label htmlFor="one">1</label>

                        <input type="radio" id="two" name="coins" checked={selectedValue === 'two'} onChange={handleChangeV}/>
                        <label htmlFor="two">2</label>

                        <input type="radio" id="three" name="coins" checked={selectedValue === 'three'} onChange={handleChangeV}/>
                        <label htmlFor="three">3</label>
                    </section>
                    
                    <div className={s.you_have}>
                    <div className={s.text2}>
                        Вам доступно: 
                    </div>    
                    <div className={s.coin_count}>
                        <span>{props.user.count}</span>
                        <img src="/coin_SC.png" alt="coin" className={s.coin} />
                    </div>
                    </div>
                    
                    <div className={s.text3}>
                        Комментарий: (максимум 300 символов)
                    </div>
                    
                    <textarea className={s.comment_input} onChange={handleChangeC}></textarea>
                </div>
                <div className={s.modal_footer}>
                    <button className={s.cancel} onClick={props.onClose}>Отмена</button>
                    <button className={s.send} type="submit">Отправить</button>
                </div>
                </form>
            
            </div>
        </div>
    );
  }
 
export default Modal;