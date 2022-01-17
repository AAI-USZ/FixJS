function(e, data){
      if (data.ddX !== 0){
        data.frameTime = data.frameTime + 1;
      
        $(this).spritespin("animate", false);
        if (data.frameTime < 62){
          $(this).spritespin("animate", true);
        }  
      } else {
        $(this).spritespin("animate", false);
      }
    }