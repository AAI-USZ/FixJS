function(){
      // wrap the top-level script to prevent leaking into globals
      var script = this.pretty_script();
      var retval = 'var global = new Global();console.log(global);(function($){var local = new Local();try{local.canvas = $("<canvas width=\\"" + global.stage_width + "\\" height=\\"" + global.stage_height + "\\"></canvas>").appendTo(".stage");local.ctx = local.canvas[0].getContext("2d");local.ctx.fillStyle="white";local.ctx.fillRect(0,0,global.stage_width,global.stage_height);' + script + '}catch(e){alert(e);}})(jQuery);';
      //var retval = 'var global = new Global();(function($){var local = new Local();local.canvas = $("<canvas width=\\"" + global.stage_width + "\\" height=\\"" + global.stage_height + "\\"></canvas>").appendTo(".stage");local.ctx = local.canvas[0].getContext("2d");' + script + '})(jQuery);';
      return retval;
  }