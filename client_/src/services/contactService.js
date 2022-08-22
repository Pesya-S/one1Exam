import axios from "axios";
const url = 'http://localhost:8080/contact'
class contactService {

  get = async () => {
    let result = await axios.get(`${url}/get`);
    return result.data.result;
  }
  getById = async (id) => {
    let result = await axios.get(`${url}/getById`, { params: { id } });
    return result.data.result;
  }

  post = async (contact) => {
    let result = await axios.post(`${url}/post`, contact);
    return result.data.result;
  }

  put = async (contact) => {
    let result = await axios.put(`${url}/put`, contact);
    return result.data.result;
  }

  deleted = async (id) => {
    let result = await axios.delete(`${url}/delete`, {params:{id}});
    return result.data.result;
  }
  pictureUrl = (url) => {
    return `https://randomuser.me/api/portraits/${url}.jpg`
  }

  genragePictureUrl = async () => {
    let number = Math.floor(Math.random() * 100);
    let g=Math.floor(Math.random() * 2);
    let gender=g==0?'men':'women';
    return `${gender}/${number}`;
  }

  randomContact=async()=>{
    // https://cors-anywhere.herokuapp.com/
    let result=await axios.get('https://randomuser.me/api');
    result=result.data.results[0];
    let newContact={name:`${result.name.first} ${result.name.last}`,title:result.name.title,phone:result.phone};
    newContact.imageUrl=await this.genragePictureUrl();
    return newContact;
  }
}
export default new contactService();