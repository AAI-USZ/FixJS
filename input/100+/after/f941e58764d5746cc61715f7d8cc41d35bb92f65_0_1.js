function createPreviewElements(files){
	this.files = files;
	
	for(var i = 0; i < this.files.length; i++) {
		
		this.fileName = this.files[i].name;
		
		//shorten long filenames
		if (this.fileName.length > 45)
			this.fileName = this.fileName.substr(0, 45) + '...';
		
		this.fileName = htmlEscape(this.fileName);
		var droppedFiles = document.getElementById('dropped-files');
		
		//create <li> item
		var item = document.createElement('li');
		item.id  = 'file-item-' + i;
		droppedFiles.appendChild(item);
		
		//create "filename"
		var filename 	   = document.createElement('span');
		filename.className = 'filename';
		filename.innerHTML = this.fileName;
		item.appendChild(filename);
		
		//create space for download link
		var downloadLink 	   = document.createElement('a');
		downloadLink.id 	   = 'downloadLink-' + i;
		downloadLink.className = 'downloadLink';
		downloadLink.target    = '_blank';
		item.appendChild(downloadLink);
		
		//add pause button
		var pause 		= document.createElement('div');
		pause.id		= 'pausebutton-' + i;
		pause.className = 'pauseButton small button green';
		pause.innerHTML = 'Pause';
			//custom property
			pause.uploadState = 'uploading';
		item.appendChild(pause);
		
		//create progressbar
		var progress 	   = document.createElement('div');
		progress.id 	   = 'progressbar-' + i;
		progress.className = 'progressbar';
		item.appendChild(progress);
		$("#progressbar-" + i).progressbar({ value: 0.01 }); //initalize the jquery progressbar 
	
		//create the "open log" link
		var loglink 	  = document.createElement('div');
		loglink.id  	  = 'log-link-' + i;
		loglink.className = 'log-link';
		loglink.innerHTML = 'Open log >';
		item.appendChild(loglink);
		
		//create the logger element
		var log 	  = document.createElement('div');
		log.id 		  = 'log-' + i;
		log.className = 'log';
		log.style.display = 'none';
		log.innerHTML = '#Log...<br>';
		item.appendChild(log);
		
		
		//-add event listener to to onclick to show the log
			(function(i, loglink){
				loglink.onclick = function(){
					$('#log-' + i ).slideToggle('fast');
					
					if(loglink.innerHTML == 'Close log v') {
						loglink.innerHTML = 'Open log >';
						
					} else {
						loglink.style.display = 'block';
						loglink.innerHTML = 'Close log v';	
					}
				};
			})(i, loglink);
		
		//Update the preview of resumed uploads, passing the elements we want to change, like progressbar, pausebutton..
		updateResumedItems(this.files[i], progress, pause, downloadLink);
		
	//end for loop
	}
}