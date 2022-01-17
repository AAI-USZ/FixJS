function(){
      if(this.model.get("audioVideo")){
        if(this.model.get("audioVideo").get("filename") != undefined){
          this.$el.find(".audio-file").attr("src", "filesystem:" + window.location.origin +"/temporary/"+this.model.get("audioVideo").get("filename"));
          this.$el.find(".audio-file").play();
        }
      }
    }