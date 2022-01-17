function() {
        this.current.loaded = 0;
        this.current.videoLoaded = false;
        this.current.videoStarted = false;
        this.current.videoFinished = false;
        var self = this;
        this._.containerSize = { width: this._.container.offsetWidth, height: this._.container.offsetHeight };
        var retry = 50;
        var last_fit = -1;
        this.timer.setInterval('observe', function() {
            try {
                var nico = self.nico();
                if (!nico.window)   return;
                if (!nico.document) return;
                var location;
                try { location = nico.window.location.href; } catch (e) { /* redirected to other domain. */ }
                if (location == 'about:blank') return;
                // unexpected redirect.
                if (!/^http:\/\/www\.nicovideo\.jp\/watch\/.*/.test(location)) {
                    self.stop();
                    var event = { type: 'error', message : 'unexpected redirect.' };
                    self.dispatchEvent(event);
                    if (typeof self.onerror == 'function') try { self.onerror(event); } catch(e) { postError(e) }
                    return;
                }
                // logout check.
                if (nico.window.User && !nico.window.User.id) {
                    var event = { type: 'fatal', message : Lang.PLEASE_LOGIN, logout : true };
                    self.dispatchEvent(event);
                    if (typeof self.onfatal == 'function') try { self.onfatal(event); } catch(e) { postError(e) }
                    return;
                }
                var h1 = nico.document.getElementsByTagName('h1')[0];
                if (h1) {
                    // over access.
                    var h1Text = h1.textContent || h1.innerText;
                    if (h1Text.indexOf(Lang.OVER_ACCESS) >= 0 && nico.document.title.indexOf(h1Text) < 0) {
                        self.stop();
                        var event = { type: 'fatal', message : h1Text };
                        self.dispatchEvent(event);
                        if (typeof self.onfatal == 'function') try { self.onfatal(event); } catch(e) { postError(e) }
                        return;
                    }
                    // missing. 
                    if (h1Text.indexOf(Lang.MISSING) >= 0 && nico.document.title.indexOf(h1Text) < 0) {
                        self.stop();
                        var event = { type: 'error', message : h1Text };
                        self.dispatchEvent(event);
                        if (typeof self.onerror == 'function') try { self.onerror(event); } catch(e) { postError(e) }
                        return;
                    }
                    //other
                    if (nico.document.readyState == 'complete' && !self.getWatchInfo()) {
                        self.stop();
                        var event = { type: 'fatal', message : h1Text };
                        self.dispatchEvent(event);
                        if (typeof self.onfatal == 'function') try { self.onfatal(event); } catch(e) { postError(e) }
                        return;
                    }
                }
                if (self.current.errorWhenDeleted) {
                    // delete check 1.
                    if (nico.document.getElementById('deleted_message_default')) {
                        self.stop();
                        var event = { type: 'error', message : 'this video got deleted.' };
                        self.dispatchEvent(event);
                        if (typeof self.onerror == 'function') try { self.onerror(event); } catch(e) { postError(e) }
                        return;
                    }
                    // delete check 2.
                    var watchInfo = self.getWatchInfo();
                    if (watchInfo && watchInfo.isDeleted) {
                        self.stop();
                        var event = { type: 'error', message : 'this video got deleted.' };
                        self.dispatchEvent(event);
                        if (typeof self.onerror == 'function') try { self.onerror(event); } catch(e) { postError(e) }
                        return;
                    }
                }
                self.layoutIfNecessary();
                var flvplayer = nico.getPlayer();
                if (!flvplayer) return;
                try {
                    // for load flash.
                    if (self.current.style != WNPCore.STYLE_RESTORE) {
                        var p = getAbsolutePosition(flvplayer);
                        nico.window.scrollTo(p.x, p.y);
                        // for zero
                        if (flvplayer.nodeName == 'OBJECT' && self.current.isHiding) {
                            self.element.style.width = '1px';
                            self.element.style.height = '1px';
                            if (browser.safari) {
                                self._.nicoframe.style.width = '30px';  // safari cannot load flash in 1px iframe. (Supports zero player only on Safari.)
                            }
                        }
                    }
                    if (!flvplayer.ext_isMute()) flvplayer.ext_setMute(1);
                    var status = flvplayer.ext_getStatus();
                    if (status == 'paused') {
                        flvplayer.ext_play(1);
                        return;
                    }
                    var loadedRatio = Number(flvplayer.ext_getLoadedRatio());
                    var totalTime = Number(flvplayer.ext_getTotalTime());
                    if (status == 'stopped' || status == 'load') {
                        if (loadedRatio > 0.05 || loadedRatio * totalTime > 20) {
                            flvplayer.ext_play(1);
                        }
                        return;
                    }
                    // set fullscrren preliminarily to hide "Full screen mode ...."
                    if (flvplayer.ext_getVideoSize() != 'fit') {
                        flvplayer.ext_setVideoSize('fit');
                        last_fit = new Date().getTime();
                    }
                    // video start check.
                    var headTime = Number(flvplayer.ext_getPlayheadTime());
                    if (!(headTime > 0)) {
                        return;
                    }
                }
                catch(e) {
                    return;
                }
                // for redirect.
                $e(nico.window).addEventListener('unload', self.listeners.unload || (self.listeners.unload = function() {
                    if (self.current.isPlaying) {
                        self.loadingStart();
                        self.layout();
                        self.startObserveLoad();
                    }
                }), false);
                
                // stop page observing and go to next state.
                self.stopObserving();
                self.current.videoLoaded = true;
                self.seekTo(0);
                self.nico().getPlayer().ext_play(0);
                
                // delay to hide "Full screen mode ...." if fullscreen mode.
                var delay = 222;
                if (self.current.style == WNPCore.STYLE_FILL) {
                    delay = Math.max(3500 - (new Date().getTime() - last_fit), delay);
                }
                
                // wait for ext_setPlayheadTime method works.
                self.timer.setTimeout('next_observe', function() {
                    // hack for cutting first noise.
                    self.seekTo(0);
                    self.nico().getPlayer().ext_play(0);
                    // wait for ext_setPlayheadTime method works.
                    self.timer.setTimeout('next_observe', function() {
                        self.nicoFrameLoaded();
                        self.startObservePlay();
                        // delay for first rendering.
                        if (!self.current.isPausing) {
                            self.timer.setTimeout('next_observe', function() {
                                self.startPlaying();
                            }, 10);
                        }
                        var event = { type: 'load' };
                        self.dispatchEvent(event);
                        if (self.onload) try { self.onload(event); } catch(e) { postError(e) }
                    }, delay);
                }, 444);
            }
            catch (e) {
                postError(e);
                // on error(perhaps security error), quit observing.
                if (--retry == 0) {
                    self.stop();
                    throw e;
                }
            }
        }, 250);
    }