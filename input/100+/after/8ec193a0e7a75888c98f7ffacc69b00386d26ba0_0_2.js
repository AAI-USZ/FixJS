function sandbox() {

    this.codeElm = document.getElementById('scene-source');
    this.errorsElm = document.getElementById('errors');
    this.selectElm = document.getElementById('examples-list');
    this.tangleElm = document.getElementById('refresh-calc');
    this.debugElm = document.getElementById('enable-debug');

    window.b = Builder._$;
    window.B = Builder;
    window.C = anm.C;

    this.player = createPlayer('my-canvas', {
        width: 400,
        height: 250,
        bgcolor: '#fff'
    });
    this.player.mode = anm.C.M_PREVIEW;
    this.player._checkMode();
    _player = this.player;

    this.cm = CodeMirror.fromTextArea(this.codeElm,
              { mode: 'javascript',
                indentUnit: 4,
                lineNumbers: false,
                gutter: true,
                matchBrackets: true,
                wrapLines: true });
    this.cm.setValue(defaultCode);
    //this.cm.setValue('return <your code here>;');

    var s = this;
    var curInterval = null;
    var refreshRate = DEFAULT_REFRESH_RATE;
    var reportErr = true; // log only one error for one refresh

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

    function onerror(e) {
        var e2;
        try {
          s.player.stop();
          s.player.drawSplash();
        } catch(e) { e2 = e; };
        s.errorsElm.style.display = 'block';
        s.errorsElm.innerHTML = '<strong>Error:&nbsp;</strong>'+e.message;
        if (reportErr) {
          if (console && console.error) {
            console.error(e.stack);
            if (e2) console.error(e2.stack);
          }
          reportErr = false;
        }
        //throw e;
    }

    this.player.onerror(onerror);

    function updateInterval(to) {
        if (curInterval) clearTimeout(curInterval);
        //setTimeout(function() {
            refreshRate = to;
            var refresher = function() {
              refresh();
              curInterval = setTimeout(refresher, to);
            }
            refresher();
        //}, 1);
    }

    setTimeout(function() {
        store_examples(); // store current examples, it will skip if their versions match
        load_examples(); // load new examples, it will skip the ones with matching versions
        list_examples(s.selectElm); // list the examples in select element
    }, 1);

    this.selectElm.onchange = function() {
        s.cm.setValue(examples[this.selectedIndex][1]);
    }

    this.debugElm.onchange = function() {
        s.player.debug = !s.player.debug;
    }

    var tangleModel = {
        initialize: function () {
            this.secPeriod = refreshRate / 1000;
        },
        update: function () {
            this.perMinute = Math.floor((60 / this.secPeriod) * 100) / 100;
            updateInterval(this.secPeriod * 1000);
        }
    };

    updateInterval(refreshRate);

    new Tangle(this.tangleElm, tangleModel);

}