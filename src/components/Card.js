function importAll(r) {
	let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

const Card = ({ number, suit }) => {
  const combo = (number) ? `${number}${suit}` : 'purple_back';
  // const color = (suit === '♦' || suit === '♥') ? 'card-red' : 'card';
	console.log(combo)

  return (
    <td>
      <div>
        <img src={images[`${combo}.png`].default} height={150} width={150}/>
      </div>
    </td>
  );
}

export default Card
