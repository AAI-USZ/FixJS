function(loader){
        data.preload.fadeOut(250);
        data.stage.show();
        if (data.canvas){
          data.canvas.show();
        }
        data.images = loader.images;
        callback.apply(data.target, [data]);
      }