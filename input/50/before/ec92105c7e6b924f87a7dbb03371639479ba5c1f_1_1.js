function changeContent(ele,text){
	content.innerHTML = text;
	removeSelected();
	ele.addClassName('selected');
}