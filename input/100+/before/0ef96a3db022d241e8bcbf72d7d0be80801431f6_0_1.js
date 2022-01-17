function loadRClickMenus() {
     $(".torrent-div.rcstart").contextMenu("right_click_start", {
          bindings : {
              "start" : function (t) {
                  var torrent_id = t.id.split("torrent_id_")[1];
                  command("start_torrent", torrent_id);
               },
               "stop" : function (t) {
                   var torrent_id = t.id.split("torrent_id_")[1];
                   command("stop_torrent", torrent_id);            
               },
               "remove" : function (t) {
                   var torrent_id = t.id.split("torrent_id_")[1];
                   command("remove_torrent", torrent_id);
               },
               "delete" : function (t) {
                   var torrent_id = t.id.split("torrent_id_")[1];
                   command("delete_torrent", torrent_id);
               },
               "rehash" : function (t) {
                   var torrent_id = t.id.split("torrent_id_")[1];
                   command("hash_torrent", torrent_id);
               },
          },
          menuStyle : {
              minWidth : "10em"
          }
     });
     $(".torrent-div.rcpause").contextMenu("right_click_pause", {
         bindings : {
             "pause" : function (t) {
                 var torrent_id = t.id.split("torrent_id_")[1];
                 command("pause_torrent", torrent_id);
             },
             "stop" : function (t) {
                 var torrent_id = t.id.split("torrent_id_")[1];
                 command("stop_torrent", torrent_id);            
             },
             "remove" : function (t) {
                 var torrent_id = t.id.split("torrent_id_")[1];
                 command("remove_torrent", torrent_id);
             },
             "delete" : function (t) {
                 var torrent_id = t.id.split("torrent_id_")[1];
                 command("delete_torrent", torrent_id);
             },
             "rehash" : function (t) {
                 var torrent_id = t.id.split("torrent_id_")[1];
                 command("hash_torrent", torrent_id);
             },
         },
         menuStyle : {
             minWidth : "10em"
         }
     });
     $("#tab_options").bind(
         "click",
         function () {
         window.location = "/options";
         }
     );
     $("#tab_stats").bind(
         "click",
         function () {
           window.location = "/stats";
         }
     );
     $("#tab_log").bind(
        "click",
        function () {
            window.location = "/log";
        }
     );
     $("#tab_auto").bind(
        "click",
        function () {
            window.location = "/auto";
        }
    );
}