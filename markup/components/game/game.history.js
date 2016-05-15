var _vault = [];
var _step = 0;

export default {
	
	show() {
		console.log(_vault);
	},

	save() {
		_vault.push({
			matrix: G.default.matrix,
			_step: _step+1
		});
	},
	
	back(steps = 1) {
		console.log(`go history back for ${steps} steps`);
	},
	
	moveTo(step) {
		console.log(`move to step ${step}`);
	},
	
	clear() {
		console.log('clear history');
	}
}