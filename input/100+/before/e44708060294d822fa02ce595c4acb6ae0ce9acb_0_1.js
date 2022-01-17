function(key, val) {
      var tempStatus = val.status;
      if (tempStatus == 1) {
        tempStatus = "new born collection";
      }
      else if (tempStatus == 2) {
        tempStatus = "<font color=orange>unloaded</font>";
        items.push(['<button class="enabled" id="delete"><img src="/_admin/html/media/icons/round_minus_icon16.png" width="16" height="16"></button><button class="enabled" id="load"><img src="/_admin/html/media/icons/connect_icon16.png" width="16" height="16"></button><button><img src="/_admin/html/media/icons/zoom_icon16_nofunction.png" width="16" height="16" class="nofunction"></img></button><button><img src="/_admin/html/media/icons/doc_edit_icon16_nofunction.png" width="16" height="16" class="nofunction"></img></button>', 
        val.id, val.name, tempStatus, "", ""]);
       }
      else if (tempStatus == 3) {
        tempStatus = "<font color=green>loaded</font>";
        var alive; 
        var size; 
      
        $.ajax({
          type: "GET",
          url: "/_api/collection/" + val.id + "/figures",
          contentType: "application/json",
          processData: false,
          async: false,   
          success: function(data) {
            size = data.figures.alive.size / 1024; 
            alive = data.figures.alive.count; 
          },
          error: function(data) {
          }
        });
        
        items.push(['<button class="enabled" id="delete"><img src="/_admin/html/media/icons/round_minus_icon16.png" width="16" height="16" title="Delete"></button><button class="enabled" id="unload"><img src="/_admin/html/media/icons/not_connected_icon16.png" width="16" height="16" title="Unload"></button><button class="enabled" id="showdocs"><img src="/_admin/html/media/icons/zoom_icon16.png" width="16" height="16" title="Show Documents"></button><button class="enabled" id="edit" title="Edit"><img src="/_admin/html/media/icons/doc_edit_icon16.png" width="16" height="16"></button>', 
        val.id, val.name, tempStatus,  bytesToSize(size*1024), alive]);
      }
      else if (tempStatus == 4) {
        tempStatus = "in the process of being unloaded"; 
        items.push(['<button id="delete"><img src="/_admin/html/media/icons/round_minus_icon16_nofunction.png" class="nofunction" width="16" height="16"></button><button class="enabled" id="load"><img src="/_admin/html/media/icons/connect_icon16.png" width="16" height="16"></button><button><img src="/_admin/html/media/icons/zoom_icon16_nofunction.png" width="16" height="16" class="nofunction"></img></button><button><img src="/_admin/html/media/icons/doc_edit_icon16_nofunction.png" width="16" height="16" class="nofunction"></img></button>', 
        val.id, val.name, tempStatus, "", ""]);
      }
      else if (tempStatus == 5) {
        tempStatus = "deleted"; 
        items.push(["", val.id, val.name, tempStatus, "", ""]);
      }
/*      else {
        tempStatus = "corrupted"; 
        items.push(["", "<font color=red>"+ val.id + "</font>", "<font color=red>"+ val.name + "</font>", "<font color=red>" + tempStatus + "</font>", "", ""]);
      }*/
    }