export default {

	onMouseDown(e, ui) {

	},


	onStop(e, ui, draggable) {
		e.target.style.zIndex = 0;

		let pos = _calculateDragPos(ui);
		let dragContainerPadding = 10;

		if(!pos || pos.itemValue) {
			// Need go to start position
			drapToPos(draggable, 0, 0, 700);
		} else {
			// Next step
			let offsetLeft = pos.fieldPos.x * G.default.itemSize - dragContainerPadding;
			let offsetTop = (pos.fieldPos.y - G.default.fieldSize) * G.default.itemSize - dragContainerPadding;
			drapToPos(draggable, offsetLeft, offsetTop, 300);
		}
	},


	onDrag(e, ui) {
		_calculateDragPos(ui);
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

	// console.log(G.default.matrix[dragItemIndex]);

	return {
		itemValue: G.default.matrix[dragItemIndex],
		fieldPos
	};
}


function drapToPos(draggable, offsetLeft, offsetTop, time = 700) {
	G.default.refs.gameDragEl.style.transition = 'all ' + time/1000 + 's';
	draggable.setState({ offsetLeft, offsetTop }); // Go to start position
	setTimeout(()=> {
		G.default.refs.gameDragEl.style.transition = 'inherit';
	}, time);
}