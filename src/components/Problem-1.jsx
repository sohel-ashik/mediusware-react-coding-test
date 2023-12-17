import React, {useState} from 'react';
import { useEffect } from 'react';
import data from '../assets/data.json';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [hit, setHit] = useState(false);

    const [allData,setAllData] = useState([]);// allData state
    const [filteredData, setFilteredData] = useState([...allData]); //only filtered data state


    useEffect(()=>{
        // first load all the data to the coranpondent state
        const order = ["Active", "Completed", "Pending", "Archive"];
        setShow('all')

        //this is the orderd sorting function
        function sortByStatus(a, b) {
            const A = order.indexOf(a.status);
            const B = order.indexOf(b.status);
          
            return A - B;
          }
        
          //filtering the order
        setAllData([...data.sort(sortByStatus)]);
        setFilteredData([...allData]);
    },[hit])


    const handleClick = (val) =>{
        if(val === 'active'){
            setFilteredData([...allData.filter(item => item.status === 'Active')]);
        } else if(val === 'completed'){
            setFilteredData([...allData.filter(item => item.status === 'Completed')]);
        } else {
            setHit(pre=>!pre);
        }

        setShow(val);
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name"/>
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item)=>{
                                return (
                                    <tr>
                                        <th style={{fontWeight:'normal'}}  scope="col">{item.name}</th>
                                        {item.status ==='Completed' ? 
                                        <th style={{fontWeight:'normal',color:'green'}} scope="col">{item.status}</th> 
                                        : item.status ==='Active' ? <th style={{fontWeight:'normal',color:'blue'}} scope="col">{item.status}</th> 
                                        : item.status === 'Pending' ? <th style={{fontWeight:'normal', color:'red'}} scope="col">{item.status}</th>
                                        : <th style={{fontWeight:'normal'}} scope="col">{item.status}</th>
                                    }

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;

