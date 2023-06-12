import React, { useState } from 'react';
import s from './userInfoPanel.module.css'
import { users } from './../../../../data/users.data'
import Modal from './Modal';

const UserInfoPanel = (props) => {

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
      };

    const User = users.slice(props.user_id-1, props.user_id);
    const id = window.location.pathname.split('/')[2];

    return ( 
        <div className={s.user_info_panel}>
            <div className={s.user_img}>
                <img src={props.a_user.img} alt="avatar" className={s.img_u} />
            </div>
            <div className={s.user_info}>
                <div className={s.user_name}>
                    {props.a_user.fio}
                </div>
                <div className={s.user_about}>
                {props.a_user.description}
                </div>
                <div className={s.footer}>
                    <div className={s.count_vote}>
                    <img src="/like.png" alt="like" className={s.like} />
                    <span>{props.a_user.total_coin_count}</span>
                    </div>
                    {(id === "1") ? (
                    <>  
                        <button className={s.set_vote} onClick={handleOpenModal}>Голосовать</button>   
                        {   showModal &&
                                <Modal user={props.user} a_user={props.a_user} voteId={props.voteId} isOpen={showModal} onClose={handleCloseModal} setShowModal={setShowModal}/>
                        }
                        
                    </>
                    )
                    :   (<></>)
                    }
                </div>
            </div>
        </div>
     );
}
 
export default UserInfoPanel;