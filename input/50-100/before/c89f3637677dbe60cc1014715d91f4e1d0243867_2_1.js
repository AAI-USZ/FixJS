function () {

	var div = document.createElement('div');

	div.innerHTML = '<v:shape adj="1"/>';



	var shape = div.firstChild;

	shape.style.behavior = 'url(#default#VML)';



	return shape && (typeof shape.adj === 'object');

}