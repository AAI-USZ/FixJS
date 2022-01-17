function(){
      var $this = $(this);
      var data  = $this.data('spritespin');
      
      if (!data){
        // spritespin is not initialized
        
        var images = $this.find("img");
        var i = 0;
        if (images.length > 0){
          settings.source = [];
          for(i = 0; i < images.length; i += 1){
            settings.source.push($(images[i]).attr("src"));
          }
        }
        
        if (typeof(settings.source) === "string"){
          settings.source = [settings.source];
        }
        
        // disable selection & hide overflow
        $this.attr("unselectable", "on").css({ 
          overflow : "hidden", 
          position : "relative"
        });
        
        // build inner html
        $this.empty();
        $this.append($("<div class='spritespin-stage'/>"));
        $this.append($("<div class='spritespin-preload'/>"));
        $this.addClass("spritespin-instance");
        
        if (settings.enableCanvas){
          var canvas = $("<canvas class='spritespin-canvas'/>")[0];
          var supported = !!(canvas.getContext && canvas.getContext('2d'));
          if (supported){
            settings.canvas = $(canvas);
            settings.context = canvas.getContext("2d");
            $this.append(settings.canvas);
          }
        }

        // resolve module
        if (typeof(settings.module) === "string"){
          settings.module = SpriteSpin.modules[settings.module];
        }
        if (!settings.module){
          settings.module = SpriteSpin360;
        }
        
        // build data
        settings.target = $this;
        settings.stage = $this.find(".spritespin-stage");
        settings.preload = $this.find(".spritespin-preload");
        settings.animation = null;
        settings.touchable =(settings.touchable || (/iphone|ipod|ipad|android/i).test(window.navigator.userAgent));
        
        $this.data('spritespin', settings);
        SpriteSpin.reload(settings, true);
      } else {
        // spritespin is initialized.
        $.extend(data, options);

        if (options.source){
          // when images are passed, need to reload the plugin
          SpriteSpin.reload(data);
        } else {
          // otherwise just reanimate spritespin
          $this.spritespin("animate", data.animate, data.loop);
        }
      }
    }