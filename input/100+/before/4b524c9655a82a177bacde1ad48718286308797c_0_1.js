function OnMessage (evt) {
     if (evt.data.indexOf("ERROR") === 0) {
        console.log(evt.data);
     } else {
          var response = JSON.parse(evt.data);
          if (response.request == "get_sources") {
               var load = $("div#available").remove();
               var tab = $("table#available > tbody");
               for (i=0; i<response.response.length; i++) {
                    tab.append($(response.response[i].row));
                    tab.append($(response.response[i].req_row));
               }
          } else if (response.request == "get_source_single") {
            refresh_drop_down_respond(response.response);
          } else if (response.request == "add_filter") {
            refresh_drop_down(response.response);
          } else if (response.request == "start_bot") {
            setTimeout(function () { refresh_drop_down(response.response); }, 2000);
          } else if (response.request == "stop_bot") {
            refresh_drop_down(response.response);
          } else if (response.request == "remove_filter") {
            refresh_drop_down(response.response);
          } else if (response.request == "set_source") {
            refresh_drop_down(response.response);
          } else {
            console.log("socket message:", evt.data)
          }
     }
}