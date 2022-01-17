function getData() {
		toggle("on");
		if (localStorage.length === 0) {
			alert("No bills to display!");
		}
		//see local storage data in browser
		var makeDiv = document.createElement('div'),
			makeList = document.createElement('ul'),
			i,
			j,
			key = localStorage.key(i),
			value = localStorage.getItem(key),
			object = JSON.parse(value),
			makeLi,
			makeSubList,
			a,
			makeSubLi,
			optSubText,
			linksLi = document.createElement('li');
		makeDiv.setAttribute("id", "items");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		//ElId('items').style.display = "block";
		for (i = 0, j = localStorage.length; i < j; i++) {
			makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for (a in object) {
				makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				optSubText = object[a][0] + " " + object[a][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
		//make edit and delete links for local storage
		makeItemLinks(localStorage.key(i), linksLi);
		}
	}