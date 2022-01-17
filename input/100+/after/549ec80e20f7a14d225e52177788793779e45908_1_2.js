function sendtoserver() {
	var xhr = Titanium.Network.createHTTPClient();
//	Create view that will block out the other Table options while sending to the server.
	try {
		var view = Titanium.UI.createView({
			backgroundColor:'black',
			width: 320,
			height: 460,
			opacity: 0.9
			});
		
			win3.add(view);
			
			//	Activity Indicator
			actInd.show();

			//	Progress Bar
			win3.add(progressBar);
			progressBar.show();
			
		xhr.onerror = function(e)
			{
			//	If there is an error in the upload , alert to say "Connection Lost" and restore controls and remove activity indicator
			setTimeout(function(){
				lostServer.show();
				},500);
		
			setTimeout(function(){
				lostServer.hide();
				},3000);
			
			Titanium.API.info('IN ERROR' + e.error);
			//Restorting everything back to normal after error.
			//Taking out blocking view
			win3.remove(view);
			//Hiding activity view
			actInd.hide();
			//Taking out the progress bar completely.
			progressBar.hide();
			progressBar.value = 0;
			win3.remove(progressBar);
			};
		
		//	Setting up timeout function for 25 seconds
		xhr.setTimeout(25000);
		
		xhr.onload = function(e)
			{
			if (this.status == '404') {
				//	If the upload results in a not found page
				Ti.API.info('error: http status code ' + this.status);
				setTimeout(function(){
					lostServer.show(); // was successDisplay.show
					},500);
	
				setTimeout(function(){
					lostServer.hide();
					},3000);

				win3.remove(view);
				actInd.hide();

				progressBar.hide();
				progressBar.value = 0;
				win3.remove(progressBar);
				file = null;
					} else {
						Ti.API.info('http status code ' + this.status);
						setTimeout(function(){
							successDisplay.show();
							},500);
	
						setTimeout(function(){
							successDisplay.hide();
							},3000);
						//	If the upload is successful, alert to say "Success" and restore controls and remove activity indicator
						win3.remove(view);
						actInd.hide();

						progressBar.hide();
						progressBar.value = 0;
						win3.remove(progressBar);
						file = null;
						}
			};

		xhr.onsendstream = function(e)
			{
				progressBar.value = e.progress;
				Titanium.API.info('ONSENDSTREAM - PROGRESS: ' + e.progress);
				};
			
		//	open the client
		xhr.open('POST', posturl);
		
		xhr.send(postData);

	} catch(e) {
		Ti.API.info("In Error: " + e.error);
		setTimeout(function(){
			lostServer.show();
			},1000);
	
		setTimeout(function(){
			lostServer.hide();
			},3000);
		Titanium.API.info(e.error);
	}

}