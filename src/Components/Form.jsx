import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import './Form.css'
import { postData  , updateData } from '../api/Postapi'

const Form = ({data , setData ,upDateDataApi , setUpdateDataApi}) => {
    const [addData , setAddData] = useState({
        title:"",
        body:"",
    })

    const isEmpty = Object.keys(upDateDataApi).length === 0 ;
    
    useEffect(()=>{
      upDateDataApi && setAddData({
        title: upDateDataApi.title || "",
        body : upDateDataApi.body || "",
      })
    } ,[upDateDataApi])

    const handleInputChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev)=>{
            return {
                ...prev ,
                [name] : value,
            }
        })
    }


    const handleFormSubmit = (e) =>{
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if( action === "Add"){
          addPostData();
        }else if(action === "Edit"){
          updatePostData();
        }
        
    }

    const updatePostData = async () =>{
      try {
        const res = await updateData(upDateDataApi.id , addData);
        console.log(res);
        if(res.status === 200){
          setData((prev)=>{
            return prev.map((currElem)=>{
              return currElem.id === res.data.id ? res.data : currElem;
            })
  
          })
          setAddData({
            title:"",
            body:"",
        })
        setUpdateDataApi({});
        }
      } catch (error) {
        console.error("Error:" , error);
      }
    }

    const  addPostData = async () =>{
        const res = await postData(addData);
        console.log("res" ,res);
        if(res.status === 201){
            setData([...data ,res.data]);
            setAddData({title:"" , body:""})
        }
    }


  return (
    <div className='formbox'>
      <form action="" onSubmit={handleFormSubmit}>
      <label htmlFor="title"></label>
        <input type="text" id="title" name="title"  placeholder="Add Title" value={addData.title} onChange ={handleInputChange} />
        <label htmlFor="body"></label>
        <input type="text" id="body" name="body"  placeholder="Add Post"  value={addData.body} onChange ={handleInputChange}/>
        <button  type='submit' value={isEmpty ? "Add" : "Edit"}  >{ isEmpty ? "Add" : "Edit" }</button>
      </form>
    </div>
  )
}

Form.propTypes = {
  data: PropTypes.object.isRequired,
  upDateDataApi: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  setUpdateDataApi: PropTypes.func.isRequired,
};
export default Form
