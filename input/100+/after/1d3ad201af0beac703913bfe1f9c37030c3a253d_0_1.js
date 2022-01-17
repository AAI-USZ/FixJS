function writeCodeLines(code) {
		if(code === null) return;
		if((typeof code) === "string"){
			code = jQuery.parseJSON(code);
		}
		$('#code_id').val(code.id);
		var lines = code.text.split('\n');
		num_lines = lines.length;
		$("#code").text(code.text);
		if(!codeMirror){
			getLanguage(code.language_id,function(language_ob) {
				var language = language_data.data[language_ob.mode];
				var req_ob = {};
				var requirements = [];
				resolveRequirements(language_data.data,
									language_ob.mode,
									req_ob,
									requirements);
				if(req_ob[language_ob.mode] === undefined)
					requirements.push(language_ob.mode);
				for(var index in requirements) {
					var lang = requirements[index];
					var file = language_data.data[lang].file;
					if(file !== undefined) {
						include(language_data.include_path+file);
					}
				}
				var options = {
					lineNumbers: true,
					lineWrapping: true,
					fixedGutter: true,
					readOnly: true,
					onGutterClick: showComments,
					onCursorActivity: getSelection,
					mode: language.mode
				};
				for(var index in language.options) {
					options[index] = language.options[index];
				}
				codeMirror = CodeMirror.fromTextArea(
					document.getElementById("code"),options);
				getComments(code.id,writeComments,handleAjaxError);
			},handleAjaxError);
		}else{
			comments = [];
			$(".commentSet").remove();
			getComments(code.id,writeComments,handleAjaxError);
		}
	}