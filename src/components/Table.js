import React from 'react'
import RowData from './RowData'
import {useState,useEffect} from 'react';
import axios from 'axios';

const Table = () => {
   
     const [data,setData]=useState([]);
     const [query,setQuery]=useState('');
     const [currentpage,setCurrentpage]=useState(1);

     const [deleteitems,setDeleteitems]=useState([])

     const[start,setStart]=useState(0);
     const[end,setEnd]=useState(5);

     //Table printing conditions.
     const [namequery,setNamequery]=useState('');
     const [cityquery,setCityquery]=useState('');
     const [representativequery,setRepresentativequery]=useState('');
     const [Qualified,setQualified]=useState('Qualified');
     const [sort,setSort]=useState('select')

     const [change,setChange]=useState(0);
      
      

     console.log(deleteitems);
    useEffect(()=>{
       const fetchData = async()=>{
         const result = await axios("http://localhost:3000/users")
         setData(result.data);
       }
       fetchData();
    },[])
    
      function nextpage(){
       setCurrentpage(currentpage+1);
       setStart(start+6);
       setEnd(end+6);
    }

    function previouspage(){
      if(start>5){
      setCurrentpage(currentpage-1);
        setStart(start-6);
        setEnd(end-6);
      }
      
   }

 

  useEffect(()=>{

    //sorting data
       if(sort==="Low to High"){

        //ascending order
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < (data.length - i - 1); j++) {
              if (data[j].points > data[j + 1].points) {
                  var temp = data[j]
                  data[j] = data[j + 1]
                  data[j + 1] = temp
              }
          }
       
          setChange(2)

      }
      // setData(data)
      // setSort('')
       }
       
       if(sort==="High to Low"){
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < (data.length - i - 1); j++) {
              if (data[j].points < data[j + 1].points) {
                  var temp = data[j]
                  data[j] = data[j + 1]
                  data[j + 1] = temp
              }
          }
      }
       setChange(1)
       }
      //  setData(data)
      //  setSort('')
  },[sort,change])



  return (
    <div>
     <h1>DATA TABLE - INTERTWINE</h1>
     
      <div style={{width:400,height:'auto',display:'flex',margin:'auto',marginBottom:20,}}>
        <div style={{fontWeight:'bold'}}>Global Search</div>
      <input style={{marginLeft:50}} placeholder='Type to search globally' value={query} onChange={e=>setQuery(e.target.value)}></input>
      </div>
     

     <div style={{height:60,width:1200,background:'wheat',margin:'auto',display:'flex',borderTopLeftRadius:8,borderTopRightRadius:8}}>
     <div style={{height:60,width:200,background:'wheat',fontWeight:'bold',borderTopLeftRadius:8}}>Name
      <input placeholder='Search name'  value={namequery} onChange={e=>setNamequery(e.target.value)}></input>
     </div>
     <div style={{height:60,width:200,background:'wheat',fontWeight:'bold'}}>Current City
      <input placeholder='Search city'  value={cityquery} onChange={e=>setCityquery(e.target.value)}></input>
     </div>

     <div style={{height:60,width:200,background:'wheat',fontWeight:'bold'}}>Representative
     <input placeholder='Search representative'  value={representativequery} onChange={e=>setRepresentativequery(e.target.value)}></input>
     
     </div>
     <div style={{height:60,width:200,background:'wheat',fontWeight:'bold'}}>Total Points
       <select style={{display:'block',margin:'auto'}} value={sort}  onChange={(e)=>setSort(e.target.value)}>
       <option >Select</option>
       <option >Low to High</option>
       <option >High to Low</option>
       </select>
     </div>

     <div style={{height:60,width:200,background:'wheat',fontWeight:'bold'}}>Status
     <select style={{display:'block',margin:'auto'}} value={Qualified}  onChange={(e)=>setQualified(e.target.value)}>
       
       <option>Qualified</option>
       <option>Rejected</option>
       </select>
     </div>
     
      
       {/* show 1-10 out of 19 entries */}
     </div>


      {data.filter((f,i)=>{
      
        return query.toLowerCase()===f ?'' 
        : (f.name.toLowerCase().includes(query.toLowerCase()) 
        ||f.city.toLowerCase().includes(query.toLowerCase())
        ||f.representative.toLowerCase().includes(query.toLowerCase()))
        && f.city.toLowerCase().includes(cityquery.toLowerCase())
        && f.name.toLowerCase().includes(namequery.toLowerCase())
        && f.representative.toLowerCase().includes(representativequery.toLowerCase())
        &&!deleteitems.includes(f.id)
        && f.status==Qualified

      }).map((d,j)=>(<>
      { j>=start&&j<=end?
      (<RowData 
         name={d.name} 
         city={d.city} 
         representative={d.representative}
         id={d.id}
         status={d.status}
         points={d.points}
         deleteitems={deleteitems}
         setDeleteitems={setDeleteitems}/> ):(<></>)}
      </>
     
      ))}
     <div style={{height:60,width:1200,background:'wheat',margin:'auto',display:'flex',borderBottomRightRadius:8,borderBottomLeftRadius:8}}>
     <button  style={{height:30,width:'auto',marginTop:15,marginLeft:15}}onClick={previouspage}>Prev</button>
     <span style={{marginTop:15,marginLeft:5}}>{currentpage}</span>
     {currentpage>1?(<button style={{height:30,width:'auto',marginTop:15,marginLeft:10}}  disabled>Next</button>):(<button style={{height:30,width:'auto',marginTop:15,marginLeft:10}} onClick={nextpage}>Next</button>)}
     
      
       
     </div>

    </div>
  )
}

export default Table
