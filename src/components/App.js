import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getInitialCards() ])
      .then(([ res, data ]) => {
        setCurrentUser(res)
        setCards(data)

    })  
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }
  function handleCardLike(card){
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((item) => item._id === card._id ? newCard : item);
        setCards(newCards);
      })
      .catch((err) => console.log(err));

  }
  function handleCardDelete(card){
    
      api.deleteCard(card._id)
      .then(() => {
        const newArrCards = cards.filter(element => element !== card);
        setCards(newArrCards);
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateUser(res){
    api.patchUserInfo(res)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar(link) {
    api.patchUserAvatar(link)
        .then((link) => {
          setCurrentUser(link);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(card) {
    api.postCard(card)
      .then((card) => {
        setCards([...cards, card]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <div className="root">
        <div className="page">
          <Header />
          <Main 
          onEditAvatar={() => {
            handleEditAvatarClick();
          }}
          onEditProfile={() => {
            handleEditProfileClick();
          }}
          onAddPlace={() => {
            handleAddPlaceClick();
          }}
          onCardClick={(card) => {
            handleCardClick(card);
          }}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}

          />
          <Footer />

        </div>
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}  /> 
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          name={'open-image'}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <PopupWithForm
          name={'delete-card'}
          title={'Вы уверены?'}
          text={'Да'}
         /* isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}*/
        />
        
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
