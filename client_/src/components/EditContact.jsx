import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import contactService from '../services/contactService';
import { contactAction_edit, contactAction_get, contactAction_post } from '../store/contactReducer';
import './contact.css'


const EditContact = (props) => {
    const location = useLocation();
    const [item, setItem] = useState(location.state || { name: '', phone: '', title: '', imageUrl: '' });
    const { id } = useParams();
    const dispatch = useDispatch();
    const mode = id ? 'edit' : 'new';
    const navigate = useNavigate();
    const [noContact, set_noContact] = useState(false);



    useEffect(() => {
        if (mode == 'new')
            getImage();
        else if (id && !location.state) {
            getContact()
        }
        // eslint-disable-next-line
    }, [])

    const getContact = async () => {
        dispatch(contactAction_get());
        let _item = await contactService.getById(id);
        if (_item)
            setItem(_item);
        else
            set_noContact(true);
    }



    const save = async () => {
        console.log('save');
        if (mode == 'edit')
            dispatch(contactAction_edit(item, () => { navigate('/contacts') }));
        else {
            dispatch(contactAction_post(item));
            navigate('/contacts')
        }
    }

    const updateFormState = (event) => {
        setItem({
            ...item,
            [event.target.name]: event.target.value,
        });
    };

    const getImage = async () => {
        let newUrl = await contactService.genragePictureUrl();
        setItem({ ...item, imageUrl: newUrl })
    }

    const validatePhone = (e) => {
        let c = e.nativeEvent.data;
        if (c == '-' || (/^\d+$/.test(c)))
            updateFormState(e);
    }

    return (

        <div className="contact-container">
            <div className="new-contact-container">
                <div className='new-contact-avatar'>
                    {item.imageUrl && item.imageUrl != '' && <img alt='profile' src={contactService.pictureUrl(item.imageUrl)} />}
                    <button disabled={noContact} onClick={getImage}><i className="fa fa-refresh" aria-hidden="true"></i></button>
                </div>
                <div className="new-contact-inputs">
                    <div className="new-contact-input">
                        <label>Name</label>
                        <input disabled={noContact} name='name' value={item.name} onChange={updateFormState} maxLength="30" />
                    </div>
                    <div className="new-contact-input">
                        <label>Phone</label>
                        <input disabled={noContact} name='phone' value={item.phone} onChange={validatePhone} maxLength="30" />
                    </div>
                    <div className="new-contact-input">
                        <label>Title</label>
                        <input disabled={noContact} name='title' value={item.title} onChange={updateFormState} maxLength="100" />
                    </div>
                </div>
                <div className="new-contact-buttons">
                    <button disabled={noContact || item.name == '' || item.phone == ''} className="button-ok" onClick={save}>Save</button>
                    <Link to='/contacts'>
                        <button className="button-cancel">Cancel</button>
                    </Link>
                </div>
                <div>
                    {noContact && <h2 style={{ color: 'red' }}>The selected contact does not exist</h2>}
                </div>
            </div>
        </div>

    );
};

export default EditContact;