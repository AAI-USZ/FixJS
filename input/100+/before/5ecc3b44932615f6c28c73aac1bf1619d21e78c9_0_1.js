function showPlayer() {

	if(!isPlayer) {

		

		loadConf();

		playerDiv = create('div', undefined, {"id":"playerDiv"});

		

		playerDiv.style.right = playerSaveData.right+'px';

		playerDiv.style.bottom = playerSaveData.bottom+'px';

		

		

		playerHeader = create('div', playerDiv, {"id": "playerHeader"});

		playerTitle = create('div', playerHeader, {"id": "playerTitle"});

		playerTime = create('div', playerHeader, {"id": "playerTime"});

		playerImage = create('img', playerDiv, {"id": "playerImage"});

		playerControls = create('div', playerDiv, {"id": "playerControls"});

		playerVolumeSeekHeader = create('div', playerDiv, {"id": "playerVolumeSeekHeader"});

		playerVolume = create('div', playerDiv, {"id": "playerVolume"});

		playerCurrentVolume = create('div',playerVolume, {"id": "playerCurrentVolume"});

		playerVolume.addEventListener('click', function(e) {

		var n=Math.round((e.layerX-5)/5)*5;

		if(n < 0 || n > 55)return;

		playerCurrentVolume.style.left = n +"px";

		playerPlayer.volume=n/55;

		});

		playerVolume.addEventListener("DOMMouseScroll",function(e) {

			e.preventDefault();

			var n = Number(playerCurrentVolume.style.left.replace("px",""));

			if(e.detail<0) {

				n+=5;

			}else if(e.detail>0) {

				n-=5;

			}

			n=Math.round(n/5)*5;

			if(n < 0 || n > 55)return;

			playerCurrentVolume.style.left = n +"px";

			playerPlayer.volume=n/55;

		});

		

		playerSeekbar = create('div', playerDiv, {"id":"playerSeekbar"});

		playerSeekbarCurrent = create('div', playerSeekbar, {"id":"playerSeekbarCurrent"});

		

		playerSeekbar.addEventListener('click', function(e) {

			if(e.target == playerSeekbar) {

				e.preventDefault();

				if(e.layerX < 0 || e.layerX > 120) return;

				var n = e.layerX/120;

				if ((chrome?this.duration:playerCurrentDuration) !== 0) {

					playerPlayer.currentTime = (chrome?this.duration:playerCurrentDuration) * n;

				}

			}

		});

		

		playerList = create('div', playerDiv, {"id":"playerList"});

		playerControls2 = create('div',playerDiv, {"id": "playerControls2"});

		playerPlayer = create('audio', playerDiv, {"id": "playerPlayer"});

		//playerCurrentVolume.style.left = (playerPlayer.volume*170) + "px";

		playerPlayer.addEventListener('ended', function() {playerPlayPause.innerHTML = ">"; nextMusic(true);});

		playerPlayer.volume = playerSaveData.volume;

		//copy from Triangle's script

		playerPlayer.addEventListener('play', function(e) {

			fixFFbug();

		});

		//end

		fixFFbug();

		playerPlayer.addEventListener('timeupdate', function(e) {

			if(this.currentTime > 0){

				var x = (this.currentTime/(chrome?this.duration:playerCurrentDuration)) * 115;

				if(x > 115) {

					fixFFbug();

					playerSeekbarCurrent.style.left = "0px";

					return;

				}

				playerSeekbarCurrent.style.left = x + "px";

				playerTime.innerHTML = sectos(Math.round(this.currentTime)) + "/" + sectos(Math.round(chrome?this.duration:playerCurrentDuration)) || "[unknown]";

			}

		});

		

		playerPlayer.addEventListener('play', function() {playerPlayPause.innerHTML="| |";});

		playerPlayer.addEventListener('pause', function() {playerPlayPause.innerHTML=">";});

		playerRepeat = create('a', playerControls2, {"href": "#"});

		switch(playerSaveData.repeat){

			case 1: playerRepeat.innerHTML = "[RA]"; playerRepeat.title = "Repeat all"; break;

			case 2: playerRepeat.innerHTML = "[R1]"; playerRepeat.title = "Repeat one"; break;

			case 0: playerRepeat.innerHTML = "[RO]"; playerRepeat.title = "Repeat off"; break;

		}

		playerRepeat.addEventListener('click', function(e) {

			e.preventDefault();

			switch(playerSaveData.repeat){

				case 0: playerSaveData.repeat=1; playerRepeat.innerHTML = "[RA]"; playerRepeat.title = "Repeat all"; break;

				case 1: playerSaveData.repeat=2; playerRepeat.innerHTML = "[R1]"; playerRepeat.title = "Repeat one"; break;

				case 2: playerSaveData.repeat=0; playerRepeat.innerHTML = "[RO]"; playerRepeat.title = "Repeat off"; break;

			}

		});

		

		

		playerShuffle = create('a', playerControls2, {"href": "#"});

		playerShuffle.title = playerSaveData.shuffle ? "Shuffle" : "By order";

		playerShuffle.innerHTML = playerSaveData.shuffle ? "[SH]" : "[BO]";

		playerShuffle.addEventListener('click', function(e) {

			e.preventDefault();

			playerSaveData.shuffle = !playerSaveData.shuffle;

			if(playerSaveData.shuffle) {

				playerShuffle.title = "Shuffle";

				playerShuffle.innerHTML = "[SH]";

			}else{

				playerShuffle.title = "By order";

				playerShuffle.innerHTML = "[BO]";

			}

		});

		

		

		playerClose = create('a', playerDiv, {"id":"playerClose","href":"#"});

		playerClose.innerHTML="[X]";

		playerClose.addEventListener('click', function(e) {

			e.preventDefault();

			playerSaveData.right = playerDiv.style.right.replace("px","");

			playerSaveData.bottom = playerDiv.style.bottom.replace("px","");

			playerSaveData.volume = playerPlayer.volume;

			

			localStorage.setItem('4chanSP', JSON.stringify(playerSaveData));

					

			document.body.removeChild(playerDiv);

			playerDiv = null;

			isPlayer = false;

		});

		

		

	

		

		playerChangeMode = create('a', playerControls2, {"id": "playerChangeMode", "href": "#"});

		playerChangeMode.innerHTML = "[M]";

		playerChangeMode.title = "Change view";

		playerChangeMode.addEventListener('click', function(e) {e.preventDefault(); swmode();});



		

		

		playerPrev = create('a', playerControls, {"href": "#", "class":"playerControlLink"});

		playerPrev.innerHTML = "|<<";

		playerPrev.addEventListener('click', function(e) {

			e.preventDefault();

			prevMusic();

		});

		playerBackward = create('a', playerControls, {"href": "#", "class":"playerControlLink"});

		playerBackward.innerHTML = "<<";

		playerBackward.addEventListener('click', function(e) {

			e.preventDefault();

			playerPlayer.currentTime -= 5;

		}); 

		playerPlayPause = create('a', playerControls, {"href": "#", "class":"playerControlLink"});

		playerPlayPause.innerHTML = ">";

		playerPlayPause.addEventListener('click', function(e) {

			e.preventDefault();

			if(playerPlayer.paused)

				playerPlayer.play();

			else

				playerPlayer.pause();

		});

		playerForward = create('a', playerControls, {"href": "#", "class":"playerControlLink"});

		playerForward.innerHTML = ">>";

		playerForward.addEventListener('click', function(e) {

			e.preventDefault();

			playerPlayer.currentTime += 5;

		}); 

		playerNext = create('a', playerControls, {"href": "#", "class":"playerControlLink"});

		playerNext.innerHTML = ">>|";

		playerNext.addEventListener('click', function(e) {

			e.preventDefault();

			nextMusic(false);

		});

		

		playerStyleSettingsButton = create('a', playerDiv, {"id":"playerStyleSettingsButton","href":"#"});

		playerStyleSettingsButton.innerHTML="[S]";

		playerStyleSettingsButton.addEventListener('click', function(e) {

			e.preventDefault();

			if(playerSettings.style.display == "none")

				playerSettings.style.display = "block";

			else

				playerSettings.style.display = "none";

		});

		playerSettings = create('table', playerDiv, {"id":"playerSettings"});

		playerSettings.style.right = "210px";

		playerSettings.style.top = "0px";

		playerSettings.style.display = "none";

		var tbody = create('tbody', playerSettings);

		var headerrow = create('tr', tbody);

		playerSettingsHeader = create('td', headerrow,{"colspan":2});

		playerSettingsHeader.innerHTML = "4chan Sounds Player Style Settings";

		playerSettingsHeader.style.textAlign="center";

		playerSettingsHeader.style.cursor = "move";

		var data = [{name:"Text color",format:"CSS color value",id:"LinkColor",sets:"#playerDiv {color:%1} #playerDiv a {color:%1 !important;} #playerDiv a:visited{color:%1 !important;}"},

					{name:"Control hover color",format:"CSS color value",id:"HoverColor",sets:"#playerDiv a:hover{color:%1 !important;} .playerListItem:hover{color:%1 !important;}"},

					{name:"Background color",format: "CSS color value",id:"BGColor",sets:"#playerSettings {background-color:%1} #playerDiv {background-color:%1}"},

					{name:"Playlist size",format:"Width x Height",id:"PlaylistSize",func: "var data=self.value.split('x'); data[0]=data[0].trim(); data[1]=data[1].trim(); return '#playerList {'+(data[0]?:'width:'+data[0]+'px;':'') + (data[1]?:' heigth:'+data[1]+'px;}':'}') + (data[1]?'.playerListItem{width'+?(Number(data[1])-40)+':px}':'')"},

					{name:"Playlist margins",format:"left,right,top,bottom ('center' is the same as setting both left and right auto",id:"PlaylistMargins",	func: "if(self.value == 'center' ) {return '#playerList {margin-left:auto; margin-right:auto;}'} else {var data=self.value.split(','); return '#playerList {'+(data[0]?'margin-left:'+data[0]+'px;':'') + (data[1]?'margin-right:'+data[1]+'px;':'') + (data[2]?'margin-top:'+data[2]+'px;':'') + (data[3]?'margin-bottom:'+data[3]+'px;':'')+'}';}"},

					{name:"List item background color", format:"CSS color value", id:"ListItemBGColor",sets:".playerListItem{background-color:%1}"},

					{name:"Played list item bg color", format:"CSS color value", id:"PlayedListItemBGColor",sets:".playerListItem[playing=true]{background-color:%1}"}

					//{name:

					]

		for(var i = 0; i < data.length;i++){

			var tr = create('tr',tbody);

			var td = create('td', tr,{"class":"playerSettingLabel"});

			td.innerHTML = data[i].name;

			if(!data[i].sets && !data[i].func) continue;

			if(data[i].format) {

				td.style.cursor = "help";

				td.title = data[i].format;

			}

			td = create('td',tr);

			var input = create('input', td);

			input.classList.add('playerSettingsInput');

			input.id= "playerSettings"+data[i].id;

			input.sets = data[i].sets;

			input.func = data[i].func;

			input.addEventListener('change',function(){

				updateUserCSS();

			});

		}

		

		

		

		playerHeader.down = false;

		playerSettingsHeader.down = false;

		document.addEventListener('mousedown',documentMouseDown);

		document.addEventListener('mouseup',documentMouseUp);

		document.addEventListener('mousemove',documentMouseMove);

		

		

		isPlayer = true;

		document.body.appendChild(playerDiv);

		addCSS();

		

	}

}