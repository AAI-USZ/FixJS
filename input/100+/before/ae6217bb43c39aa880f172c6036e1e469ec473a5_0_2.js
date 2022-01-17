function(id, foreignTreeId) {
  $(id).bind("loaded.jstree", function (event, data) {
	  data.inst.open_all(-1);
  }).jstree({ 
    "core" : { 
    "animation" : 0,
    "html_titles" : true
    },
    "ui" : { 
      "select_limit" : 1
    },
    "types" : {
      // I set both options to -2, as I do not need depth and children count checking
      // Those two checks may slow jstree a lot, so use only when needed
      "max_depth" : -2,
      "max_children" : -2,
      "valid_children" : [ "root-category" ],
      "types" : {
        "root-category" : {
          "icon" : { 
            "image" : "images/tree/folder_16x16.png" 
          },
          "valid_children" : [ "category", "template" ],
          "start_drag" : false
        },
        "category" : {
          "icon" : { 
            "image" : "images/tree/folder_16x16.png" 
          },
          "valid_children" : [ "category", "template" ]
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
    "crrm" : {
      "move" : {
        "always_copy" : "multitree",
        "check_move" : function (m) { 
          //only accept to move a node from the reference tree if it does not exists in that tree
          var checkNotAlreadyBound = true;
          if(foreignTreeId == m.ot.get_container().prop("id")) {
            //look if there is an li with attr activeTechniqueId == moved object activeTechniqueId
            checkNotAlreadyBound =  $(id + " [activeTechniqueId=" + m.o.prop("activeTechniqueId") + "]").size() < 1 ;
          }
          //only accept "inside" node move (yes, comparing m.p == "inside" does not work)
          //and into a new parent node. 
          var checkInside = (m.p != "before" && m.p != "after" && this._get_parent(m.o)[0] !== m.np[0]);
          
          return checkNotAlreadyBound && checkInside;
        }
      }
    },
    "search" : {
        "case_insensitive" : true,
        "show_only_matches": true
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