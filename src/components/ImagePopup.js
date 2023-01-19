function ImagePopup(props) {
  return (
    <div className={`popup popup_bigphoto ${props.card && 'popup_opened'}`}>
      <div className="popup__body-img">
        <button className="popup__close" type="button" onClick={props.onClose} />
        <figure className="popup__figure">
          <img className="popup__photo" src={props.card && props.card.link} alt={`${props.card && props.card.name}`} />
          <figcaption className="popup__textimg">{props.card && props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}
export default ImagePopup;
