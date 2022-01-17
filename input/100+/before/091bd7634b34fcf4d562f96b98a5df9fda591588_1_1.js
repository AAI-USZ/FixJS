function refresh() {
        s.errorsElm.style.display = 'none';
        s.player.stop();
        try {
            var code = ['(function(){', 
                        '  '+s.cm.getValue(),
                        '})();'].join('\n');
            var scene = eval(code);
            player.load(scene);
            player.play();
            reportErr = true;
        } catch(e) {
            s.player.stop();
            s.player.drawSplash();
            s.errorsElm.style.display = 'block';
            s.errorsElm.innerHTML = '<strong>Error:&nbsp;</strong>'+e.message;
            if (reportErr) {
              if (console && console.error) {
                console.error(e.stack);
              }
              reportErr = false;
            }
            //throw e;
        }
    }