// SOURCE: https://github.com/mzabriskie/react-draggable
import Draggable from 'react-draggable2';


class Game extends React.Component {


	constructor(props) {
		super();
		this.state = {
			currScore: 0
		};
	}

	
	componentDidMount() {
		G.gameComponent = this;
		G.fieldSize = this.props.size;
		G.refs = this.refs;

		const elementsToShow = G.getElementsToShow(this.props.size);
		_.forEach(elementsToShow, (count, countOfElements)=> {
			_.forEach(new Array(count), ()=> {
				G.insertItemToMatrix(countOfElements, this.props.size);
			})
		});
		this.setState({
			matrix: G.matrix
		});
		G.calculations.clearDuplicatedMatrixItems(this.props.size).then(()=> {
			let numberToInsert = G.matrix[U.random(0, 25)]; // More number, more 2 in result
			this.setState({
				matrix: G.matrix,
				numberToInsert: numberToInsert ? numberToInsert : 2
			});
			G.history.save();
		});
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
								ref={ `gameItem_${k}` }
								onClick={ this.gameItemClick }
								key={k}>
						{ (G.matrix[k]) ?
							<div style={{ background: G.colors[G.matrix[k]] }}>
								{ G.matrix[k] }
							</div>
							:
							<div style={{ background: (this.state.dragItemIndex === k) ? '#9D9751' : 'transparent' }}>
								&nbsp;
							</div>  }
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
								<div ref="gameDragEl" style={{ background: G.colors[this.state.numberToInsert] }}>
									{ this.state.numberToInsert }
								</div>
						</Draggable>
					</div>
				</div>

				<div style={{ fontSize: '16px' }}>
					Score: { this.state.currScore }
				</div>
			</div>
		);
	}
}

export default Game;
