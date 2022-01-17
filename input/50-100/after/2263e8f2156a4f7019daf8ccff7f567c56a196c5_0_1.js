function (){
		//http://www.douban.com/note/create?voice=true
		if(ifupdate_url&&urlParams['voice']==='true'){
			initNote();
		}
		//如果是在刚创建的日记里则赶紧处理	
		var temp_note_id=localStorage["temp_note_id"];
		var new_note_url="http://www.douban.com/note/"+temp_note_id+"/";
		if(location.href===new_note_url){
			console.log("I am in temp~");
			location.href="http://www.douban.com/update/";
		}

	}