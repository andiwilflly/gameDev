import HISTORY from 'components/game/game.history.js';
import calculations from 'components/game/game.calculations.js';
import drag from 'components/game/game.drag.js';

export default {

	refs: {},
	
	mode: 2,
	itemSize: 30,

	history: HISTORY,
	drag: drag,
	calculations: calculations,

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
	

	dragToPos(draggable, offsetLeft, offsetTop, time = 700) {
		return new Promise((resolve, reject)=> {
			G.default.refs.gameDragEl.style.transition = 'all ' + time / 1000 + 's';
			draggable.setState({offsetLeft, offsetTop}); // Go to start position
			setTimeout(()=> {
				G.default.refs.gameDragEl.style.transition = 'inherit';
				resolve();
			}, time);
		});
	},


	fadeOut(el, time, htmlToReplace) {
		return new Promise((resolve, reject)=> {
			el.style.transition = 'all ' + time / 1000 + 's';
			el.style.opacity = 0.5;
			if(htmlToReplace) el.innerHTML = htmlToReplace;
			setTimeout(()=> {
				el.style.transition = 'inherit';
				resolve();
			}, time);
		})
	}
};