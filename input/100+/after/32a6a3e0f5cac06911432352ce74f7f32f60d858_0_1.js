function init_tree(movepagesnodeurl, movemedianodeurl) {
	$('.tree').jstree({
		"plugins" : [ "themes", "html_data", "types", "search" ] ,
		"themes" : { 
			"theme" : "OMNext",
			"dots" : true,
			"icons" : true		
		},
		"types" : {
			"types" : {
				//Page
				"page" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-57px -57px" 
					}
				},
				"page_offline" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-57px -74px" 
					}
				},				
				//Site
				"site" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-75px -38px" 
					}
				},
				//Settings
				"settings" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-57px -37px" 
					}
				},
				//Image
				"image" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-20px -74px" 
					}
				},
				//Video
				"video" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-75px -55px" 
					}
				},
				//Slideshow
				"slideshow" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-2px -72px" 
					}
				},
				//Files
				"files" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-38px -72px" 
					}
				}
			}
		},
        // Configuring the search plugin
        "search" : {
            "show_only_matches" : true
        }
	});
    $("#treeform").submit(function() {
        $('.tree').jstree('search', $('#treeform #searchVal').val());
        return false;
    });
    $('#treeform #searchVal').keyup(function() {
        $('.tree').jstree('search', $('#treeform #searchVal').val());
    })

	$('.pagestree').jstree({
		"plugins" : [ "themes", "html_data", "dnd", "crrm", "types", "search" ] ,
		"themes" : { 
			"theme" : "OMNext",
			"dots" : true,
			"icons" : true		
		},
		"types" : {
			"types" : {
				//Page
				"page" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-57px -57px" 
					}
				},
				"page_offline" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-57px -74px" 
					}
				},		
				//Site
				"site" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-75px -38px" 
					}
				},
				//Settings
				"settings" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-57px -37px" 
					}
				},
				//Image
				"image" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-20px -74px" 
					}
				},
				//Video
				"video" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-75px -55px" 
					}
				},
				//Slideshow
				"slideshow" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-2px -72px" 
					}
				},
				//Files
				"files" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-38px -72px" 
					}
				}
			}
		},
		"crrm" : { 
			"move" : {
				"check_move" : function (m) { 
					var p = this._get_parent(m.o);
					if(!p) return false;
					p = p == -1 ? this.get_container() : p;
					if(p === m.np) return true;
					if(p[0] && m.np[0] && p[0] === m.np[0]) return true;
					return false;
				}
			}
		},
		"dnd" : {
			"drop_target" : false,
			"drag_target" : false
		},
		// Configuring the search plugin
		"search" : {
            "show_only_matches" : true
		}
	})
	.bind("move_node.jstree", function (e, data) {
		console.log("parentid" + data.rslt.np.attr("id"));
		console.log("fromposition" + data.rslt.o.attr("sequence"));
		console.log("afterposition" + data.rslt.cp);
		$.ajax({
				async : false,
				type: 'POST',
				url: movepagesnodeurl,
				data : { 
					"parentid": data.rslt.np.attr("id"),
					"fromposition": data.rslt.o.attr("sequence"),
					"afterposition" : data.rslt.cp
				},
				success : function (r) {
					if(!r.status) {
						$.jstree.rollback(data.rlbk);
					}
					else {
						$(data.rslt.oc).attr("id", "node_" + r.id);
						if(data.rslt.cy && $(data.rslt.oc).children("ul").length) {
							data.inst.refresh(data.inst._get_parent(data.rslt.oc));
						}
					}
					$("#analyze").click();
				}
		});
	});
    $("#pagestreeform").submit(function() {
        $('.pagestree').jstree('search', $('#pagestreeform #searchVal').val());
        return false;
    });
    $('#pagestreeform #searchVal').keyup(function() {
        $('.pagestree').jstree('search', $('#pagestreeform #searchVal').val());
    })

	$('.mediatree').jstree({
		"plugins" : [ "themes", "html_data", "dnd", "crrm", "types", "search" ] ,
		"themes" : { 
			"theme" : "OMNext",
			"dots" : true,
			"icons" : true		
		},
		"types" : {
			"types" : {
				//Page
				"page" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-57px -57px" 
					}
				},
				"page_offline" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-57px -74px" 
					}
				},				
				//Site
				"site" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-75px -38px" 
					}
				},
				//Settings
				"settings" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-57px -37px" 
					}
				},
				//Image
				"image" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-20px -74px" 
					}
				},
				//Video
				"video" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-75px -55px" 
					}
				},
				//Slideshow
				"slideshow" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-2px -72px" 
					}
				},
				//Files
				"files" : {
					"icon" : {
						"image" : $.jstree._themes + "OMNext/d.png",
						"position" : "-38px -72px" 
					}
				}
			}
		
		
		},
		"crrm" : { 
			"move" : {
				"check_move" : function (m) { 
					var p = this._get_parent(m.o);
					if(!p) return false;
					p = p == -1 ? this.get_container() : p;
					if(p === m.np) return true;
					if(p[0] && m.np[0] && p[0] === m.np[0]) return true;
					return false;
				}
			}
		},
		"dnd" : {
			"drop_target" : false,
			"drag_target" : false
		},
        // Configuring the search plugin
        "search" : {
            "show_only_matches" : true
        }
	})
	.bind("move_node.jstree", function (e, data) {
		$.ajax({
				async : false,
				type: 'POST',
				url: movemedianodeurl,
				data : { 
					"parentid": data.rslt.np.attr("id"),
					"fromposition": data.rslt.o.attr("sequence"),
					"afterposition" : data.rslt.cp
				},
				success : function (r) {
					if(!r.status) {
						$.jstree.rollback(data.rlbk);
					}
					else {
						$(data.rslt.oc).attr("id", "node_" + r.id);
						if(data.rslt.cy && $(data.rslt.oc).children("ul").length) {
							data.inst.refresh(data.inst._get_parent(data.rslt.oc));
						}
					}
					$("#analyze").click();
				}
		});
	});
    $("#mediatreeform").submit(function() {
        $('.mediatree').jstree('search', $('#mediatreeform #searchVal').val());
        return false;
    });
    $('#mediatreeform #searchVal').keyup(function() {
        $('.mediatree').jstree('search', $('#mediatreeform #searchVal').val());
    })
}