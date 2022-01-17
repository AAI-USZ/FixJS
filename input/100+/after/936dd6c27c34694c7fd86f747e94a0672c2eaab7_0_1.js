function(id,  initially_select) {
  $(id).bind("loaded.jstree", function (event, data) {
    data.inst.open_all(-1);
  }).jstree({ 
    "core" : { 
    "animation" : 0,
    "html_titles" : true
    },
    "ui" : { 
      "initially_select" : [initially_select],
      "select_limit" : 1
    },
    "types" : {
      // I set both options to -2, as I do not need depth and children count checking
      // Those two checks may slow jstree a lot, so use only when needed
      "max_depth" : -2,
      "max_children" : -2,
      "valid_children" : [ "category" ],
        "types" : {
          "category" : {
            "icon" : {
              "image" : "images/tree/folder_16x16.png" 
            },
            "valid_children" : [ "category", "template" ],
            "hover_node" : false,
            "select_node" : false,
            "start_drag" : false
          },
          "template" : {
            "icon" : { 
              "image" : "images/tree/technique_16x16.png" 
            },
            "valid_children" : "none"
          },
          "default" : {
            "valid_children" : "none"
          }
        }
      },
      "search" : {
          "case_insensitive" : true,
          "show_only_matches": true
        },
      "crrm" : {
        "move" : {
          "check_move" : function () { return false; }
        }
      },
      "dnd" : {
        "drop_target" : false,
        "drag_target" : false
      },
      "themes" : { 
    	  "theme" : "rudder",
    	  "url" : "javascript/jstree/themes/rudder/style.css"
      },
      "plugins" : [ "themes", "html_data", "ui", "types", "dnd", "crrm", "search" ]
    })   
}