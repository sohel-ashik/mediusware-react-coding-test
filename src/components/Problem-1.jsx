import React, {useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [hit, setHit] = useState(false);

    const [name,setName] = useState('');
    const [status,setStatus] = useState('');

    const [allData,setAllData] = useState([]);// allData state
    const [filteredData, setFilteredData] = useState([...allData]); //only filtered data state
    

    const sorting = (arr)=>{
        const order = ["Active", "Completed", "Pending", "Archive"];
        setShow('all')

        //this is the orderd sorting function
        function sortByStatus(a, b) {
            const A = order.indexOf(a.status);
            const B = order.indexOf(b.status);
          
            return A - B;
        }

        //returning the sorted
        return arr.sort(sortByStatus);
    }



    const handleSubmit = (name, status)=>{
        const temp = {
            name,
            status
        }

        // adding the new data to the state
        const data = [...allData];
        data.push(temp);

        //updateding the state
        setAllData(data);
        setFilteredData(data);
        setShow('all')

    }


    const handleClick = (val) =>{
        if(val === 'active'){
            setFilteredData([...allData.filter(item => item.status === 'Active')]);
        } else if(val === 'completed'){
            setFilteredData([...allData.filter(item => item.status === 'Completed')]);
        } else {
            setFilteredData(sorting(allData))
        }

        setShow(val);
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={(e)=>e.preventDefault()}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" onChange={(e)=>setName(e.target.value)} value = {name}/>
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" onChange={(e)=>setStatus(e.target.value)} value = {status}/>
                        </div>
                        <div className="col-auto">
                            <button onClick={()=>{handleSubmit(name,status); setName(''); setStatus('')}} className="btn btn-primary">Submit</button>
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

