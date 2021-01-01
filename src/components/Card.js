function importAll(r) {
	let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

const Card = ({ number, suit }) => {
  const combo = (number) ? `${number}${suit}` : 'red_back';
  // const color = (suit === '♦' || suit === '♥') ? 'card-red' : 'card';

  return (
		<img src={images[`${combo}.png`].default} height={150} width={150}/>
  );
}

export default Card
