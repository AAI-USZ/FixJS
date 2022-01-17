function onMessage(e) {
     if (e.data.indexOf("ERROR") !== -1) {
          $("#status-div").removeClass("status-ok status-bad").addClass("status-bad").html(
               "StatSocket ERROR: " + e.data.split("ERROR/")[1]
          );
          return false;
     } else {
          data = JSON.parse(e.data);
          if (data.type == "trackers") {
              trackerData = data.data;
              initTGraph();
          } else if (data.type == "global") {
               $("#status-uprate").html("<div class='status-label status-system'>Upload rate:</div><div class='status-uprate-value status-value'>" + data.uprate_str + "/s</div>");
               $("#status-downrate").html("<div class='status-label status-system'>Download rate:</div><div class='status-downrate-value status-value'>" + data.downrate_str + "/s</div>");
               $("#status-loadavg").html("<div class='status-label status-system'>Load average:</div><div class='status-loadavg-value status-value'>" + data.loadavg + "</div>");
               $("#status-mem").html("<div class='status-label status-system'>Memory usage:</div><div class='status-mem-value status-value'>" + data.memusage + "%</div>");
               $("#status-hdd").html("<div class='status-label status-system'>HDD usage:</div><div class='status-hdd-value status-value'>" + data.hdusage_human + " / " + data.hdmax_human + "</div>");
               HddTotal = data.hdmax;
               if (UpData.push(data.uprate) > maxValues) {
                    UpData.shift();
               }
               if (DownData.push(data.downrate) > maxValues) {
                    DownData.shift();
               }
               if (LoadData.push(data.loadavg) > maxValues) {
                    LoadData.shift();
               }
               if (MemData.push(data.memusage) > maxValues) {
                    MemData.shift();
               }
               if (HddData.push(data.hddusage) > maxValues) {
                    HddData.shift();
               }

              if (UpData.length < 60) {
                  $("#canvas-title-dynamic").html("(Last " + UpData.length + " seconds)");
              } else {
                  mins = Math.floor(UpData.length/60);
                  secs = UpData.length%60;
                  if (mins == 1) {  
                      mins = "Last minute";
                  } else {
                      mins = "Last " + mins + " minutes";
                  }
                  if (secs == 0) {
                      secs = "";
                  } else {
                      secs = " and " + secs + " seconds";
                  }
                  $("#canvas-title-dynamic").html("(" + mins + secs + ")");
              }
              update_canvas();
         }
     return false;
     }
}