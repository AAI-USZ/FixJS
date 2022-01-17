function(model, response) {
          console.log('Datalist save success');
          try{
            window.app.get("authentication").get("userPrivate").get("mostRecentIds").datalistid = model.get("id");
          }catch(e){
            Utils.debug("Couldnt save the datatlist id to the user's mostrecentids"+e);
          }
        }