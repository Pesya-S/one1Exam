import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import contactService from '../../services/contactService';
import { contactAction_delete } from '../../store/contactReducer';

const ContactItem = (props) => {
const { item } = props;
	const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteItem=(e)=>{
        e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation(); 
        dispatch(contactAction_delete(item));
    }

    const edit=()=>{
        navigate(`/contacts/${item.id}`,{state:item})
    }

    return (
        <div className="contact" key={item.id} onClick={edit}>
            <div className="contact-avatar">
                <img alt='profile' src={contactService.pictureUrl(item.imageUrl)} />
            </div>
            <div className="contact-details">
                <div className="contact-name">{item.name}</div>
                <div className="contact-phone">{item.phone}</div>
            </div>
            <div className="contact-buttons">
                <button><i className="fa fa-phone" aria-hidden="true"></i></button>
            </div>
            <div className="contact-button-close" onClick={deleteItem}>
                <i className="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
    );
};

export default ContactItem;