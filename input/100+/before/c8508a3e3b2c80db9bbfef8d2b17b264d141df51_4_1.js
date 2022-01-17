function(){
      if(_letterBoxed) {
        _letterBoxed = false;
        $("#video-overlay").css({
          height: 0,
          width: 0
        });
        $("#players").css({
          height: "100%",
          width: "auto",
          paddingTop: 0
        });
        $("#mute-control").css({
          top: "5px"
        });
        $("#top").css({
          paddingTop: "0"
        });
      }
    }