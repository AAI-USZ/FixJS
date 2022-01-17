function (globals, exports) {
    'use strict';

    var WaveSurfer = globals.WaveSurfer;

    var webAudio = Object.create(WaveSurfer.WebAudio);

    webAudio.init();

    var cachedDrawer=Object.create(WaveSurfer.Drawer);
    cachedDrawer.init(
        null,
        webAudio,
        { cached: true
        }
    );


    var waveDrawer = Object.create(WaveSurfer.Drawer);
    waveDrawer.init(
        document.querySelector('#wave'),
        webAudio,
        {
            color: 'rgba(100, 0, 250, 0.5)',
            cursor: document.querySelector('#wave-cursor'),
            continuous: true
        }
    );
    waveDrawer.bindClick();


    var rtaDrawer = Object.create(WaveSurfer.Drawer);
    rtaDrawer.init(
        document.querySelector('#rta'),
        webAudio,
        { color: 'rgba(0, 100, 150, 0.7)',
          freq: true
        }
    );
    rtaDrawer.loop(webAudio.frequency,0);


    var currentDrawer = Object.create(WaveSurfer.Drawer);
    currentDrawer.init(
        document.querySelector('#current'),
        webAudio,
        { color: 'rgba(0,100,150,0.7)' }

    );
    currentDrawer.loop(webAudio.waveform,0);



    /* Load handler. */
    //fix this so that we don't have to wait for the entire file to load before drawing begins 
    // draw + load at the same time!
    var loadAudio = function (data) {

        //fix some glitches w loading while playing

        webAudio.loadData(data, function () {
            cachedDrawer.drawBuffer(webAudio.currentBuffer);

            waveDrawer.cursorStep=cachedDrawer.cursorStep;
            console.log(waveDrawer.cursorStep);
            waveDrawer.xx=-cachedDrawer.cursorStep;
            waveDrawer.drawContinuous(cachedDrawer.canvasArray);
            waveDrawer.loop(0, cachedDrawer.canvasArray);


        });
    };


    /* Load file via Ajax. */
    //var audioUrl = 'http://geo-samples.beatport.com//lofi//3366181.LOFI.mp3';
    var audioUrl= 'http://geo-samples.beatport.com//lofi//3125686.LOFI.mp3';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () { loadAudio(this.response); };
    xhr.open('GET', audioUrl, true);
    xhr.send();


    /* Load file via drag'n'drop. */
    var reader = new globals.FileReader();
    reader.addEventListener('load', function (e) {
        console.log('file dropped');
        loadAudio(e.target.result);
    }, false);


    document.addEventListener('drop', function (e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        file && reader.readAsArrayBuffer(file);
    }, false);


    /* Play/pause on spacebar. */
    document.addEventListener('keypress', function (e) {
        if (32 === e.keyCode) { // spacebar
            e.preventDefault();
            webAudio.paused ? webAudio.play() : webAudio.pause();
        }
    }, false);

    /* Exports */
    exports.webAudio = webAudio;
}