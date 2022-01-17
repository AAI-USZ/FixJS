function(){
		var field="<div class='field'>";
		var bd="<div class='bd'>";		
		var cancel_btn="<a href='javascript:void(0);' class='bn-x isay-cancel'>×</a>";
		var input="<input type='text' id='isay-inp-url'"+ 
	     		   "value='http://www.baidu.com' class='url' name='url'"+ 
	     		   "autocomplete='off' goog_input_chext='chext'>";
		var span_btn="<span class='bn-flat'>"+
						"<input type='button' value='录音'"+
						"class='bn-record'></span>";
		var upload_btn="<span class='bn-flat'>"+
				"<input type='button' value='上传'"+
				"class='bn-upload'></span>";
		var test="<input type='file' accept='audio/*;capture=microphone'>";
		var end_div="</div>";
		var result="<span id='voice-result'></span>";
		var name="<span id='voice-name'><p><div></div></p></span>​";
		var final_html=field+
						  bd+
		                    result+
		                    name+
		                   // test+
		                   cancel_btn+
		                    span_btn+upload_btn+
		                   end_div+
		               end_div;
		$("#isay-act-field").html(final_html);
		//$("#isay-act-field").show();
		$("#isay-act-field .field").show();
		//默认不显示上传
		$(".bn-upload").hide();
		//取消录音
		$("#isay-act-field .isay-cancel").click(function(){
				$("#isay-act-field .field").hide();
		});
		//录音	
		$("#isay-act-field .bn-record").click(function(){
						doRecord();
		});
		//上传	
		$("#isay-act-field .bn-upload").click(function(){
						renderUploader();
		});	
				
	}