import HISTORY from 'components/game/game.history.js';
import drag from 'components/game/game.drag.js';

export default {

	refs: {},
	
	mode: 2,
	itemSize: 30,

	history: HISTORY,
	drag: drag,

	matrix: {},

	colors: {
		2: 'skyblue',
		4: 'cornflowerblue',
		6: 'royalblue',
		8: '#1933e1',
		10: 'darkgoldenrod',
		12: 'dodgerblue',
		14: 'sandybrown',
		16: 'aquamarine'
	},

	
	getElementsToShow(size = 1) {
		var elCount = size * 2 / this.mode;  // 4 => [2, 4, 6, 8]
		var elementsToShow = {};
		
		for (var i = 1; i <= elCount; i++) {
			elementsToShow[i * this.mode] = elCount - i + 1;
		}
		return elementsToShow;
	},


	insertItemToMatrix(countOfElements, size = 1) {
		var itemIndex = U.random(0, size * size);
		if(!this.matrix[itemIndex]) {
			this.matrix[itemIndex] = countOfElements;
		} else {
			console.log('retry place:', countOfElements);
			this.insertItemToMatrix(countOfElements, size);
		}
	},


	clearDuplicatedMatrixItems(size = 1) {
		this.clearMatrixItem(0, size);
	},


	clearMatrixItem(itemIndex, size = 1) {
		if(size*size < itemIndex) return; // Break loop

		const _top = (currRow, itemIndex, number)=> {
			var formula = itemIndex - size;
			if(number == this.matrix[formula]) delete this.matrix[formula];
			return this.matrix[formula];
		};
		const _left = (currRow, itemIndex, number)=> {
			var formula = itemIndex - 1;
			if(currRow === Math.floor(formula / size)) {
				if(number == this.matrix[formula]) delete this.matrix[formula];
				return this.matrix[formula];
			}
		};
		const _right = (currRow, itemIndex, number)=> {
			var formula = itemIndex + 1;
			if(currRow === Math.floor(formula / size)) {
				if(number == this.matrix[formula]) delete this.matrix[formula];
				return this.matrix[formula];
			}
		};
		const _bottom = (currRow, itemIndex, number)=> {
			var formula = itemIndex + size;
			if(number == this.matrix[formula]) delete this.matrix[formula];
			return this.matrix[formula];
		};

		var number = parseInt(this.matrix[itemIndex]);
		var currRow = Math.floor(itemIndex / size);
		if(this.matrix[itemIndex]) {
			_top(currRow, itemIndex, number); // look top
			_left(currRow, itemIndex, number); // look left
			_right(currRow, itemIndex, number); // look right
			_bottom(currRow, itemIndex, number); // look bottom
		}
		this.clearMatrixItem(itemIndex+1, size);
	}
};