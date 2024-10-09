
import { useState ,useEffect } from 'react';
import { deleteApi } from '../api/Postapi'
import { getApi } from '../api/Postapi';
import Card from './Card';
import './Posts.css'
import Form from './Form';

const Posts = () => {
    const [data ,setData] = useState([]);
    const [upDateDataApi , setUpdateDataApi] = useState({});

    const getData = async () =>{
     
      try {
        const res = await getApi();
        console.log(getApi());
        console.log(res);
        setData(res.data);
      } catch (error) {
        console.error("Error is :" , error.message);
      }
    }
  
    useEffect(()=>{
      getData();
    } ,[])
  
  
  
      const handleDelete = async (id) =>{
          try {
              const res = await deleteApi(id);
              console.log(res);
              if(res.status === 200){
                try {
                  const newUpdatedPosts = data.filter((currPost)=>{
                    return currPost.id !== id;
  
                  });
                  setData(newUpdatedPosts);
                } catch (error) {
                  console.log(error);
                }
              }
          } catch (error) {
              console.error("Error :" , error.message)
          }
  
      }


      const handleUpdatePost = (currElem) => setUpdateDataApi(currElem);
  return (
    <div className='container'>
    <div className='fmtitle'> <Form data={data} setData={setData} upDateDataApi={upDateDataApi} setUpdateDataApi={setUpdateDataApi}/></div>
   <div className='appbox'>
    {
        data.map((item)=>{
           return <Card key={item.id} currElem={item} id = {item.id} itemBody={item.body} itemTitle = {item.title} handleDelete = {handleDelete} handleUpdatePost={handleUpdatePost}  />
        })
    }
    </div>
      
    </div>
  )
}

export default Posts
