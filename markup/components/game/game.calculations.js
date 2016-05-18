export default {

	clearDuplicatedMatrixItems(size) {
		return new Promise((resolve, reject)=> {
			this.clearMatrixItem(0, size, resolve);
		});
	},


	clearMatrixItem(itemIndex, size, resolve) {
		return new Promise((localResolve)=> {
			if (size * size < itemIndex) {
				if(resolve) resolve();
				return; // Break loop
			}

			var number = parseInt(G.default.matrix[itemIndex]);
			var currRow = Math.floor(itemIndex / size);
			if (G.default.matrix[itemIndex]) {
				Promise.all([
					this.top(size, currRow, itemIndex, number),
					this.left(size, currRow, itemIndex, number),
					this.right(size, currRow, itemIndex, number),
					this.bottom(size, currRow, itemIndex, number)
				]).then((currScore)=> {
					var score = currScore.reduce((a, b) => (a > 0 ? a : (b > 0 ? b : 0)), 0);
					G.default.gameComponent.setState({
						currScore: score + G.default.gameComponent.state.currScore
					});

					localResolve();
					if(resolve) this.clearMatrixItem(itemIndex + 1, size, resolve);
				})
			} else {
				localResolve();
				if(resolve) this.clearMatrixItem(itemIndex + 1, size, resolve);
			}
		});
	},
	

	top(size, currRow, itemIndex, number) {
		return new Promise((resolve, reject)=> {
			var formula = itemIndex - size;
			if (number == G.default.matrix[formula]) {
				console.log('move el from top to bottom');
				let itemToMove = G.default.refs[`gameItem_${formula}`].childNodes[0];
				G.default.fadeOut(itemToMove, 700, '+' + number).then(()=> {
					delete G.default.matrix[formula];
					resolve(number);
				});
			} else { resolve(0); }
		});
	},
	

	left(size, currRow, itemIndex, number) {
		return new Promise((resolve, reject)=> {
			var formula = itemIndex - 1;
			if (currRow === Math.floor(formula / size)) {
				if (number == G.default.matrix[formula]) {
					console.log('move el from left to right');
					let itemToMove = G.default.refs[`gameItem_${formula}`].childNodes[0];
					G.default.fadeOut(itemToMove, 700, '+' + number).then(()=> {
						delete G.default.matrix[formula];
						resolve(number);
					});
				} else { resolve(0); }
			} else { resolve(0); }
		});
	},
	

	right(size, currRow, itemIndex, number) {
		return new Promise((resolve, reject)=> {
			var formula = itemIndex + 1;
			if (currRow === Math.floor(formula / size)) {
				if (number == G.default.matrix[formula]) {
					console.log('move el from right to left');
					let itemToMove = G.default.refs[`gameItem_${formula}`].childNodes[0];
					G.default.fadeOut(itemToMove, 700, '+' + number).then(()=> {
						delete G.default.matrix[formula];
						resolve(number);
					});
				} else { resolve(0); }
			} else { resolve(0); }
		});
	},

	
	bottom(size, currRow, itemIndex, number) {
		return new Promise((resolve, reject)=> {
			var formula = itemIndex + size;
			if (number == G.default.matrix[formula]) {
				console.log('move el from bottom to top');
				let itemToMove = G.default.refs[`gameItem_${formula}`].childNodes[0];
				G.default.fadeOut(itemToMove, 700, '+' + number).then(()=> {
					delete G.default.matrix[formula];
					resolve(number);
				});
			} else { resolve(0); }
		});
	}
}