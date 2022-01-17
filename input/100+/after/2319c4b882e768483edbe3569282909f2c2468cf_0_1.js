function(){
	//优化了一下，尽力少扫描些信息
	var myself=$(this);
		var data_sid=myself.attr("data-status-id");	
		var user_quote=myself.find("div.bd blockquote p").html();
		var Statue={};
			Statue.data_sid=data_sid;
			Statue.user_quote=user_quote;
	//to render player? or not
	if(Statue.user_quote!=null){
	  var ifPlayer=(Statue.user_quote.indexOf(replace_player_holder)===-1)?false:true;
		if(ifPlayer){
			console.log("ifPlayer holder?"+ifPlayer);
			var user_quote_obj=myself.find("div.bd blockquote p");

		var msg={method:"getFile",id:Statue.data_sid};
		bgFileHandler(msg).then(function(response){
				if (response.file) {
					renderPlayer(user_quote_obj,response.file);
				};
				if(response.error){
					getFileAgain(Statue,user_quote_obj);
				}
		});				
		}//end of ifplayer?
	}//end of not user quote null
		//===========================================
		}