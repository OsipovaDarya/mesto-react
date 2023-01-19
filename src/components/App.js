
import { useState } from 'react';
import React from 'react';
import '../index.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';
import api from '../utils/api'
import ImagePopup from './ImagePopup';





function App() {
  const [isEditAvatarPopupOpend, setIsEditAvatarOpend] = useState(false);
  const [isEditProfilePopupOpend, setIsEditProfileOpend] = useState(false);
  const [isEditAddPlacePopupOpend, setIsEditAddPlaceOpend] = useState(false);
  const [userInfo, setUserinfo] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api.getInfo()
      .then((data) => {
        setUserinfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   api.getInitialCards()
  //     .then((data) => {
  //       console.log('fsdfsd', data)
  //       setCards(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpend(true)
  }

  function handleEditProfileClick() {
    setIsEditProfileOpend(true)
  }

  function handleAddPlaceClick() {
    setIsEditAddPlaceOpend(true)
  }
  function closeAllPopups() {
    setIsEditAvatarOpend(false);
    setIsEditProfileOpend(false);
    setIsEditAddPlaceOpend(false);
    setSelectedCard(null);
  }


  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}

          userName={userInfo.name}
          userDescription={userInfo.about}
          userAvatar={userInfo.avatar}

          cards={cards}
          onCardClick={handleCardClick}
        />
        <Footer />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={setSelectedCard}>

        </ImagePopup>
        {isEditProfilePopupOpend && (
          <PopupWithForm
            name="autor"
            title="Редактировать профиль"
            isOpen="popup_opened"
            onClose={closeAllPopups}
          >

            <input
              className="popup__input popup__input_name_name"
              id="name-input"
              name="name"
              minLength={2}
              maxLength={40}
              type="text"
              placeholder="Жак-Ив Кусто"
              required=""
            />
            <span className="popup__input-error name-input-error" />
            <input
              className="popup__input popup__input_name_job"
              id="job-input"
              name="job"
              type="text"
              minLength={2}
              maxLength={200}
              placeholder="Исследователь океана"
              required=""
            />
            <span className="popup__input-error job-input-error" />
          </PopupWithForm>
        )}
        {isEditAddPlacePopupOpend && (
          <PopupWithForm
            name="mesto"
            title="Новое место"
            isOpen="popup_opened"
            onClose={closeAllPopups}
          >
            <input
              className="popup__input popup__input_name_mesto"
              name="name"
              id="name-mesto"
              type="text"
              minLength={2}
              maxLength={30}
              placeholder="Название"
              required=""
            />
            <span className="popup__input-error name-mesto-error" />
            <input
              className="popup__input popup__input_name_photo"
              name="link"
              id="name-photo"
              type="url"
              placeholder="Ссылка на картинку"
              required=""
            />
            <span className="popup__input-error name-photo-error" />
          </PopupWithForm>)}

        {/* <PopupWithForm
          name="delete"
          title="Вы уверены?"
          isOpen="popup_opened"
          onClose={closeAllPopups}
        >
        </PopupWithForm> */}

        {isEditAvatarPopupOpend && (
          <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen="popup_opened"
            onClose={closeAllPopups}
          >
            <input
              className="popup__input popup__input_name_avatar"
              name="avatar"
              id="name-avatar"
              type="url"
              placeholder="Изменить аватар"
              required=""
            />
            <span className="popup__input-error name-avatar-error" />
          </PopupWithForm>)}
      </div>

    </div>
  );
}

export default App;
