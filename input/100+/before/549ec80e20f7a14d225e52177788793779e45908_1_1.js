function(e)
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
}