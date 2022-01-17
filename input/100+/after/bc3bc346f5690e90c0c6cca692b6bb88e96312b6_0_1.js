function(atto, ProgressBar, AssetCache) {
        var opts   = atto.byId("assetUrls").options,
            cache  = new AssetCache(),
            prg    = new ProgressBar(atto.byId('prg'), {min:0, max: opts.length}),
            tgtSel = atto.byId('cachedAssets'),
            pvw    = atto.byId('preview'),
            ndNull = document.createTextNode(' '),
            btnPP  = atto.byId('btnPlayPause'),
            btnStartPreloader = atto.byId('btnStartPreloader'),
            i      = 0,
            _currAudio;
        window.cache = cache;
        /*
        window.atto = atto;
        window.prg = prg;
        */

        atto.addEvent(btnPP, 'click', function() {
            if (this.textContent == 'Play') {
                // paused; play now
                _playAudio();
            } else {
                // playing; pause now
                _pauseAudio();
            }
        }, true);

        function _pauseAudio() {
            if (_currAudio) _currAudio.pause();
            btnPP.textContent = "Play";
        }
        function _playAudio() {
            if (_currAudio) _currAudio.play();
            btnPP.textContent = "Pause";
        }

        atto.addEvent(btnStartPreloader, 'click', function() {
            var count = 0;
            for (var i=0; i<opts.length; i++) {
                if (opts[i].selected) {
                    cache.addAsset( opts[i].value, "assets/" + opts[i].value );
                    prg.setMax(++count);
                }
            }
            if (count > 0) {
                _log('Preloading ' + count + ' assets...');
            } else {
                alert('Please select at least one image file from the list before clicking Preload.');
            }
        }, true);

        atto.addEvent(tgtSel, 'change', function() {
            var sel = tgtSel.item(tgtSel.selectedIndex),
                img = null;
            if (sel && sel.value) {
                if (cache.hasAsset(sel.value)) {
                    _pauseAudio();
                    switch (cache.getAssetType(sel.value)) {
                        case cache.TYPES.IMAGE:
                            img = cache.getAsset(sel.value);
                            pvw.replaceChild(img, pvw.firstChild);
                            if (_currAudio) {
                                _currAudio = null;
                                btnPP.disabled = 'disabled';
                            }
                            break;

                        case cache.TYPES.AUDIO:
                            pvw.replaceChild(ndNull, pvw.firstChild);
                            _currAudio = cache.getAsset(sel.value);
                            if (_currAudio) {
                                btnPP.disabled = '';
                                _playAudio();
                            }
                            break;

                        default:
                            // no change
                            break;
                    }

                } else {
                    alert("D'oh! I can't load that asset from the cache!");
                }
            }
        }, true);

        function _log(msg) {
            atto.byId('status').innerHTML += msg + '<br/>';
        }

        cache.events.error.watch(function(data) {
            _log(data.details);
        });

        cache.events.loaded.watch(function(data) {
            _log('Loaded ' + data.name + '.');
            prg.setValue(prg.getValue()+1);

            var opt = document.createElement('option');
            opt.setAttribute('value', data.name);
            opt.appendChild(document.createTextNode(data.name));
            tgtSel.appendChild(opt);
        });

        cache.events.ready.watch(function(data) {
            _log('All assets loaded.');
            prg.setValue(prg.getMax());
        });
    }