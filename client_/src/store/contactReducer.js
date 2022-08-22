import contactService from "../services/contactService";


export const type = {
    get: 'getContact', post: 'postContact', fill: 'fillContact'
};


const initilize = [];

export const contacts = (state = initilize, action) => {
    switch (action.type) {
        case type.get: return state;
        case type.post: return [...state, action.payload];
        case type.fill: return action.payload;
        default: return state;
    }
}


// actions
export const contactAction_get = () => {
    return async (dispatch,getState) => {
        let list=getState().contactsList;
        if (list && list.length > 0)
            return type.get
        if (list === undefined || list.length === 0) {
            let result = await contactService.get();
            dispatch({ type: type.fill, payload: result });
        }
    }
}
export const contactAction_post = (contact) => {
    return async (dispatch) => {
        let result = await contactService.post(contact);
        contact.id = result.insertId;
        dispatch({ type: type.post, payload: contact })
    }
}
export const contactAction_edit=(contact,cb)=>{
    return async (dispatch,getState) => {
         await contactService.put(contact);
        let list=getState().contactsList;
        let i=list.findIndex(x=>x.id==contact.id)
        list[i]=contact;
        dispatch({ type: type.fill, payload: list });
        cb();
    }
}

export const contactAction_delete=(contact)=>{
    return async (dispatch,getState) => {
         await contactService.deleted(contact.id);
        let list=getState().contactsList;
        list=list.filter(x=>x.id!=contact.id)
        dispatch({ type: type.fill, payload: list })
    }
}
export const contactAction_getById=(id,list)=>{
    // let result=await contactService.getById(id);
}


