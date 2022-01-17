function(){
        data.preload.fadeOut(250);
        data.stage.show();
        callback.apply(data.target, [data]);
      }