import React, { useState, Fragment } from 'react';
import axios from 'axios';



const Cards = () => {

    const linkImageStyle = {
        backgroundImage: 'url(\'https://facebook.github.io/create-react-app/img/logo-og.png\')'
    }

    const [state, setState] = useState({
        bookmark: []
    });
 

    axios.get('http://localhost:9000/bookmark')
            .then(response => {
                setState({ bookmark: response.data });
            })
            .catch(function (error){
                console.log(error);
            })

    const deleteCard = (_id) => {
        axios.delete('http://localhost:9000/bookmark/delete/'+ _id)
            .catch(function (error){
                console.log(error);
            })
    }
            
    const mappedData = state.bookmark.map((card, i) => {
        return (
            <div key={i} className="linkCard">
                <div className="linkCardImage" style={linkImageStyle} />
                <div className="linkCardLink"><h2><a href={card.linkHref}>{card.linkName}</a></h2></div>
                <div className="linkCardDelete"><button onClick={() => deleteCard(card._id)} class="btn"><i class="fa fa-trash"></i></button></div>
            </div>
        )
        })

        return(
            <Fragment>  
                {mappedData}
            </Fragment>
        )
}

export default Cards;