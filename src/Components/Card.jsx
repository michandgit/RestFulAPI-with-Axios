import './Card.css'
import PropTypes from 'prop-types';

const Card = ({currElem ,id ,itemBody ,itemTitle , handleDelete ,handleUpdatePost}) => {



  const handleD = (id )=>{
    handleDelete(id);
  }
  const handleUpdate = (currElem ) =>{
    
    handleUpdatePost(currElem);
  }
  return (
   
    <div className="card">
      <h3 className="title">{itemTitle}</h3>
      <div className="body">
        {itemBody}
      </div>
      <div className="btns">
      <button onClick={()=>handleUpdate(currElem)}>Update</button>
      <button  onClick={()=>handleD(id)}>Delete</button>
      </div>
     
    </div>
  )
}

Card.propTypes = {
  currElem: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  itemBody: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdatePost: PropTypes.func.isRequired,
};

export default Card
