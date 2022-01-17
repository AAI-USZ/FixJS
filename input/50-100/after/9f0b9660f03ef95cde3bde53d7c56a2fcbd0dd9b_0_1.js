function getImage(imgName, makeSubList) {
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute("src", "images/" + imgName + ".png");
		newImage.style.paddingTop = "10px";
		imageLi.appendChild(newImage);
	}