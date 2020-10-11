import React from 'react';

function Card({ title, likes, src, onCardClick }) {

    function handleClick() {
        onCardClick({ title, src });
      }

  return (
    
          <div className="element">
            <button type="button" className="element__delete" ></button>
            <img className="element__img" src={src} alt={title} onClick={handleClick}/>
            <div className="element__info">
                <h2 className="element__title">{title}</h2>
                <div>
                <button type="button" className="element__heart"></button>
                <p className="element__sumLike">{likes.length}</p>
              </div>
            </div>
          </div>
        
  );
 
}
  
export default Card;