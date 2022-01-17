function getData() {
		// Call Function //
		toggle("on");
		if(localStorage.length === 0) {
			alert("There is no data in Local Storage. \n Default Data was added.");
			autoFillData();
		}
		// Create new page //
		var makeDiv = document.getElementById('dataList');
		makeDiv.setAttribute("id", "items");
		makeDiv.setAttribute("data-role", "content");
		var makeList = document.createElement('ul');
		makeList.setAttribute("data-role", "listview");
		makeDiv.appendChild(makeList);
		$('#dataList').append(makeDiv);
		// Set 'items' display //
		$('#items').css("display", "block");
		for(var i=0, j=localStorage.length; i<j; i++) {
			var makeLi = document.createElement('li');
			makeLi.style.fontSize = "25px";
			var buttonsLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// Convert string from local storage into value by JSON.parse //
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			getImage(obj.training[1], makeSubList);
			for (var x in obj) {
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubTxt = obj[x][0]+" "+obj[x][1];
				makeSubLi.innerHTML = optSubTxt;
				makeSubList.appendChild(buttonsLi);
			}
			makeButtonsLi(localStorage.key(i), buttonsLi);
		}
	}