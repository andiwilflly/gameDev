export default {

	clearDuplicatedMatrixItems(size) {
		this.clearMatrixItem(0, size);
	},


	clearMatrixItem(itemIndex, size, draggable) {
		if (size * size < itemIndex) return; // Break loop

		var number = parseInt(G.default.matrix[itemIndex]);
		var currRow = Math.floor(itemIndex / size);
		if (G.default.matrix[itemIndex]) {
			this.top(size, currRow, itemIndex, number, draggable); // look top
			this.left(size, currRow, itemIndex, number, draggable); // look left
			this.right(size, currRow, itemIndex, number, draggable); // look right
			this.bottom(size, currRow, itemIndex, number, draggable); // look bottom
		}
		this.clearMatrixItem(itemIndex + 1, size, draggable);
	},
	

	top(size, currRow, itemIndex, number, draggable) {
		var formula = itemIndex - size;
		if (number == G.default.matrix[formula]) {
			console.log('move el from top to bottom1');
			let itemToMove = G.default.refs[`gameItem_${formula}`].childNodes[0];
			G.default.fadeOut(itemToMove, 700, '+' + number).then(()=> {
				delete G.default.matrix[formula];
			});
		}
		return G.default.matrix[formula];
	},
	

	left(size, currRow, itemIndex, number, draggable) {
		var formula = itemIndex - 1;
		if (currRow === Math.floor(formula / size)) {
			if (number == G.default.matrix[formula]) delete G.default.matrix[formula];
			return G.default.matrix[formula];
		}
	},
	

	right(size, currRow, itemIndex, number, draggable) {
		var formula = itemIndex + 1;
		if (currRow === Math.floor(formula / size)) {
			if (number == G.default.matrix[formula]) delete G.default.matrix[formula];
			return G.default.matrix[formula];
		}
	},

	
	bottom(size, currRow, itemIndex, number, draggable) {
		var formula = itemIndex + size;
		if (number == G.default.matrix[formula]) delete G.default.matrix[formula];
		return G.default.matrix[formula];
	}
}