function refresh() {
        s.errorsElm.style.display = 'none';
        s.player.stop();
        try {
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