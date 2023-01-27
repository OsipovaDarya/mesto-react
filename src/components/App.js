
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
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';





function App() {
  const [isEditAvatarPopupOpend, setIsEditAvatarOpend] = useState(false);
  const [isEditProfilePopupOpend, setIsEditProfileOpend] = useState(false);
  const [isEditAddPlacePopupOpend, setIsEditAddPlaceOpend] = useState(false);


  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.addNewlike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    } else {
      api.deletelikes(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCards(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .then(closeAllPopups)
  }

  function handleUpdateUser(value) {
    api
      .editProfile(value)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(closeAllPopups)
  }


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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}

            cards={cards}
            onCardClick={handleCardClick}

            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={setSelectedCard}>
          </ImagePopup>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpend}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          ></EditProfilePopup>


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
    </CurrentUserContext.Provider>
  );
}

export default App;
