function getData() {
		toggle("on");
		if (localStorage.length === 0) {
			alert("No bills to display!");
		}
		//see local storage data in browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var	makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ElId('items').style.display = "block";
		for (var i = 0, j = localStorage.length; i < j; i++) {
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var object = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for (var a in object) {
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = object[a][0] + " " + object[a][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			//make edit and delete links for local storage
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}