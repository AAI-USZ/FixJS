function(selector, attachToDocument) {
        if(attachToDocument!==undefined) { attachToDocument = true; }
        
		$(selector).each(function(){
			var viewName = getViewName(this);

			if(viewName) {
				$.ajax({ url: "/ce/inc/comiEditor.cfc?method=load&returnformat=plain&view="+viewName,
					data: $(this).attr("params"),
					context: this,
					success: function(data){
						t = $(data);
						t.find(".dir").prepend($("<div></div>").addClass("ui-icon ui-icon-folder-collapsed"));
						t.find(".file").prepend($("<div></div>").addClass("ui-icon ui-icon-document"));
						t.find("li").prepend($("<div></div>").addClass("status"));

                        if($(this).is("li")) {
                            $(this).append(t);
                        } else {
                            $(this).html(t);
                        }

						if(t.is("#editor")) {
							var editor = ace.edit("editor");
							editor.setTheme("ace/theme/textmate");

							var saveParams = $(this).attr("params");

							var fileExtension = saveParams.replace(/.*\.([^\.]+)$/, '$1');
							var EditorMode = false;

							if(fileExtension == 'html' || fileExtension == 'cfm' || fileExtension == 'cfc') { 
								EditorMode = require("ace/mode/html").Mode;
							} else if(fileExtension == 'css') {
								EditorMode = require("ace/mode/css").Mode;
							} else if(fileExtension == 'js') {
								EditorMode = require("ace/mode/javascript").Mode;
							}

							if(EditorMode) {
								editor.getSession().setMode(new EditorMode());
							}

							editor.focus();

							editor.commands.addCommand({
								name: 'comiEditorSave',
								bindKey: {
									win: 'Ctrl-S',
									mac: 'Command-S',
									sender: 'editor'
								},
								exec: function(env, args, request) {
									var comiEditorSession = editor.getSession();
                                    
                                    var now = new Date(); 
                                    var then = "<time>" + now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDay()) + 
                                        ' '+pad(now.getHours())+':'+pad(now.getMinutes())+":"+pad(now.getSeconds()) + "</time>"; 
                                    
                                    $("[id$=-console]").append($("<li/>").html(then + ' saving file <a href="#' + saveParams + '">' + saveParams.replace("file=", "") + "</a>"));
                                    $("[id$=-console] li:last").attr("tabindex", "-1").focus();
                                    

									$.ajax({
										type: "post",
										data: {
											fileContents: comiEditorSession.getValue()
										},
										url: "/ce/inc/comiEditor.cfc?method=save&returnformat=plain&"+saveParams,
										success: function(jqXHR, textStatus){
											//$(".message").removeClass("pending").addClass("success").html($("input[name=fileName]").val() + " saved.").animate({opacity:0}, 5000);
                                           var timeDiff = new Date().getTime() - now.getTime();
                                           
                                            if(timeDiff < 1000) {
                                                timeDiff += "ms";
                                            } else {
                                                timeDiff = timeDiff / 1000 + "s";
                                            }
                                           
											$("[id$=-console] li:last").append(" save complete <time>" + timeDiff + "</time>").focus();
                                            editor.focus();
										},
										error: function(jqXHR, textStatus, errorThrown){
											//$(".message").removeClass("pending").addClass("error").html("Save failed!").animate({opacity:0}, 10000);
											$("[id$=-console] li:last").append(" save failed - [" + errorThrown + "]").focus();
                                            editor.focus();
										}
									});
								}
							});
						}
						else {
							t.attr("unselectable", "on").css({MozUserSelect:"none",webkitUserSelect:"none"});
                            
                            // if there is anything in the filePathArray still, and the parent element is the navigator panel, then open the current node in the filePathArray
                            if(filePathArray.length && t.closest("[id$=-navigator]").length) {
                                var firstNode = filePathArray.shift();
                                $("li span:contains("+ firstNode +")", this).each(function(){
                                    if($(this).text() == firstNode) {
                                        $(this).trigger("click");
                                    }
                                });
                            }
						}

						if(!$(this).parents().hasClass("panel")) {
							$(this).wrap($("<div></div>").addClass("panel"));
							$(this).parent(".panel").resizable({ handles: 'e' });
						}
						
						$(this).children(".status.loading").removeClass("loading");
					}
				});
			}
		});
	}