function(){
			var li=$("#voice-name");
			var p = "<p width='300px' class='loader'></p>";
			li.after(p);
		//有两个功能性的BUG
		//1、第二次点击上传后，会重复加载的问题。。这个得改，换成HTML()方法也许可以
		//2、识别输入框，加入锚记的功能，另外也许还得搞定字数的问题
		var options={responseType:'blob',uri:test_wav};
		xhr2(options).then(function(xhr){

			loadBlobToBase64(xhr.response).then(function(base64){
				var dom=$('.loader');
	        		var src=" src='"+base64+"' ";
					var audio_tag="<audio autoplay controls "+ 
										src+
										//"id=audio_"+
										//Statue.data_sid+
										">";
					dom.html(audio_tag);
			      	//console.log(reader.result);
			    var text_obj=$('#isay-cont');
			    var text_label=$('#isay-label');
			    var label=text_label.html();
			    if (label==='说点什么吧...') {
			    //为空的情况下，清空LABLE，并加入自定义字体的标签
			    	text_label.html('');
			    	text_obj.text("؆");
			    }else{
			    //已经有内容了,则仅仅加入特殊字符标记
			    	console.log("saying is not null");
			    	var text=text_obj.text();
			    	text_obj.text(text+"؆");	
			    }
			    console.log("saying is not null?????"+label);			    
			});        		
				
		}, function(){
				console.log("error");
		});				

	}