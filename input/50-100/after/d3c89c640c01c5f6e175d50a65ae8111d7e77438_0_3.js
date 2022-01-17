function(inAgent){
			var nowTime = Math.floor(new Date().getTime() / 1000);
			tr.cells[1].style.backgroundImage = 'url("/images/' + inAgent.state + '.png")';
			tr.cells[2].innerHTML = inAgent.statedataDisplay();
		}