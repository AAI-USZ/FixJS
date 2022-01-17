function(callback){
      this.model.set("session", new Session({
        sessionFields : window.app.get("corpus").get("sessionFields").clone()
      }));
      
      this.model.get("session").get("sessionFields").where({
        label : "goal"
      })[0].set("value", "Goal from file import " + this.model.get("status"));
     
      this.model.get("session").get("sessionFields").where({
        label : "dateElicited"
      })[0].set("value", "Probably Prior to " + this.model.get("files")[0].lastModifiedDate ? this.model.get("files")[0].lastModifiedDate.toLocaleDateString()
          : 'n/a');
      
      //DONT save now, save only when import is approved.
      if(typeof callback == "function"){
        callback();
      }
    }