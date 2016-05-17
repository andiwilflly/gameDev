export default {

	onMouseDown(e, ui) {

	},


	onStop(e, ui, draggable) {
		e.target.style.zIndex = 0;

		let pos = _calculateDragPos(ui);
		let dragContainerPadding = 10;

		if(!pos || pos.itemValue) {
			// Need go to start position
			G.default.drapToPos(draggable, 0, 0, 400);
		} else {
			// Next step
			// let offsetLeft = pos.fieldPos.x * G.default.itemSize - dragContainerPadding;
			// let offsetTop = (pos.fieldPos.y - G.default.fieldSize) * G.default.itemSize - dragContainerPadding;
			// this.drapToPos(offsetLeft, offsetTop, 100).then(()=> {

				G.default.matrix[pos.dragItemIndex] = G.default.gameComponent.state.numberToInsert;
				G.default.history.save();
				G.default.calculations.clearMatrixItem(pos.dragItemIndex, G.default.fieldSize, draggable);
				//G.default.matrix[pos.dragItemIndex] = +G.default.gameComponent.state.numberToInsert + 2;
				G.default.gameComponent.setState({
					matrix: G.default.matrix,
					dragItemIndex: -1
				});
				// G.default.clearMatrixItem(pos.dragItemIndex, G.default.fieldSize);
				// G.default.history.save();
				// G.default.gameComponent.setState({
				// 	matrix: G.default.matrix,
				// });
				G.default.drapToPos(draggable, 0, 0, 0);
			// });
		}
	},


	onDrag(e, ui) {
		let dragItemIndex = _calculateDragPos(ui).dragItemIndex;
		G.default.gameComponent.setState({ dragItemIndex });
	},


	onStart(e, ui) {
		e.target.style.zIndex = 1001;
	}
}


function _calculateDragPos(ui) {
	//console.log('onDrag', pos);
	var respLeft = G.default.refs.gameResp.offsetLeft;
	var respTop = G.default.refs.gameResp.offsetTop;

	let fieldPos = {
		x: Math.round((ui.position.left + respLeft) / G.default.itemSize),
		y: Math.round((ui.position.top + respTop) / G.default.itemSize)
	};

	let dragItemIndex = fieldPos.y * G.default.fieldSize + fieldPos.x;
	if(fieldPos.x >= G.default.fieldSize || fieldPos.x < 0) return false;
	if(fieldPos.y >= G.default.fieldSize || fieldPos.y < 0) return false;

	return {
		itemValue: G.default.matrix[dragItemIndex],
		fieldPos,
		dragItemIndex
	};
}
