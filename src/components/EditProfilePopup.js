import { CurrentUserContext } from "../contexts/CurrentUserContext"
import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";



function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  function handelNameAdd(e) {
    setName(e.target.value)
  }
  function handleDescriptionAdd(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }


  return (
    <PopupWithForm
      name="autor"
      title={"Редактировать профиль"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
        value={name} onChange={handelNameAdd}
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
        value={description} onChange={handleDescriptionAdd}
      />
      <span className="popup__input-error job-input-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup
