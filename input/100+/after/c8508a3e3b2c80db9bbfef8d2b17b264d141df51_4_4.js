function(){
      _ev("channel", function(name) {
        $("#channel-title").html(name);
      });

      _ev("panel:channel", function(which){
        if(which == "show") {
          send("get-channels", {query: false});
        }
      });

      onEnter("#input-channel-search", Channel.search);
      _socket.on("playlist", function(last) {
        console.log(last);
      });

      $("#channel-query").keyup(function(){
        Channel.search(this.value);
      });
    }