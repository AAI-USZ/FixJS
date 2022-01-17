function getImage(makeSubList, c){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		newImg.setAttribute("src", "images/" + c + ".png")
		imageLi.appendChild(newImg);
	}