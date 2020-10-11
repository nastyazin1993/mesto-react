import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getInitialCards() ])
      .then(([ res, data ]) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);

        const card = data.map((el)=>({
          
          title: el.name,
          src: el.link,
          likes: el.likes,
          id: el._id
        })
      )
      setCards(card)
      
    })
              
      .catch((err) => console.log(err));
  }, []);



  return (
    <main className="content">
          <section className="profile">
            <div className="profile__block">
              <div className="profile__avatar-conteiner" >
                <img
                  className="profile__avatar"
                  src={userAvatar}
                  alt="аватар"
                />
                <div className="profile__avatar-overlay">
                  <img className="profile__avatar-icon" onClick={onEditAvatar}/>
                </div>
              </div>
              <div className="profile__info">
                <div className="profile__container-info">
                  <h1 className="profile__title">{userName}</h1>
                  <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                </div>
                <p className="profile__subtitle">{userDescription}</p>
              </div>
            </div>
            <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
          </section>
          <section className="elements">
          
          {cards.map(({id, ...card})=> 
          <Card 
          key={id} 
          {...card} 
          onCardClick={onCardClick} 
          />
          )}
          
          </section>
        </main>
  );
 
}
  
export default Main;