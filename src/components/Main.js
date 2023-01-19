import Card from "./Card";

function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div>
            <button onClick={props.onEditAvatar} className="profile__button" />
            <img
              className="profile__avatar"
              src={props.userAvatar}

              alt="мужчина"
            />
          </div>
          <div className="profile__text">
            <h1 className="profile__name" >{props.userName}</h1>
            <h2 className="profile__job" >{props.userDescription}</h2>
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
          />
        ))}
      </section>
    </main >
  )
}


export default Main;
