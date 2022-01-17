function(){
		stopAnimation();
		var removeString = 'delete',
			listH = document.getElementById('listH'),
			imgIn = document.getElementById('imgIn'),
			activeLi = getActiveEl(listH),
			getCurrentLi = document.getElementById('list_' + activeLi),
			imgArr = _CG.cookie.get(CGSettings.setCookieName),
			getTName = getThumbNames();

		for(var x = 0; x < getTName.length; x++){
			var currentT = document.getElementById('thumb_' + getTName[x]),
				currentB = mObjs[x].src,
				matchSrc = currentB.match(CGSettings.imagesdir),
				replaceSrc = currentB.replace(matchSrc, ''); //replace extensions and get only the image name and apply id to the img thumbs
			
			if(currentT.parentNode == getCurrentLi){
				for(var i=0; i < imgArr.length; i++){
					var test = imgArr[i].match(CGSettings.fileTypes);
					var matchAT = imgArr[i].match(currentT.id + test), //match active thumb
						matchBA = imgArr[i].match(replaceSrc); //match big image active
					if(matchAT){
						imgArr[i] = imgArr[i].replace(matchAT, ''); //goes here when the reset button its presed sets the cookie back from 0
					}else if(matchBA){
						imgArr[i] = imgArr[i].replace(matchBA, '');
					};
				};
				break;
			};
		};
		imgArr.clean("");
		confirmationPopup(removeString, imgArr);
		
	}