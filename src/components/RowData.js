import React from 'react'

const RowData = ({name,city,status,points,representative,id,deleteitems,setDeleteitems}) => {

    
    const deleteUser=(i)=>{
        setDeleteitems([...deleteitems,i])
    }

  return (
    <div>
       <div style={{width:1200,height:50,background:'red',margin:'auto',display:'flex',marginTop:2}}>
          
          <div style={{background:'whitesmoke',height:50,width:200,textAlign:'center',justifyContent:'center'}}>{name}</div>
          <div style={{background:'whitesmoke',height:50,width:200,textAlign:'center'}}>{city}</div>
          <div style={{background:'whitesmoke',height:50,width:200,textAlign:'center'}}>{representative}</div>
          <div style={{background:'whitesmoke',height:50,width:200,textAlign:'center'}}>{points}</div>
          <div style={{background:'whitesmoke',height:50,width:200,textAlign:'center'}}>{status}</div>
          <div style={{background:'whitesmoke',height:50,width:200,textAlign:'center'}}>
            <button  style={{outline:'none',border:'none',padding:5,paddingLeft:10,paddingRight:10,background:'black',color:'wheat',borderRadius:5,cursor:'pointer'}}onClick={()=>{deleteUser(id)}}>Delete</button>
          </div>

       </div>
    </div>
  )
}

export default RowData
