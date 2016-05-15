// SOURCE: https://github.com/mzabriskie/react-draggable
import Draggable from 'react-draggable2';


class Game extends React.Component {


	constructor(props) {
		super();
		const elementsToShow = G.getElementsToShow(props.size);
		_.forEach(elementsToShow, function (count, countOfElements) {
			_.forEach(new Array(count), function () {
				G.insertItemToMatrix(countOfElements, props.size);
			});
		});
		G.clearDuplicatedMatrixItems(props.size);

		this.state = {
			matrix: G.matrix
		};

		G.history.save();
	}

	
	componentDidMount() {
		G.fieldSize = this.props.size;
		G.refs.gameBox = this.refs.gameBox;
		G.refs.gamePanel = this.refs.gamePanel;
		G.refs.gameResp = this.refs.gameResp;
		G.refs.gameDragEl = this.refs.gameDragEl;
	}


	gameItemClick = (e)=> {
		let index = +e.target.getAttribute('data-reactid').split('$')[1];
		if(G.matrix[index]) {
			console.log('da!', G.matrix[index]);
		}
	};


	render() {
		const { size } = this.props;
		const gameItemsLength = size * size ;

		return (
			<div className="game-box" ref="gameBox" style={{ width: size * G.itemSize }}>
				{ _.map(new Array(gameItemsLength), (v, k)=> {
					return <div className='game-item'
								onClick={ this.gameItemClick }
								key={k}>
						{ (G.matrix[k]) ?
							<div style={{ background: G.colors[G.matrix[k]] }}>
								{ G.matrix[k] }
							</div>
							:
							<span>&nbsp;</span>  }
					</div>
				}) }

				<div className="game-panel" ref="gamePanel">
					<div className="game-item" ref="gameResp">
						<Draggable
							onStart={ G.drag.onStart }
							onDrag={ G.drag.onDrag }
							onStop={ G.drag.onStop }
							bounds={ '.game-box' }
							grid={[1, 1]} >
								<div ref="gameDragEl" style={{ background: G.colors[2] }}>2</div>
						</Draggable>
					</div>
				</div>
			</div>
		);
	}
}

export default Game;
