function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen} popup_${props.name}`}  >
      <div className="popup__body">
        <button className="popup__close" type="button" onClick={props.onClose} />
        <form
          name={`popup_${props.name}`}
          className="popup__container popup__form-mesto popup__form"
          noValidate=""
        >
          <h2 className="popup__title">{`${props.title}`}</h2>
          {props.children}
          <button className="popup__submit-buttom popup__button" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
