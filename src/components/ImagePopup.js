import React from 'react';
import Card from './Card';

function ImagePopup({name, isOpen, onClose, card }) {


  return (
    
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_open' : ''}`}>
          <div className="popup__container popup__container_open-image">
            <button
              type="reset"
              className="popup__close-button"
              value="Закрыть"
              onClick={onClose}
            ></button>
            <img className="popup__img" src={card.src} alt={card.title} />
            <h2 className="popup__title popup__title_open-image">{card.title}</h2>
          </div>
        </div>
  );
 
}
  
export default ImagePopup;