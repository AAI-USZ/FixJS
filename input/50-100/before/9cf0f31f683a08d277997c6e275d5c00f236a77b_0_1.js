function loadScript(src) {
      
      var script = document.createElement("script");
      script.onload = function () {
        if (scripts.length) {
          loadScript(scripts.shift());
        }
      };
      script.src = GLOBAL.relative_path + "javascript/" + src + ".js";
      console.log(script.src)
      document.body.appendChild(script);
    }