function showSetSheetmusic(setId, event){
		
	var div = document.createElement("div");
	var fl = new FloatingContainer(null, null, div);
	var arrImgs = [];
	var loaded=0;
	
	// find the set object
	var set = setsArr[setId];

	// construct the content
	// go through each tune in set and find img if exists
	for(var idx in set.tunesArr){
		var tuneId = set.tunesArr[idx];
		var title = document.createElement("div");
		title.className = "info black";
		title.innerHTML = tunesArr[tuneId].title;
		div.appendChild(title);
		
		// find img
		var res = tuneHasImg(tuneId);
		if(res){
			var img = new Image();
			img.style.margin = 5;
			$(div).append(img).append('<br>').append('<br>')
			
			// set onload handler for image to callback (but don't set img src attr until 
			// done with this img-finding loop: img attr begins load and total count must be known before any loading).
			img.onload = loadCount;
			arrImgs.push({img:img, res:res});
		}
		else{
		
			var placeHolder = $('<div></div>').addClass('info')
				.html("[no sheetmusic] &nbsp;")
				.append("<a name=newSheetmusicBtn class='normal copperdark pointer' tuneId="+tuneId+">add sheetmusic &raquo;</a>")
				.append('<br>').append('<br>')
			
			placeHolder.find('[name=newSheetmusicBtn]').click(function(event){
				
				// get resource search tool
				addSearchOptions($('#newSheetMusic').find('[name=resourceOptionsBox]'), 
					'newSheetMusic', tunesArr[tuneId])
				
				var nsm = new FloatingContainer(null, null, $('#newSheetMusic').get(0));
				nsm.addContentElement($('#newSheetMusic').css({'height':500}).get(0));
				nsm.setTitle("<span style='color:lightgray'>Sheetmusic Search </span>");
				nsm.show(event, 1000, 500, 
					FC_CLOSE_ON_OUTSIDE_CLICK | FC_AUTO_POSITION_CENTER | FC_CLOSE_ON_ESC | FC_RESTORE_CONTENT_ELEM);
				return false;
			})
			div.appendChild(placeHolder.get(0));
		}
	}
	
	// add option to edit the set
	var editSetBtn = document.createElement('span');
	$(editSetBtn).html("edit set &raquo;").click(function(e){
		setEditDlg(setId, e, FC_AUTO_POSITION_CENTER); 
		fl.close();
		return false;
	})
	editSetBtn.className = "info normal orange pointer";
	
	$(div).append($('<div><div>').append(editSetBtn))
	
	// if images exist for any tune, set src attribute which will start load
	if(arrImgs.length)
		for(var i in arrImgs){
			arrImgs[i].img.src = arrImgs[i].res.localFile;
		}
	else
		loadCount();

	function tuneHasImg(tuneId){
		for(var j in resourcesArr){
			var res = resourcesArr[j];
			if(res.belongsTo(tuneId) && res.resourceType == RESOURCE_SHEETMUSIC){
				
				return res;
			}
		}
		return null;
	}
		fl.addContentElement(div);
	fl.setTitle("<span style='color:lightgray'>Sheetmusic: </span>" + set.getSetAsHTML());
	fl.setCancelButtonText('close');			
	
	// callback for images onload event. when all images available have loaded, show the pop up window
	// which will then size correctly
	function loadCount(){	
		
		loaded++;
		if(loaded >= arrImgs.length){
			fl.show(event, 300, 250, FC_CLOSE_ON_OUTSIDE_CLICK | FC_AUTO_POSITION_CENTER | FC_CLOSE_ON_ESC);
		}
	}
			
//	fl.show(event, 500, 250, FC_CLOSE_ON_OUTSIDE_CLICK | FC_AUTO_POSITION_CENTER | FC_CLOSE_ON_ESC);
}