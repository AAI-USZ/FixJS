function onMessage (evt) {
     if (evt.data.indexOf("ERROR") === 0) {
        console.log(evt.data);
        socket.close();
     } else {
          var response = JSON.parse(evt.data);
          if (response.request == "get_sources") {
               if (response.error) {
                    console.log("ERROR in request " + response.request + ": " + response.error);
                    return false;
               }
               var load = $("div#available").remove();
               var tab = $("table#available > tbody");
               for (i=0; i<response.response.length; i++) {
                    tab.append($(response.response[i].row));
                    tab.append($(response.response[i].req_row));
               }
               runSocketPostInit();
          } else if (response.request == "get_source_single") {
               if (response.error) {
                    console.log("ERROR in request " + response.request + ": " + response.error);
                    return false;
               }
               refresh_drop_down_respond(response.response);
          } else if (response.request == "add_filter") {
               if (response.error) {
                    console.log("ERROR in request " + response.request + ": " + response.error);
                    return false;
               }
               refresh_drop_down(response.name);
          } else if (response.request == "start_bot") {
               if (response.error) {
                    console.log("ERROR in request " + response.request + ": " + response.error);
                    refresh_drop_down(response.name);
                    return false;
               }
               setTimeout(function () { refresh_drop_down(response.name); }, 2000);
          } else if (response.request == "stop_bot") {
               if (response.error) {
                    console.log("ERROR in request " + response.request + ": " + response.error);
               }
               refresh_drop_down(response.name);
          } else if (response.request == "remove_filter") {
               if (response.error) {
                    console.log("ERROR in request " + response.request + ": " + response.error);
                    return false;
               }
               refresh_drop_down(response.name);
          } else if (response.request == "set_source") {
               if (response.error) {
                    console.log("ERROR in request " + response.request + ": " + response.error);
                    return false;
               }
               refresh_drop_down(response.name);
          } else {
            console.log("socket message:", evt.data)
          }
     }
}