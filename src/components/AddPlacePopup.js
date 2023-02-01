import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function AddPlacePopup(props) {
  const [addName, setAddName] = useState('')
  const [addlink, setAddLink] = useState('')
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setAddName(currentUser.addName);
    setAddName('');
    setAddLink(currentUser.addlink);
    setAddLink('');
  }, [currentUser, props.isOpen]);

  function handleAddName(evt) {
    setAddName(evt.target.value);
  }

  function handleAddLink(evt) {
    setAddLink(evt.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(
      addName,
      addlink
    )
  }



  return (
    <PopupWithForm
      name="mesto"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
        onChange={handleAddName}
      />
      <span className="popup__input-error name-mesto-error" />
      <input
        className="popup__input popup__input_name_photo"
        name="link"
        id="name-photo"
        type="url"
        placeholder="Ссылка на картинку"
        required=""
        onChange={handleAddLink}
      />
      <span className="popup__input-error name-photo-error" />

    </PopupWithForm>
  )
}

export default AddPlacePopup;
