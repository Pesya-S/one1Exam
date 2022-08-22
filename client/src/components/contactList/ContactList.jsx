import React from 'react';
import '../contact.css'
import '../../css/font-awesome.css'
import { useSelector } from "react-redux";
import ContactItem from './ContactItem'

const ContactList = (props) => {

	const { searchTxt } = props;
	const contactsList = useSelector(state => state.contactsList);


	return (
		<>


			<div className="contacts-container">
				{
					contactsList.filter(x => x.name.toLowerCase().includes(searchTxt.toLowerCase()) || x.phone.toLowerCase().includes(searchTxt.toLowerCase())).map((item, i) =>
						<ContactItem item={item} i={i} key={item.id} />
					)
				}
			</div>
		</>
	);
};

export default ContactList;