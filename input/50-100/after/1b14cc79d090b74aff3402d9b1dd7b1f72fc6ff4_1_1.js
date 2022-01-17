function getPageBlockedAnswer(event){
	if(event.name===pckg+".pageBlockAnswer"){
//		console.log("pageBlockAnswer received");
		if(event.message === true){
			console.log("page should be blocked "+location.href);
//			safari.self.tab.dispatchMessage("CloseActiveTabRequest",null);
//			location.href="about:blank";
			//location.href=safari.extension.baseURI+"close.html";
//			window.close();
		}else {
			console.log("page is ok");
		}
	}	
}