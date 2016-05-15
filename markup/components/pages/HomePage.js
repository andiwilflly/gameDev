import Game from "components/game/Game.component.js";


class HomePage extends React.Component {

	render() {
		return (
			<div>
				<h1>Game dev </h1>

				<Game size={4} />
			</div>
		);
	}
}

export default HomePage;
