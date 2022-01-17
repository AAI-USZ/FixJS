function(inAgent){
			var nowTime = Math.floor(new Date().getTime() / 1000);
			tr.cells[1].style.backgroundImage = 'url("/images/' + inAgent.state + '.png")';
			tr.cells[2].innerHTML = formatseconds(nowTime - inAgent.lastchange);
			tr.cells[3].innerHTML = Math.floor(inAgent.calcUtilPercent()) + '%';
			tr.cells[4].innerHTML = inAgent.statedataDisplay();
		}