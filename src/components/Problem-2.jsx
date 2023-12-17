import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';


const Problem2 = () => {
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState('all'); //type of contacts
    const navigate = useNavigate();

    const [evenCheck, setEvenCheck] = useState(false);

    const [contacts, setContacts] = useState([]);

    //first loading the data from api

    useEffect(() => {
        const fetchContacts = async () => {
        try {
           const querry =  type == 'all' ? 'https://contact.mediusware.com/api/contacts/': 'https://contact.mediusware.com/api/country-contacts/United%20States/'
           if(!showModal){
            navigate('')
           }
           else if(type == 'all'){
            navigate('?all-countries');
           }else navigate('?united-states')
            const response = await fetch(querry)
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            if(data) setContacts(data.results);
        } catch (error) {
            console.error('Error fetching contacts:', error.message);
        }
        };

        fetchContacts();
    }, [showModal,type]);


    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
                    <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={()=>{setShowModal(pre=>!pre); setType('all')}}>All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={()=>{setShowModal(pre=>!pre); setType('us')}}>US Contacts</button>
                </div>
                
            </div>


        {/* Modal */}
            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {type == 'all' ? 'All contacts' : 'US contacts'}
                </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div >
                        <div className="tab-content "></div>
                            <table className="table table-striped ">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">PHONE</th>
                                    <th scope="col">COUNTRY</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {contacts.map((item)=>{
                                        if(evenCheck){
                                            if(item.id % 2 == 0){
                                                return (
                                                    <tr>
                                                         <th style={{fontWeight:'normal'}}>{item.id}</th>
                                                         <th style={{fontWeight:'normal'}}>{item.phone}</th>
                                                         <th style={{fontWeight:'normal'}}>{item.country.name}</th>
                                                     </tr>
                                                 )
                                            }
                                        }else {
                                            return (
                                                <tr>
                                                     <th style={{fontWeight:'normal'}}>{item.id}</th>
                                                     <th style={{fontWeight:'normal'}}>{item.phone}</th>
                                                     <th style={{fontWeight:'normal'}}>{item.country.name}</th>
                                                 </tr>
                                             )
                                        }
                                        
                                    })}
                                </tbody>
                            </table>
                        </div>

                    <hr style={{marginTop:'10px'}}></hr>

                <div className='d-flex justify-content-between'>
                    <div className='d-flex gap-2 justify-content-center'>
                        <label>
                            <input checked={evenCheck} type="checkbox" style={{marginRight:'10px'}} onChange={()=>setEvenCheck(!evenCheck)}/>
                            Only Even
                        </label>
                    
                    </div>

                    <div className='d-flex justify-content-end gap-2'>
                        <Button style={{backgroundColor:'#46139f', borderColor:'white', outline:'none'}} onClick={()=>setType('all')}>All Contacts</Button>
                        <Button style={{backgroundColor:'#ff7f50',borderColor:'white', outline:'none'}}  onClick={()=>setType('us')}>US Contacts</Button>
                        <Button style={{backgroundColor:'white', color:'black', borderColor:'46139f'}} onClick={()=>setShowModal(false)}>Close</Button>
                    </div>
                </div>

                </Modal.Body>
            </Modal>
        
        {/* End Modal */}

        </div>
    );
};

export default Problem2;