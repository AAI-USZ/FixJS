function(){
            // variable to store the path into
            var path = "";
            
			// directory action
			if($(this).hasClass("dir")) {
				// if there are no children, see if there should be any from the server
				if(!$(this).children("ul").length) {
                    console.log("loading contents of folder...");
					path = "";

					// store this node's contribution to the path
					path += "/" + $(this).text();

					// construct the path by concatenating all parent directory nodes' path attributes
					$(this).parents("li").each(function(){
						path = "/" + $(this).attr("params").replace(/^.*path=([^&]+)$/, "$1") + path;
					});

					// set the path paramater and add the folder icon
					$(this).attr("params", "path="+path).children(".ui-icon").toggleClass("ui-icon-folder-collapsed ui-icon-folder-open");

					// set the status indicator to loading
					$(this).children(".status").addClass("loading");

					// fire off the ajax request to load the children of this node
					$.loadView(this);

					// reset params to just this node's contribution (current folder name)
					$(this).attr("params", $(this).text());
				} else {
                    console.log("toggling view of folder...");
					// just open the collapsed folder structure
					$(this).children(".ui-icon").toggleClass("ui-icon-folder-collapsed ui-icon-folder-open").siblings("ul").toggle();
					// TODO: refresh folder! Don't want it to collapse or lose any children nodes though...
				}
			// file action
			} else if($(this).hasClass("file")) {
				path = "/";

				$(this).parents(".dir").each(function(){
					path = "/" + $(">span", this).text() + path;
				});

				var filePath = path + $(">span", this).text();
				window.location.hash = "file=" + filePath;
                
                $("#comiEditor-editor").attr("params", "file=" + filePath);
                $("#comiEditor-editor").empty();
                $.loadView("#comiEditor-editor", false);
			}

			// only one file/folder should ever be selected (unless control or shift is used...)
			// TODO: add shift and control support 
			$(".selected").removeClass("selected");

			// select the current item
			$(this).addClass("selected");
            
            // close the contextmenu if it is there
            $("#navigationMenu").remove();
            
            return false;
		}