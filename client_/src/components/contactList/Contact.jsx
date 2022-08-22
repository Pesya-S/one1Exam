import React, { useState } from 'react';
import '../contact.css'
import '../../css/font-awesome.css'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { contactAction_get, contactAction_post } from '../../store/contactReducer';
import ContactItem from './ContactItem'
import { Link, Navigate } from 'react-router-dom';
import Search from './Search';
import contactService from '../../services/contactService';
import ContactList from './ContactList';

const Contact = (props) => {

	const contactsList = useSelector(state => state.contactsList);
	const dispatch = useDispatch();
	const [searchTxt, set_searchTxt] = useState('');
	

	useEffect(() => {
		dispatch(contactAction_get());
	}, [])

    const addRandom=async()=>{
        let randomContact=await contactService.randomContact();
        dispatch(contactAction_post(randomContact));
    }

	return (
		<>
			<div className="contact-container">

				<Search searchTxt={searchTxt} set_searchTxt={set_searchTxt}/>

				<ContactList searchTxt={searchTxt} />

				
				<div className="contact-new">
					<Link to='/contacts/new'>
						<button ><i className="fa fa-user-plus" aria-hidden="true"></i></button>
					</Link>
					
					<button onClick={addRandom}>
						<i className="fa fa-random" aria-hidden="true" style={{ marginLeft: '15px' }}></i>
					</button>
				</div>

			</div>
		</>
	);
};

export default Contact;