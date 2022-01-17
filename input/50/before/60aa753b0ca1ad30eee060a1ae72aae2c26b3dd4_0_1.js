function(){
      if(this.value.match(/^#([0-9A-F]){3}$|^#([0-9A-F]){6}$/img)){
        set_color(this.value);
        update_color(true);
      }
    }