f


    var _t = this, _resetProperties, _add_html5_events, _remove_html5_events, _stop_html5_timer, _start_html5_timer, _attachOnPosition, _onplay_called = false, _onPositionItems = [], _onPositionFired = 0, _detachOnPosition, _applyFromTo, _lastURL = null, _lastHTML5State;



    _lastHTML5State = {

      // tracks duration + position (time)

      duration: null,

      time: null

    };



    this.sID = oOptions.id;

    this.url = oOptions.url;

    this.options = _mixin(oOptions);



    // per-play-instance-specific options

    this.instanceOptions = this.options;



    // short alias

    this._iO = this.instanceOptions;



    // assign property defaults

    this.pan = this.options.pan;

    this.volume = this.options.volume;



    // whether or not this object is using HTML5

    this.isHTML5 = false;



    // internal HTML5 Audio() object reference

    this._a = null;



    /**

     * SMSound() public methods

     * ------------------------

     */



    this.id3 = {};



    /**

     * Writes SMSound object parameters to debug console

     */



    this._debug = function() {



      // <d>

      // pseudo-private console.log()-style output



      if (_s.debugMode) {



        var stuff = null, msg = [], sF, sfBracket, maxLength = 64;



        for (stuff in _t.options) {

          if (_t.options[stuff] !== null) {

            if (typeof _t.options[stuff] === 'function') {

              // handle functions specially

              sF = _t.options[stuff].toString();

              // normalize spaces

              sF = sF.replace(/\s\s+/g, ' ');

              sfBracket = sF.indexOf('{');

              msg.push(' ' + stuff + ': {' + sF.substr(sfBracket + 1, (Math.min(Math.max(sF.indexOf('\n') - 1, maxLength), maxLength))).replace(/\n/g, '') + '... }');

            } else {

              msg.push(' ' + stuff + ': ' + _t.options[stuff]);

            }

          }

        }



        _s._wD('SMSound() merged options: {\n' + msg.join(', \n') + '\n}');



      }

      // </d>



    };



    // <d>

    this._debug();

    // </d>



    /**

     * Begins loading a sound per its *url*.

     *

     * @param {object} oOptions Optional: Sound options

     * @return {SMSound} The SMSound object

     */



    this.load = function(oOptions) {



      var oS = null, _iO;



      if (typeof oOptions !== 'undefined') {

        _t._iO = _mixin(oOptions, _t.options);

        _t.instanceOptions = _t._iO;

      } else {

        oOptions = _t.options;

        _t._iO = oOptions;

        _t.instanceOptions = _t._iO;

        if (_lastURL && _lastURL !== _t.url) {

          _wDS('manURL');

          _t._iO.url = _t.url;

          _t.url = null;

        }

      }



      if (!_t._iO.url) {

        _t._iO.url = _t.url;

      }



      _t._iO.url = _parseURL(_t._iO.url);



      _s._wD('SMSound.load(): ' + _t._iO.url, 1);



      if (_t._iO.url === _t.url && _t.readyState !== 0 && _t.readyState !== 2) {

        _wDS('onURL', 1);

        // if loaded and an onload() exists, fire immediately.

        if (_t.readyState === 3 && _t._iO.onload) {

          // assume success based on truthy duration.

          _t._iO.onload.apply(_t, [(!!_t.duration)]);

        }

        return _t;

      }



      // local shortcut

      _iO = _t._iO;



      _lastURL = _t.url;

      _t.loaded = false;

      _t.readyState = 1;

      _t.playState = 0;



      // TODO: If switching from HTML5 -> flash (or vice versa), stop currently-playing audio.



      if (_html5OK(_iO)) {



        oS = _t._setup_html5(_iO);



        if (!oS._called_load) {



          _s._wD(_h5+'load: '+_t.sID);



          _t._html5_canplay = false;



          // TODO: review called_load / html5_canplay logic



          // if url provided directly to load(), assign it here.



          if (_t._a.src !== _iO.url) {



            _s._wD(_wDS('manURL') + ': ' + _iO.url);



            _t._a.src = _iO.url;



            // TODO: review / re-apply all relevant options (volume, loop, onposition etc.)



            // reset position for new URL

            _t.setPosition(0);



          }



          // given explicit load call, try to preload.



          // early HTML5 implementation (non-standard)

          _t._a.autobuffer = 'auto';



          // standard

          _t._a.preload = 'auto';



          oS._called_load = true;



          if (_iO.autoPlay) {

            _t.play();

          }



        } else {



          _s._wD(_h5+'ignoring request to load again: '+_t.sID);



        }



      } else {



        try {

          _t.isHTML5 = false;

          _t._iO = _policyFix(_loopFix(_iO));

          // re-assign local shortcut

          _iO = _t._iO;

          if (_fV === 8) {

            _flash._load(_t.sID, _iO.url, _iO.stream, _iO.autoPlay, (_iO.whileloading?1:0), _iO.loops||1, _iO.usePolicyFile);

          } else {

            _flash._load(_t.sID, _iO.url, !!(_iO.stream), !!(_iO.autoPlay), _iO.loops||1, !!(_iO.autoLoad), _iO.usePolicyFile);

          }

        } catch(e) {

          _wDS('smError', 2);

          _debugTS('onload', false);

          _catchError({type:'SMSOUND_LOAD_JS_EXCEPTION', fatal:true});



        }



      }



      return _t;



    };



    /**

     * Unloads a sound, canceling any open HTTP requests.

     *

     * @return {SMSound} The SMSound object

     */



    this.unload = function() {



      // Flash 8/AS2 can't "close" a stream - fake it by loading an empty URL

      // Flash 9/AS3: Close stream, preventing further load

      // HTML5: Most UAs will use empty URL



      if (_t.readyState !== 0) {



        _s._wD('SMSound.unload(): "' + _t.sID + '"');



        if (!_t.isHTML5) {



          if (_fV === 8) {

            _flash._unload(_t.sID, _emptyURL);

          } else {

            _flash._unload(_t.sID);

          }



        } else {



          _stop_html5_timer();



          if (_t._a) {



            _t._a.pause();

            _html5Unload(_t._a, _emptyURL);



            // reset local URL for next load / play call, too

            _t.url = _emptyURL;



          }



        }



        // reset load/status flags

        _resetProperties();



      }



      return _t;



    };



    /**

     * Unloads and destroys a sound.

     */



    this.destruct = function(_bFromSM) {



      _s._wD('SMSound.destruct(): "' + _t.sID + '"');



      if (!_t.isHTML5) {



        // kill sound within Flash

        // Disable the onfailure handler

        _t._iO.onfailure = null;

        _flash._destroySound(_t.sID);



      } else {



        _stop_html5_timer();



        if (_t._a) {

          _t._a.pause();

          _html5Unload(_t._a);

          if (!_useGlobalHTML5Audio) {

            _remove_html5_events();

          }

          // break obvious circular reference

          _t._a._t = null;

          _t._a = null;

        }



      }



      if (!_bFromSM) {

        // ensure deletion from controller

        _s.destroySound(_t.sID, true);



      }



    };



    /**

     * Begins playing a sound.

     *

     * @param {object} oOptions Optional: Sound options

     * @return {SMSound} The SMSound object

     */



    this.play = function(oOptions, _updatePlayState) {



      var fN, allowMulti, a, onready, startOK = true,

          exit = null;



      // <d>

      fN = 'SMSound.play(): ';

      // </d>



      // default to true

      _updatePlayState = (typeof _updatePlayState === 'undefined' ? true : _updatePlayState);



      if (!oOptions) {

        oOptions = {};

      }



      _t._iO = _mixin(oOptions, _t._iO);

      _t._iO = _mixin(_t._iO, _t.options);

      _t._iO.url = _parseURL(_t._iO.url);

      _t.instanceOptions = _t._iO;



      // RTMP-only

      if (_t._iO.serverURL && !_t.connected) {

        if (!_t.getAutoPlay()) {

          _s._wD(fN+' Netstream not connected yet - setting autoPlay');

          _t.setAutoPlay(true);

        }

        // play will be called in _onconnect()

        return _t;

      }



      if (_html5OK(_t._iO)) {

        _t._setup_html5(_t._iO);

        _start_html5_timer();

      }



      if (_t.playState === 1 && !_t.paused) {

        allowMulti = _t._iO.multiShot;

        if (!allowMulti) {

          _s._wD(fN + '"' + _t.sID + '" already playing (one-shot)', 1);

          exit = _t;

        } else {

          _s._wD(fN + '"' + _t.sID + '" already playing (multi-shot)', 1);

        }

      }



      if (exit !== null) {

        return exit;

      }



      if (!_t.loaded) {



        if (_t.readyState === 0) {



          _s._wD(fN + 'Attempting to load "' + _t.sID + '"', 1);



          // try to get this sound playing ASAP

          if (!_t.isHTML5) {

            // assign directly because setAutoPlay() increments the instanceCount

            _t._iO.autoPlay = true;

            _t.load(_t._iO);

          } else {

            // iOS needs this when recycling sounds, loading a new URL on an existing object.

            _t.load(_t._iO);

          }



        } else if (_t.readyState === 2) {



          _s._wD(fN + 'Could not load "' + _t.sID + '" - exiting', 2);

          exit = _t;



        } else {



          _s._wD(fN + '"' + _t.sID + '" is loading - attempting to play..', 1);



        }



      } else {



        _s._wD(fN + '"' + _t.sID + '"');



      }



      if (exit !== null) {

        return exit;

      }



      if (!_t.isHTML5 && _fV === 9 && _t.position > 0 && _t.position === _t.duration) {

        // flash 9 needs a position reset if play() is called while at the end of a sound.

        _s._wD(fN + '"' + _t.sID + '": Sound at end, resetting to position:0');

        oOptions.position = 0;

      }



      /**

       * Streams will pause when their buffer is full if they are being loaded.

       * In this case paused is true, but the song hasn't started playing yet.

       * If we just call resume() the onplay() callback will never be called.

       * So only call resume() if the position is > 0.

       * Another reason is because options like volume won't have been applied yet.

       */



      if (_t.paused && _t.position && _t.position > 0) {



        // https://gist.github.com/37b17df75cc4d7a90bf6

        _s._wD(fN + '"' + _t.sID + '" is resuming from paused state',1);

        _t.resume();



      } else {



        _t._iO = _mixin(oOptions, _t._iO);



        // apply from/to parameters, if they exist (and not using RTMP)

        if (_t._iO.from !== null && _t._iO.to !== null && _t.instanceCount === 0 && _t.playState === 0 && !_t._iO.serverURL) {



          onready = function() {

            // sound "canplay" or onload()

            // re-apply from/to to instance options, and start playback

            _t._iO = _mixin(oOptions, _t._iO);

            _t.play(_t._iO);

          };



          // HTML5 needs to at least have "canplay" fired before seeking.

          if (_t.isHTML5 && !_t._html5_canplay) {



            // this hasn't been loaded yet. load it first, and then do this again.

            _s._wD(fN+'Beginning load of "'+ _t.sID+'" for from/to case');



            _t.load({

              _oncanplay: onready

            });



            exit = false;



          } else if (!_t.isHTML5 && !_t.loaded && (!_t.readyState || _t.readyState !== 2)) {



            // to be safe, preload the whole thing in Flash.



            _s._wD(fN+'Preloading "'+ _t.sID+'" for from/to case');



            _t.load({

              onload: onready

            });



            exit = false;



          }



          if (exit !== null) {

            return exit;

          }



          // otherwise, we're ready to go. re-apply local options, and continue



          _t._iO = _applyFromTo();



        }



        _s._wD(fN+'"'+ _t.sID+'" is starting to play');



        if (!_t.instanceCount || _t._iO.multiShotEvents || (!_t.isHTML5 && _fV > 8 && !_t.getAutoPlay())) {

          _t.instanceCount++;

        }



        // if first play and onposition parameters exist, apply them now

        if (_t._iO.onposition && _t.playState === 0) {

          _attachOnPosition(_t);

        }



        _t.playState = 1;

        _t.paused = false;



        _t.position = (typeof _t._iO.position !== 'undefined' && !isNaN(_t._iO.position) ? _t._iO.position : 0);



        if (!_t.isHTML5) {

          _t._iO = _policyFix(_loopFix(_t._iO));

        }



        if (_t._iO.onplay && _updatePlayState) {

          _t._iO.onplay.apply(_t);

          _onplay_called = true;

        }



        _t.setVolume(_t._iO.volume, true);

        _t.setPan(_t._iO.pan, true);



        if (!_t.isHTML5) {



          startOK = _flash._start(_t.sID, _t._iO.loops || 1, (_fV === 9 ? _t._iO.position : _t._iO.position / 1000), _t._iO.multiShot);



          if (_fV === 9 && !startOK) {

            // edge case: no sound hardware, or 32-channel flash ceiling hit.

            // applies only to Flash 9, non-NetStream/MovieStar sounds.

            // http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/media/Sound.html#play%28%29

            _s._wD(fN+ _t.sID+': No sound hardware, or 32-sound ceiling hit');

            if (_t._iO.onplayerror) {

              _t._iO.onplayerror.apply(_t);

            }



          }



        } else {



          _start_html5_timer();



          a = _t._setup_html5();



          _t.setPosition(_t._iO.position);



          a.play();



        }



      }



      return _t;



    };



    // just for convenience

    this.start = this.play;



    /**

     * Stops playing a sound (and optionally, all sounds)

     *

     * @param {boolean} bAll Optional: Whether to stop all sounds

     * @return {SMSound} The SMSound object

     */



    this.stop = function(bAll) {



      var _iO = _t._iO, _oP;



      if (_t.playState === 1) {



        _t._onbufferchange(0);

        _t._resetOnPosition(0);

        _t.paused = false;



        if (!_t.isHTML5) {

          _t.playState = 0;

        }



        // remove onPosition listeners, if any

        _detachOnPosition();



        // and "to" position, if set

        if (_iO.to) {

          _t.clearOnPosition(_iO.to);

        }



        if (!_t.isHTML5) {



          _flash._stop(_t.sID, bAll);



          // hack for netStream: just unload

          if (_iO.serverURL) {

            _t.unload();

          }



        } else {



          if (_t._a) {



            _oP = _t.position;



            // act like Flash, though

            _t.setPosition(0);



            // hack: reflect old position for onstop() (also like Flash)

            _t.position = _oP;



            // html5 has no stop()

            // NOTE: pausing means iOS requires interaction to resume.

            _t._a.pause();



            _t.playState = 0;



            // and update UI

            _t._onTimer();



            _stop_html5_timer();



          }



        }



        _t.instanceCount = 0;

        _t._iO = {};



        if (_iO.onstop) {

          _iO.onstop.apply(_t);

        }



      }



      return _t;



    };



    /**

     * Undocumented/internal: Sets autoPlay for RTMP.

     *

     * @param {boolean} autoPlay state

     */



    this.setAutoPlay = function(autoPlay) {



      _s._wD('sound '+_t.sID+' turned autoplay ' + (autoPlay ? 'on' : 'off'));

      _t._iO.autoPlay = autoPlay;



      if (!_t.isHTML5) {

        _flash._setAutoPlay(_t.sID, autoPlay);

        if (autoPlay) {

          // only increment the instanceCount if the sound isn't loaded (TODO: verify RTMP)

          if (!_t.instanceCount && _t.readyState === 1) {

            _t.instanceCount++;

            _s._wD('sound '+_t.sID+' incremented instance count to '+_t.instanceCount);

          }

        }

      }



    };



    /**

     * Undocumented/internal: Returns the autoPlay boolean.

     *

     * @return {boolean} The current autoPlay value

     */



    this.getAutoPlay = function() {



      return _t._iO.autoPlay;



    };



    /**

     * Sets the position of a sound.

     *

     * @param {number} nMsecOffset Position (milliseconds)

     * @return {SMSound} The SMSound object

     */



    this.setPosition = function(nMsecOffset) {



      if (typeof nMsecOffset === 'undefined') {

        nMsecOffset = 0;

      }



      var original_pos,

          position, position1K,

          // Use the duration from the instance options, if we don't have a track duration yet.

          // position >= 0 and <= current available (loaded) duration

          offset = (_t.isHTML5 ? Math.max(nMsecOffset,0) : Math.min(_t.duration || _t._iO.duration, Math.max(nMsecOffset, 0)));



      original_pos = _t.position;

      _t.position = offset;

      position1K = _t.position/1000;

      _t._resetOnPosition(_t.position);

      _t._iO.position = offset;



      if (!_t.isHTML5) {



        position = (_fV === 9 ? _t.position : position1K);

        if (_t.readyState && _t.readyState !== 2) {

          // if paused or not playing, will not resume (by playing)

          _flash._setPosition(_t.sID, position, (_t.paused || !_t.playState), _t._iO.multiShot);

        }



      } else if (_t._a) {



        // Set the position in the canplay handler if the sound is not ready yet

        if (_t._html5_canplay) {

          if (_t._a.currentTime !== position1K) {

            /**

             * DOM/JS errors/exceptions to watch out for:

             * if seek is beyond (loaded?) position, "DOM exception 11"

             * "INDEX_SIZE_ERR": DOM exception 1

             */

            _s._wD('setPosition('+position1K+'): setting position');

            try {

              _t._a.currentTime = position1K;

              if (_t.playState === 0 || _t.paused) {

                // allow seek without auto-play/resume

                _t._a.pause();

              }

            } catch(e) {

              _s._wD('setPosition('+position1K+'): setting position failed: '+e.message, 2);

            }

          }

        } else {

          _s._wD('setPosition('+position1K+'): delaying, sound not ready');

        }



      }



      if (_t.isHTML5) {

        if (_t.paused) {

          // if paused, refresh UI right away

          // force update

          _t._onTimer(true);

        }

      }



      return _t;



    };



    /**

     * Pauses sound playback.

     *

     * @return {SMSound} The SMSound object

     */



    this.pause = function(_bCallFlash) {



      if (_t.paused || (_t.playState === 0 && _t.readyState !== 1)) {

        return _t;

      }



      _s._wD('SMSound.pause()');

      _t.paused = true;



      if (!_t.isHTML5) {

        if (_bCallFlash || typeof _bCallFlash === 'undefined') {

          _flash._pause(_t.sID, _t._iO.multiShot);

        }

      } else {

        _t._setup_html5().pause();

        _stop_html5_timer();

      }



      if (_t._iO.onpause) {

        _t._iO.onpause.apply(_t);

      }



      return _t;



    };



    /**

     * Resumes sound playback.

     *

     * @return {SMSound} The SMSound object

     */



    /**

     * When auto-loaded streams pause on buffer full they have a playState of 0.

     * We need to make sure that the playState is set to 1 when these streams "resume".

     * When a paused stream is resumed, we need to trigger the onplay() callback if it

     * hasn't been called already. In this case since the sound is being played for the

     * first time, I think it's more appropriate to call onplay() rather than onresume().

     */



    this.resume = function() {



      var _iO = _t._iO;



      if (!_t.paused) {

        return _t;

      }



      _s._wD('SMSound.resume()');

      _t.paused = false;

      _t.playState = 1;



      if (!_t.isHTML5) {

        if (_iO.isMovieStar && !_iO.serverURL) {

          // Bizarre Webkit bug (Chrome reported via 8tracks.com dudes): AAC content paused for 30+ seconds(?) will not resume without a reposition.

          _t.setPosition(_t.position);

        }

        // flash method is toggle-based (pause/resume)

        _flash._pause(_t.sID, _iO.multiShot);

      } else {

        _t._setup_html5().play();

        _start_html5_timer();

      }



      if (!_onplay_called && _iO.onplay) {

        _iO.onplay.apply(_t);

        _onplay_called = true;

      } else if (_iO.onresume) {

        _iO.onresume.apply(_t);

      }



      return _t;



    };



    /**

     * Toggles sound playback.

     *

     * @return {SMSound} The SMSound object

     */



    this.togglePause = function() {



      _s._wD('SMSound.togglePause()');



      if (_t.playState === 0) {

        _t.play({

          position: (_fV === 9 && !_t.isHTML5 ? _t.position : _t.position / 1000)

        });

        return _t;

      }



      if (_t.paused) {

        _t.resume();

      } else {

        _t.pause();

      }



      return _t;



    };



    /**

     * Sets the panning (L-R) effect.

     *

     * @param {number} nPan The pan value (-100 to 100)

     * @return {SMSound} The SMSound object

     */



    this.setPan = function(nPan, bInstanceOnly) {



      if (typeof nPan === 'undefined') {

        nPan = 0;

      }



      if (typeof bInstanceOnly === 'undefined') {

        bInstanceOnly = false;

      }



      if (!_t.isHTML5) {

        _flash._setPan(_t.sID, nPan);

      } // else { no HTML5 pan? }



      _t._iO.pan = nPan;



      if (!bInstanceOnly) {

        _t.pan = nPan;

        _t.options.pan = nPan;

      }



      return _t;



    };



    /**

     * Sets the volume.

     *

     * @param {number} nVol The volume value (0 to 100)

     * @return {SMSound} The SMSound object

     */



    this.setVolume = function(nVol, _bInstanceOnly) {



      /**

       * Note: Setting volume has no effect on iOS "special snowflake" devices.

       * Hardware volume control overrides software, and volume

       * will always return 1 per Apple docs. (iOS 4 + 5.)

       * http://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/HTML-canvas-guide/AddingSoundtoCanvasAnimations/AddingSoundtoCanvasAnimations.html

       */



      if (typeof nVol === 'undefined') {

        nVol = 100;

      }



      if (typeof _bInstanceOnly === 'undefined') {

        _bInstanceOnly = false;

      }



      if (!_t.isHTML5) {

        _flash._setVolume(_t.sID, (_s.muted && !_t.muted) || _t.muted?0:nVol);

      } else if (_t._a) {

        // valid range: 0-1

        _t._a.volume = Math.max(0, Math.min(1, nVol/100));

      }



      _t._iO.volume = nVol;



      if (!_bInstanceOnly) {

        _t.volume = nVol;

        _t.options.volume = nVol;

      }



      return _t;



    };



    /**

     * Mutes the sound.

     *

     * @return {SMSound} The SMSound object

     */



    this.mute = function() {



      _t.muted = true;



      if (!_t.isHTML5) {

        _flash._setVolume(_t.sID, 0);

      } else if (_t._a) {

        _t._a.muted = true;

      }



      return _t;



    };



    /**

     * Unmutes the sound.

     *

     * @return {SMSound} The SMSound object

     */



    this.unmute = function() {



      _t.muted = false;

      var hasIO = (typeof _t._iO.volume !== 'undefined');



      if (!_t.isHTML5) {

        _flash._setVolume(_t.sID, hasIO?_t._iO.volume:_t.options.volume);

      } else if (_t._a) {

        _t._a.muted = false;

      }



      return _t;



    };



    /**

     * Toggles the muted state of a sound.

     *

     * @return {SMSound} The SMSound object

     */



    this.toggleMute = function() {



      return (_t.muted?_t.unmute():_t.mute());



    };



    /**

     * Registers a callback to be fired when a sound reaches a given position during playback.

     *

     * @param {number} nPosition The position to watch for

     * @param {function} oMethod The relevant callback to fire

     * @param {object} oScope Optional: The scope to apply the callback to

     * @return {SMSound} The SMSound object

     */



    this.onPosition = function(nPosition, oMethod, oScope) {



      // TODO: basic dupe checking?



      _onPositionItems.push({

        position: parseInt(nPosition, 10),

        method: oMethod,

        scope: (typeof oScope !== 'undefined' ? oScope : _t),

        fired: false

      });



      return _t;



    };



    // legacy/backwards-compability: lower-case method name

    this.onposition = this.onPosition;



    /**

     * Removes registered callback(s) from a sound, by position and/or callback.

     *

     * @param {number} nPosition The position to clear callback(s) for

     * @param {function} oMethod Optional: Identify one callback to be removed when multiple listeners exist for one position

     * @return {SMSound} The SMSound object

     */



    this.clearOnPosition = function(nPosition, oMethod) {



      var i;



      nPosition = parseInt(nPosition, 10);



      if (isNaN(nPosition)) {

        // safety check

        return false;

      }



      for (i=0; i < _onPositionItems.length; i++) {



        if (nPosition === _onPositionItems[i].position) {

          // remove this item if no method was specified, or, if the method matches

          if (!oMethod || (oMethod === _onPositionItems[i].method)) {

            if (_onPositionItems[i].fired) {

              // decrement "fired" counter, too

              _onPositionFired--;

            }

            _onPositionItems.splice(i, 1);

          }

        }



      }



    };



    this._processOnPosition = function() {



      var i, item, j = _onPositionItems.length;



      if (!j || !_t.playState || _onPositionFired >= j) {

        return false;

      }



      for (i=j-1; i >= 0; i--) {

        item = _onPositionItems[i];

        if (!item.fired && _t.position >= item.position) {

          item.fired = true;

          _onPositionFired++;

          item.method.apply(item.scope, [item.position]);

        }

      }



      return true;



    };



    this._resetOnPosition = function(nPosition) {



      // reset "fired" for items interested in this position

      var i, item, j = _onPositionItems.length;



      if (!j) {

        return false;

      }



      for (i=j-1; i >= 0; i--) {

        item = _onPositionItems[i];

        if (item.fired && nPosition <= item.position) {

          item.fired = false;

          _onPositionFired--;

        }

      }



      return true;



    };



    /**

     * SMSound() private internals

     * --------------------------------

     */



    _applyFromTo = function() {



      var _iO = _t._iO,

          f = _iO.from,

          t = _iO.to,

          start, end;



      end = function() {



        // end has been reached.

        _s._wD(_t.sID + ': "to" time of ' + t + ' reached.');



        // detach listener

        _t.clearOnPosition(t, end);



        // stop should clear this, too

        _t.stop();



      };



      start = function() {



        _s._wD(_t.sID + ': playing "from" ' + f);



        // add listener for end

        if (t !== null && !isNaN(t)) {

          _t.onPosition(t, end);

        }



      };



      if (f !== null && !isNaN(f)) {



        // apply to instance options, guaranteeing correct start position.

        _iO.position = f;



        // multiShot timing can't be tracked, so prevent that.

        _iO.multiShot = false;



        start();



      }



      // return updated instanceOptions including starting position

      return _iO;



    };



    _attachOnPosition = function() {



      var item,

          op = _t._iO.onposition;



      // attach onposition things, if any, now.



      if (op) {



        for (item in op) {

          if (op.hasOwnProperty(item)) {

            _t.onPosition(parseInt(item, 10), op[item]); 

          }

        }



      }



    };



    _detachOnPosition = function() {



      var item,

          op = _t._iO.onposition;



      // detach any onposition()-style listeners.



      if (op) {



        for (item in op) {

          if (op.hasOwnProperty(item)) {

            _t.clearOnPosition(parseInt(item, 10));

          }

        }



      }



    };



    _start_html5_timer = function() {



      if (_t.isHTML5) {

        _startTimer(_t);

      }



    };



    _stop_html5_timer = function() {



      if (_t.isHTML5) {

        _stopTimer(_t);

      }



    };



    _resetProperties = function(retainPosition) {



      if (!retainPosition) {

        _onPositionItems = [];

        _onPositionFired = 0;

      }



      _onplay_called = false;



      _t._hasTimer = null;

      _t._a = null;

      _t._html5_canplay = false;

      _t.bytesLoaded = null;

      _t.bytesTotal = null;

      _t.duration = (_t._iO && _t._iO.duration ? _t._iO.duration : null);

      _t.durationEstimate = null;



      // legacy: 1D array

      _t.eqData = [];



      _t.eqData.left = [];

      _t.eqData.right = [];



      _t.failures = 0;

      _t.isBuffering = false;

      _t.instanceOptions = {};

      _t.instanceCount = 0;

      _t.loaded = false;

      _t.metadata = {};



      // 0 = uninitialised, 1 = loading, 2 = failed/error, 3 = loaded/success

      _t.readyState = 0;



      _t.muted = false;

      _t.paused = false;



      _t.peakData = {

        left: 0,

        right: 0

      };



      _t.waveformData = {

        left: [],

        right: []

      };



      _t.playState = 0;

      _t.position = null;



    };



    _resetProperties();



    /**

     * Pseudo-private SMSound internals

     * --------------------------------

     */



    this._onTimer = function(bForce) {



      /**

       * HTML5-only _whileplaying() etc.

       * called from both HTML5 native events, and polling/interval-based timers

       * mimics flash and fires only when time/duration change, so as to be polling-friendly

       */



      var duration, isNew = false, time, x = {};



      if (_t._hasTimer || bForce) {



        // TODO: May not need to track readyState (1 = loading)



        if (_t._a && (bForce || ((_t.playState > 0 || _t.readyState === 1) && !_t.paused))) {



          duration = _t._get_html5_duration();



          if (duration !== _lastHTML5State.duration) {



            _lastHTML5State.duration = duration;

            _t.duration = duration;

            isNew = true;



          }



          // TODO: investigate why this goes wack if not set/re-set each time.

          _t.durationEstimate = _t.duration;



          time = (_t._a.currentTime * 1000 || 0);



          if (time !== _lastHTML5State.time) {



            _lastHTML5State.time = time;

            isNew = true;



          }



          if (isNew || bForce) {



            _t._whileplaying(time,x,x,x,x);



          }



        }/* else {



          // _s._wD('_onTimer: Warn for "'+_t.sID+'": '+(!_t._a?'Could not find element. ':'')+(_t.playState === 0?'playState bad, 0?':'playState = '+_t.playState+', OK'));



          return false;



        }*/



        return isNew;



      }



    };



    this._get_html5_duration = function() {



      var _iO = _t._iO,

          d = (_t._a ? _t._a.duration*1000 : (_iO ? _iO.duration : undefined)),

          result = (d && !isNaN(d) && d !== Infinity ? d : (_iO ? _iO.duration : null));



      return result;



    };



    this._apply_loop = function(a, nLoops) {



      /**

       * boolean instead of "loop", for webkit? - spec says string. http://www.w3.org/TR/html-markup/audio.html#audio.attrs.loop

       * note that loop is either off or infinite under HTML5, unlike Flash which allows arbitrary loop counts to be specified.

       */



      // <d>

      if (!a.loop && nLoops > 1) {

        _s._wD('Note: Native HTML5 looping is infinite.');

      }

      // </d>



      a.loop = (nLoops > 1 ? 'loop' : '');



    };



    this._setup_html5 = function(oOptions) {



      var _iO = _mixin(_t._iO, oOptions), d = decodeURI,

          _a = _useGlobalHTML5Audio ? _s._global_a : _t._a,

          _dURL = d(_iO.url),

          _oldIO = (_a && _a._t ? _a._t.instanceOptions : null),

          result;



      if (_a) {



        if (_a._t) {



          if (!_useGlobalHTML5Audio && _dURL === d(_lastURL)) {



            // same url, ignore request

            result = _a; 



          } else if (_useGlobalHTML5Audio && _oldIO.url === _iO.url && (!_lastURL || (_lastURL === _oldIO.url))) {



            // iOS-type reuse case

            result = _a;



          }



          if (result) {



            _t._apply_loop(_a, _iO.loops);

            return result;



          }



        }



        _s._wD('setting URL on existing object: ' + _dURL + (_lastURL ? ', old URL: ' + _lastURL : ''));



        /**

         * "First things first, I, Poppa.." (reset the previous state of the old sound, if playing)

         * Fixes case with devices that can only play one sound at a time

         * Otherwise, other sounds in mid-play will be terminated without warning and in a stuck state

         */



        if (_useGlobalHTML5Audio && _a._t && _a._t.playState && _iO.url !== _oldIO.url) {



          _a._t.stop();



        }



        // reset load/playstate, onPosition etc. if the URL is new.

        // somewhat-tricky object re-use vs. new SMSound object, old vs. new URL comparisons

        _resetProperties((_oldIO.url ? _iO.url === _oldIO.url : (_lastURL ? _lastURL === _iO.url : false)));



        _a.src = _iO.url;

        _t.url = _iO.url;

        _lastURL = _iO.url;

        _a._called_load = false;



      } else {



        _wDS('h5a');



        if (_iO.autoLoad || _iO.autoPlay) {



          _t._a = new Audio(_iO.url);



        } else {



          // null for stupid Opera 9.64 case

          _t._a = (_isOpera ? new Audio(null) : new Audio());



        }



        // assign local reference

        _a = _t._a;



        _a._called_load = false;



        if (_useGlobalHTML5Audio) {



          _s._global_a = _a;



        }



      }



      _t.isHTML5 = true;



      // store a ref on the track

      _t._a = _a;



      // store a ref on the audio

      _a._t = _t;



      _add_html5_events();



      _t._apply_loop(_a, _iO.loops);



      if (_iO.autoLoad || _iO.autoPlay) {



        _t.load();



      } else {



        // early HTML5 implementation (non-standard)

        _a.autobuffer = false;



        // standard ('none' is also an option.)

        _a.preload = 'auto';



      }



      return _a;



    };



    _add_html5_events = function() {



      if (_t._a._added_events) {

        return false;

      }



      var f;



      function add(oEvt, oFn, bCapture) {

        return _t._a ? _t._a.addEventListener(oEvt, oFn, bCapture||false) : null;

      }



      _t._a._added_events = true;



      for (f in _html5_events) {

        if (_html5_events.hasOwnProperty(f)) {

          add(f, _html5_events[f]);

        }

      }



      return true;



    };



    _remove_html5_events = function() {



      // Remove event listeners



      var f;



      function remove(oEvt, oFn, bCapture) {

        return (_t._a ? _t._a.removeEventListener(oEvt, oFn, bCapture||false) : null);

      }



      _s._wD(_h5+'removing event listeners: '+_t.sID);

      _t._a._added_events = false;



      for (f in _html5_events) {

        if (_html5_events.hasOwnProperty(f)) {

          remove(f, _html5_events[f]);

        }

      }



    };



    /**

     * Pseudo-private event internals

     * ------------------------------

     */



    this._onload = function(nSuccess) {





      var fN, loadOK = !!(nSuccess);



      // <d>

      fN = 'SMSound._onload(): ';

      _s._wD(fN + '"' + _t.sID + '"' + (loadOK?' loaded.':' failed to load? - ' + _t.url), (loadOK?1:2));

      if (!loadOK && !_t.isHTML5) {

        if (_s.sandbox.noRemote === true) {

          _s._wD(fN + _str('noNet'), 1);

        }

        if (_s.sandbox.noLocal === true) {

          _s._wD(fN + _str('noLocal'), 1);

        }

      }

      // </d>



      _t.loaded = loadOK;

      _t.readyState = loadOK?3:2;

      _t._onbufferchange(0);



      if (_t._iO.onload) {

        _t._iO.onload.apply(_t, [loadOK]);

      }



      return true;



    };



    this._onbufferchange = function(nIsBuffering) {



      if (_t.playState === 0) {

        // ignore if not playing

        return false;

      }



      if ((nIsBuffering && _t.isBuffering) || (!nIsBuffering && !_t.isBuffering)) {

        return false;

      }



      _t.isBuffering = (nIsBuffering === 1);

      if (_t._iO.onbufferchange) {

        _s._wD('SMSound._onbufferchange(): ' + nIsBuffering);

        _t._iO.onbufferchange.apply(_t);

      }



      return true;



    };



    /**

     * Notify Mobile Safari that user action is required

     * to continue playing / loading the audio file.

     */



    this._onsuspend = function() {



      if (_t._iO.onsuspend) {

        _s._wD('SMSound._onsuspend()');

        _t._iO.onsuspend.apply(_t);

      }



      return true;



    };



    /**

     * flash 9/movieStar + RTMP-only method, should fire only once at most

     * at this point we just recreate failed sounds rather than trying to reconnect

     */



    this._onfailure = function(msg, level, code) {



      _t.failures++;

      _s._wD('SMSound._onfailure(): "'+_t.sID+'" count '+_t.failures);



      if (_t._iO.onfailure && _t.failures === 1) {

        _t._iO.onfailure(_t, msg, level, code);

      } else {

        _s._wD('SMSound._onfailure(): ignoring');

      }



    };



    this._onfinish = function() {



      // store local copy before it gets trashed..

      var _io_onfinish = _t._iO.onfinish;



      _t._onbufferchange(0);

      _t._resetOnPosition(0);



      // reset some state items

      if (_t.instanceCount) {



        _t.instanceCount--;



        if (!_t.instanceCount) {



          // remove onPosition listeners, if any

          _detachOnPosition();



          // reset instance options

          _t.playState = 0;

          _t.paused = false;

          _t.instanceCount = 0;

          _t.instanceOptions = {};

          _t._iO = {};

          _stop_html5_timer();



          // reset position, too

          if (_t.isHTML5) {

            _t.position = 0;

          }



        }



        if (!_t.instanceCount || _t._iO.multiShotEvents) {

          // fire onfinish for last, or every instance

          if (_io_onfinish) {

            _s._wD('SMSound._onfinish(): "' + _t.sID + '"');

            _io_onfinish.apply(_t);

          }

        }



      }



    };



    this._whileloading = function(nBytesLoaded, nBytesTotal, nDuration, nBufferLength) {



      var _iO = _t._iO;



      _t.bytesLoaded = nBytesLoaded;

      _t.bytesTotal = nBytesTotal;

      _t.duration = Math.floor(nDuration);

      _t.bufferLength = nBufferLength;



      if (!_iO.isMovieStar) {



        if (_iO.duration) {

          // use options, if specified and larger

          _t.durationEstimate = (_t.duration > _iO.duration) ? _t.duration : _iO.duration;

        } else {

          _t.durationEstimate = parseInt((_t.bytesTotal / _t.bytesLoaded) * _t.duration, 10);



        }



        if (typeof _t.durationEstimate === 'undefined') {

          _t.durationEstimate = _t.duration;

        }



        if (_t.readyState !== 3 && _iO.whileloading) {

          _iO.whileloading.apply(_t);

        }



      } else {



        _t.durationEstimate = _t.duration;

        if (_t.readyState !== 3 && _iO.whileloading) {

          _iO.whileloading.apply(_t);

        }



      }



    };



    this._whileplaying = function(nPosition, oPeakData, oWaveformDataLeft, oWaveformDataRight, oEQData) {



      var _iO = _t._iO,

          eqLeft;



      if (isNaN(nPosition) || nPosition === null) {

        // flash safety net

        return false;

      }



      // Safari HTML5 play() may return small -ve values when starting from position: 0, eg. -50.120396875. Unexpected/invalid per W3, I think. Normalize to 0.

      _t.position = Math.max(0, nPosition);



      _t._processOnPosition();



      if (!_t.isHTML5 && _fV > 8) {



        if (_iO.usePeakData && typeof oPeakData !== 'undefined' && oPeakData) {

          _t.peakData = {

            left: oPeakData.leftPeak,

            right: oPeakData.rightPeak

          };

        }



        if (_iO.useWaveformData && typeof oWaveformDataLeft !== 'undefined' && oWaveformDataLeft) {

          _t.waveformData = {

            left: oWaveformDataLeft.split(','),

            right: oWaveformDataRight.split(',')

          };

        }



        if (_iO.useEQData) {

          if (typeof oEQData !== 'undefined' && oEQData && oEQData.leftEQ) {

            eqLeft = oEQData.leftEQ.split(',');

            _t.eqData = eqLeft;

            _t.eqData.left = eqLeft;

            if (typeof oEQData.rightEQ !== 'undefined' && oEQData.rightEQ) {

              _t.eqData.right = oEQData.rightEQ.split(',');

            }

          }

        }



      }



      if (_t.playState === 1) {



        // special case/hack: ensure buffering is false if loading from cache (and not yet started)

        if (!_t.isHTML5 && _fV === 8 && !_t.position && _t.isBuffering) {

          _t._onbufferchange(0);

        }



        if (_iO.whileplaying) {

          // flash may call after actual finish

          _iO.whileplaying.apply(_t);

        }



      }



      return true;



    };



    this._oncaptiondata = function(oData) {



      /**

       * internal: flash 9 + NetStream (MovieStar/RTMP-only) feature

       * 

       * @param {object} oData

       */



      _s._wD('SMSound._oncaptiondata(): "' + this.sID + '" caption data received.');



      _t.captiondata = oData;



      if (_t._iO.oncaptiondata) {

        _t._iO.oncaptiondata.apply(_t);

      }



	};



    this._onmetadata = function(oMDProps, oMDData) {



      /**

       * internal: flash 9 + NetStream (MovieStar/RTMP-only) feature

       * RTMP may include song title, MovieStar content may include encoding info

       * 

       * @param {array} oMDProps (names)

       * @param {array} oMDData (values)

       */



      _s._wD('SMSound._onmetadata(): "' + this.sID + '" metadata received.');



      var oData = {}, i, j;



      for (i = 0, j = oMDProps.length; i < j; i++) {

        oData[oMDProps[i]] = oMDData[i];

      }

      _t.metadata = oData;



      if (_t._iO.onmetadata) {

        _t._iO.onmetadata.apply(_t);

      }



	};



    this._onid3 = function(oID3Props, oID3Data) {



      /**

       * internal: flash 8 + flash 9 ID3 feature

       * may include artist, song title etc.

       * 

       * @param {array} oID3Props (names)

       * @param {array} oID3Data (values)

       */



      _s._wD('SMSound._onid3(): "' + this.sID + '" ID3 data received.');



      var oData = [], i, j;



      for (i = 0, j = oID3Props.length; i < j; i++) {

        oData[oID3Props[i]] = oID3Data[i];

      }

      _t.id3 = _mixin(_t.id3, oData);



      if (_t._iO.onid3) {

        _t._iO.onid3.apply(_t);

      }



    };



    // flash/RTMP-only



    this._onconnect = function(bSuccess) {



      bSuccess = (bSuccess === 1);

      _s._wD('SMSound._onconnect(): "'+_t.sID+'"'+(bSuccess?' connected.':' failed to connect? - '+_t.url), (bSuccess?1:2));

      _t.connected = bSuccess;



      if (bSuccess) {



        _t.failures = 0;



        if (_idCheck(_t.sID)) {

          if (_t.getAutoPlay()) {

            // only update the play state if auto playing

            _t.play(undefined, _t.getAutoPlay());

          } else if (_t._iO.autoLoad) {

            _t.load();

          }

        }



        if (_t._iO.onconnect) {

          _t._iO.onconnect.apply(_t, [bSuccess]);

        }



      }



    };



    this._ondataerror = function(sError) {



      // flash 9 wave/eq data handler

      // hack: called at start, and end from flash at/after onfinish()

      if (_t.playState > 0) {

        _s._wD('SMSound._ondataerror(): ' + sError);

        if (_t._iO.ondataerror) {

          _t._iO.ondataerror.apply(_t);

        }

      }



    };



  }; // SMSound()
