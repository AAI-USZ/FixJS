function addButton(title, parent, onClickFunction){
	var button=document.createElement("button");
	button.textContent=title;
	button.onclick=onClickFunction;
	button.setAttribute("id", title);
	parent.appendChild(button);
}