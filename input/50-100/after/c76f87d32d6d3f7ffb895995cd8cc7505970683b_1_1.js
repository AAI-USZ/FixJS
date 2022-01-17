function(){
      if(this.model.get("audioVideo")){
        this.model.get("audioVideo").set("filename", this.$el.find(".audio-filename"));
          this.$el.find(".audio-file").attr("src", "filesystem:" + window.location.origin +"/temporary/"+this.$el.find(".audio-filename"));
          this.$el.find(".audio-file").play();
        
      }
    }