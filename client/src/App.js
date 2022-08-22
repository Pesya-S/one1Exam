import './App.css';
import { Routes, Route} from 'react-router-dom';
import EditContact from './components/EditContact';
import Contact from './components/contactList/Contact';

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Contact />} />
        <Route path="/contacts/new" element={<EditContact />} />
        <Route path="/contacts/:id" element={<EditContact />} />
        <Route path="/contacts" element={<Contact />} />

      </Routes>
    </>
  );
}

export default App;
