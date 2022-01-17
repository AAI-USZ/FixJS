function(language_ob) {
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
				
				//codeOptions, diffOptions, commentOptions are globals
				codeOptions = {
					lineNumbers: true,
					lineWrapping: true,
					fixedGutter: true,
					readOnly: true,
					mode: language.mode,
					onCursorActivity: handleSelection
				};
				diffOptions = {
					lineNumbers: true,
					lineWrapping: true,
					fixedGutter: true,
					readOnly: false,
					smartIndent:false,
					mode: language.mode
				};
				commentOptions = {
					lineNumbers: true,
					lineWrapping: true,
					fixedGutter: true,
					readOnly: true,
					mode: language.mode
				};
				
				for(var index in language.options) {
					diffOptions[index] = 
						codeOptions[index] = 
						commentOptions[index] = language.options[index];
				}
				
				codeMirror = CodeMirror.fromTextArea(
					document.getElementById("code-view"),codeOptions);
				diffMirror = CodeMirror.fromTextArea(
					document.getElementById("diffs"),diffOptions);

				// TODO: Make the code appear in the minimap
				
				getComments(code.id,writeComments,handleAjaxError);
			}