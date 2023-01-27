import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";



function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__vector ${isLiked && 'element__vector_active'}`
  );;

  function handleCardClick() {
    props.onCardClick(props.card
    );
  }
  function handleCardLike() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <div className="element">
      {isOwn && (<button className="element__remover" onClick={handleDeleteClick} />)}
      <img className="element__mask-group" src={props.link} alt={props.name} onClick={handleCardClick} />
      <div className="element__group">
        <h2 className="element__text">{props.name}</h2>
        <div>
          <button className={cardLikeButtonClassName} onClick={handleCardLike} type="button"></button>
          <p className="element__like">{props.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;

