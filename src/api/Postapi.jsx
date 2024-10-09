import axios from 'axios'

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})


export const getApi = () =>{
    return api.get("/posts")
}


export const deleteApi = (id) =>{
    return api.delete(`/posts/${id}`)
}

export const postData = (post) =>{
    return api.post("/posts" , post);
}

//put method 
export const updateData  = (id , post ) =>{
    return api.put(`/posts/${id}` , post);
}

