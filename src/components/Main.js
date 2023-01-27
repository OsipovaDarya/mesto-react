import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div>
            <button onClick={props.onEditAvatar} className="profile__button" />
            <img
              className="profile__avatar"
              src={currentUser.avatar}

              alt="мужчина"
            />
          </div>
          <div className="profile__text">
            <h1 className="profile__name" >{currentUser.name}</h1>
            <h2 className="profile__job" >{currentUser.about}</h2>
          </div>
          <button onClick={props.onEditProfile} className="profile__edit" type="button" />
        </div>
        <button onClick={props.onAddPlace} className="profile__add" type="button" />
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            likes={card.likes}
            link={card.link}
            key={card._id}
            onCardClick={props.onCardClick}
            name={card.name}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main >
  )
}


export default Main;
