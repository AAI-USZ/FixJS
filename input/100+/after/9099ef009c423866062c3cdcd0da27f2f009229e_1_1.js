function refresh() {
        s.errorsElm.style.display = 'none';
        try {
          s.player.stop();
            reportErr = true;
            var code = ['(function(){',
                        '  '+s.cm.getValue(),
                        '})();'].join('\n');
            var scene = eval(code);
            player.load(scene);
            player.play();
        } catch(e) {
            onerror(e);
        }
    }