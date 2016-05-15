export function $(selector) {
	if(selector.match(/#/)) return document.querySelectorAll(selector)[0]; // id
	return document.querySelectorAll(selector);
}


export function random(min = 0, max = 1000) {
	return Math.floor(Math.random() * (max - min)) + min;
}