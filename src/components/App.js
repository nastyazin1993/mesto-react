import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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
  return (
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
          />
          <Footer />

        </div>
        <PopupWithForm
          name={'edit-profile'}
          title={'Редактировать профиль'}
          children={
            <>
              <label>
                <input
                  className="form__input form__name"
                  id="input-profileName"
                  name="name"
                  type="text"
                  placeholder="Имя"
                  defaultValue="Жак-Ив Кусто"
                  required
                  minLength="2"
                  maxLength="40"
                />
                <span
                  className="form__input-error"
                  id="input-profileName-error"
                ></span>
              </label>
              <label>
                <input
                  className="form__input form__about-name"
                  id="input-profession"
                  name="about"
                  type="text"
                  placeholder="Профессия"
                  defaultValue="Исследователь океана"
                  required
                  minLength="2"
                  maxLength="40"
                />
                <span
                  className="form__input-error"
                  id="input-profession-error"
                ></span>
              </label>
            </>
          }
          text={'Сохранить'}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name={'add-card'}
          title={'Новое место'}
          children={
            <>
              <label>
                <input
                  className="form__input form__name"
                  id="input-AddCard"
                  name="name"
                  type="text"
                  placeholder="Название"
                  required
                  minLength="1"
                  maxLength="30"
                />
                <span className="form__input-error" id="input-AddCard-error"></span>
              </label>
              <label>
                <input
                  className="form__input form__about-name"
                  id="input-PlaceUrl"
                  name="link"
                  type="url"
                  placeholder="Ссылка на картинку"
                  required
                />
                <span className="form__input-error" id="input-PlaceUrl-error"></span>
              </label>
            </>
          }
          text={'Создать'}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name={'edit-avatar'}
          title={'Обновить аватар'}
          children={
            <>
              <label>
                <input
                  className="form__input form__about-name"
                  id="input-AvatarUrl"
                  name="avatar"
                  type="url"
                  placeholder="Ссылка на картинку"
                  required
                />
                <span className="form__input-error" id="input-AvatarUrl-error"></span>
              </label>

            </>
          }
          text={'Сохранить'}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup
          name={'open-image'}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />


        <div className="popup popup_delete-card">
          <div className="popup__container">
            <button
              type="reset"
              className="popup__close-button popup__close-button_delete-card"
              value="Закрыть"
            ></button>
            <h2 className="popup__title">Вы уверены?</h2>
            <form className="form" action="#" name="formDeleteCard" noValidate>
              <button
                type="submit"
                className="form__save-button form__save-button_action popup__button_type_confirm"
                value="Создать"
              >
                Да
            </button>
            </form>
          </div>
        </div>
        
        

        <template className="cards card-template_type_default">
          <div className="element">
            <button type="button" className="element__delete"></button>
            <img className="element__img" src="#" alt="" />
            <div className="element__info">
              <h2 className="element__title"></h2>
              <div>
                <button type="button" className="element__heart"></button>
                <p className="element__sumLike">0</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  );
}

export default App;
