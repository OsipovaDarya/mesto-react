import { useEffect, useRef } from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup(props) {
  const refContainer = useRef("");


  useEffect(() => {
    refContainer.current.value = "";
  }, [props.isOpen]);


  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: refContainer.current.value,
    });

  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_name_avatar"
        name="avatar"
        id="name-avatar"
        type="url"
        placeholder="Изменить аватар"
        required=""
        ref={refContainer}

      />
      <span className="popup__input-error name-avatar-error" />
    </PopupWithForm>)
}
export default EditAvatarPopup;
