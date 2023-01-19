function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card
    );
  }

  return (
    <div className="element">
      <button className="element__remover" />
      <img className="element__mask-group" src={props.link} alt={props.name} onClick={handleCardClick} />
      <div className="element__group">
        <h2 className="element__text">{props.name}</h2>
        <div>
          <button className="element__vector" type="button"></button>
          <p className="element__like">{props.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;

