function addMusic(resp,tag,url) {

    data = resp.data;
	var list = playerList;

	var item = create('li',list, {"class":"playerListItem"});

	//item.innerHTML = tag;

	var tagelem = create('span',item,{"class":"playerListItemTag"});

	tagelem.innerHTML = tag;

	tagelem.title = tag;

	if(resp.tag) {

		var realtag = tag.replace(' ','');

		if(resp.tag != realtag && resp.tag != tag){

		tagelem.innerHTML = "(!) " + tag;

		tagelem.title = "'" + tag + "' was not found, playing '" + resp.tag + "' instead.";

		}

	}
	item.move = function() {

		playerMovingListItem = this;

		showMoverTargets(false);

		showMoverTargets();

	};

	item.remove = function() {
		if(this.getAttribute('playing') == "true") {

			playerPlayer.pause();

			playerPlayer.src = "";

			playerImage.src = "";

			playerTitle.innerHTML = "";

			playerTime.innerHTML = "";

			playerSeekbarCurrent.style.left = "0px";

		}
		(window.webkitURL || window.URL).revokeObjectURL(this.bloburl);

		this.parentNode.removeChild(this);

	};

	item.addEventListener('contextmenu',function(e) {

		e.preventDefault();

		if(playerListItemMenu.parentNode) playerListItemMenu.parentNode.removeChild(playerListItemMenu);

		document.body.appendChild(playerListItemMenu);

		playerListItemMenu.style.left = e.clientX + 5 + "px";

		playerListItemMenu.style.top = e.clientY + 5 + "px";

		playerListItemMenu.item = this;
		playerListItemMenu.save.href = this.bloburl;

		playerListItemMenu.save.setAttribute("download",this.tag + ".ogg");

	});

	var mover = create('div', item, {"class":"playerListItemMoveTarget"});

	mover.style.display = "none";

	var mvl = create('a', mover, {"href":"#"});

	mvl.addEventListener('click',function(e) {

		e.preventDefault();

		var li = e.target.parentNode.parentNode;

		playerMovingListItem.parentNode.removeChild(playerMovingListItem);

		insertAfter(li,playerMovingListItem);

		showMoverTargets(false);

	});

	mvl.innerHTML = "[here]";

	var BlobBuilder = (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder);

    var bb = new BlobBuilder();

	//if(data instanceof Array){

	//	for(var i = 0; i < data.length;i++)

	//		bb.append(data[i]);

	//}else{

		bb.append(data);

	//}

    var blob = bb.getBlob('audio/ogg');

	item.bloburl = (window.webkitURL || window.URL).createObjectURL(blob);

	item.tag = tag;

	item.uri = url;

	item.tagelem = tagelem;

	tagelem.addEventListener('click', function(e) {

		if(e.target.parentNode.bloburl){

			var items = list.getElementsByTagName('li');

			for(var i in items) {

				if(items[i].setAttribute)

				items[i].setAttribute("playing",false);

			}

			e.target.parentNode.setAttribute("playing",true);

			

            playerPlayer.src = e.target.parentNode.bloburl;

			playerTitle.innerHTML = e.target.parentNode.tag;

			playerTitle.title = e.target.parentNode.tag;

			playerPlayer.play();

			playerCurrentVolume.style.left = (playerPlayer.volume * 55)+"px";

			playerImage.src = e.target.parentNode.uri;

			

		}

	});

	if(playerPlayer.paused) { tagelem.click(); }

}