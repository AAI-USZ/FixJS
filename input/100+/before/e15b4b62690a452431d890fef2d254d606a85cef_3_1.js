function load() {
	console.log('Popup page is loaded.');
	//Atom = new App();
	// attach click event to minimize button    
    // Initialize whatever else needs to be initialized

	 FeedViewer.initialise();
  	 modes.initialise();
	 pokki.resetContextMenu();
	 if(!window.localStorage.getItem("isSyncOn"))
	 	window.localStorage.setItem("isSyncOn","false");
	 IS_SYNC_ON = window.localStorage.getItem("isSyncOn");
	 console.log("is sync on : " + IS_SYNC_ON);
	 if(IS_SYNC_ON == "true"){
		 setInterval(function(){Reader.syncSubscriptions()},5000*24);
		 addContextMenu();
		 continueLocal();
		 
	 }else
	 {
		 console.log("sync is off");
		$("#loadercontainer").find("h3").hide(0);
		$("#loadercontainer").find("a").css("display","inline");
	 }
	//$('#loader').fadeOut(1000);
	//$('#loadercontainer').fadeOut(1000); 
	//$(".scrollable").css('opacity',1);
	  //FeedEngine.initialise();

}