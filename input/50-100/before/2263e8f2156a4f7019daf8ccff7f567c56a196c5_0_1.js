function (){
		//http://www.douban.com/note/create?voice=true
		if(ifupdate_url&&urlParams['voice']==='true'){
			initNote();
		}
		//如果是在刚创建的日记里则赶紧处理	
		var temp_url=localStorage["temp_note"];
		if(location.href===temp_url){
			console.log("I am in temp~");
			location.href="http://www.douban.com/update/";
		}

	}