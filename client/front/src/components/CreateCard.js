import React, { Fragment, useState } from 'react';
import axios from 'axios';
import '../index.css'


const CreateCard = () => {

    const [cardData, setCardData] = useState({
        linkName: "",
        linkHref: ""
    });

    const handleChange = (event) => {
        setCardData({
            ...cardData,
            [event.target.name] : event.target.value
        });
    }


    const onSubmit = (e) => {
        e.preventDefault()

    const newBookmark = {
        linkName: cardData.linkName,
        linkHref: cardData.linkHref           
    };

      axios.post('http://localhost:9000/bookmark/add', newBookmark)
          .then(res => console.log(res.data));
 
    setCardData({
        linkName: "",
        linkHref: ""
    });


    }
        return (
           
            <Fragment>              
              <img src={'https://facebook.github.io/create-react-app/img/logo-og.png'}></img>
              
              <form onSubmit={onSubmit}>

                  <h2 className="formTitle">Add a bookmark</h2> 
                  
                  <div>
  
                    <label 
                    htmlFor="linkTitle" 
                    className="formLabel">Enter a bookmark name</label>
  
                    <input 
                      value={cardData.linkName}
                      onChange={handleChange}
                      type="text" 
                      name="linkName"
                      minLength="1"
                      maxLength="25"
                      placeholder="25 characters max"/>
  
                  </div>
  
                  <div>
  
                  <label 
                  htmlFor="linkHref" 
                    className="formLabel">Enter a bookmark link</label>
  
                    <input 
                      value={cardData.linkHref}
                      onChange={handleChange}
                      type="text" 
                      name="linkHref"
                      minLength="7"
                      placeholder="https://example.com/"/>
  
                  </div>
                      
                  <input type="submit" value="Add" />
              </form>
            </Fragment>
        )
}
export default CreateCard;