function( editor )
                {
									
									var doIt = confirm("Leave clip ?");
									
									if (doIt) {
										noUpdate = true;
										console.log("plugin " + edited);
										clipid = edited.slice(1,-2);
										stop = $(jq("stopevent-" + clipid)).text();
										cat = $(jq(edited)).hasClass("orig") ? "orig" : "trans";
									//console.log("doc " + asString + "\ncat: " + cat + "\nstart: " + clipid + "\nstop: " + stop  + "\nmeeting: " + mmm  + "\nid: " + author);
									
									
									
									
									
										$.ajax({
											url: "/exist/tullio/xq/unlock.xql",
											type: "POST",
											data: {
												"v": cat,
												"n": clipid,
												"id": author,
												"m": mmm
											},
											async: false,
											success : function () {
												setTimeout("editor.destroy(false); editor = ''; $('#cke').attr('id', ''); $(jq(edited)).addClass('content'); edited=''; ", 250);
											}
										});



													
									
									}
									
									
									noUpdate = false;
									console.log('exit finish');
									
									
									
									
						
                }