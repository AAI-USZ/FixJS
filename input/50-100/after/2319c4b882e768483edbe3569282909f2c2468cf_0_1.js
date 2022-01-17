function(dom,base64File){
			var src=" src='"+base64File+"' ";
			var audio_tag="<audio autoplay controls "+ 
							src+
							//"id=audio_"+
							//Statue.data_sid+
							">";
			//$("div.mod[data-status-id='971768591'] div.bd blockquote p")
			//orgin_html.find("p").html()
			var orgin_audio=dom.find("audio");
				orgin_audio.remove();
			var org_txt=dom.html();
			var	txt="";
			//防御式编程....
			if(org_txt){
				txt=org_txt.replace(replace_player_holder,"");
			}
			//var orgin_audio=$("<p>"+audio_tag+"</p>").find("audio");
			//	orgin_audio.remove();
			dom.html(txt+audio_tag);
	}