export const Card = ({ id, name, number, image, types }) => {


  const typeColors = {
    normal: '#a4acaf',
    fighting: '#d56723',
    flying: '#3dc7ef',
    grass: '#9bcc50',
    poison: '#b97fc9',
    fire: '#fd7d24',
    water: '#4592c4',
    bug: '#729f3f',
    electric: '#eed535',
    ground: '#ab9842 ',
    fairy: '#fdb9e9',
    psychic: '#f366b9',
    rock: '#a38c21',
    steel: '#9eb7b8',
    ice: '#51c4e7',
    ghost: '#7b62a3',
    dragon: '#53a4cf '
  }


  return (
    <div className='card'>
  
      <div className='card__img'>
        <img className='card-img' src={image} alt={name} />
      </div>
      <div className='card__detail'>
        <div className='card__title'>
          {name.toUpperCase()}
          <p>{}</p>
        </div>

          <div className="card__number">
            <span>{typeof number === 'number' ? `#${number}` : 'created'}</span>
            {''}
          </div>  
        <div>
          {types?.map((type, index) => {
            const backgroundColor = typeColors[type] || 'gray';

            return (  
              <div className='card__type' key={index} style={{backgroundColor}}>
                <span>{type}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
