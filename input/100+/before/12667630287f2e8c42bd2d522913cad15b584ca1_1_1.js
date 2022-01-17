function() {

        var uri = new URI(':', ';', ['rate', 'length', 'seq']);

        // TODO: url 'engine' param: webkit, moz, flash
        //       also: never publish / bookmark this param ? (how?)
        if ((window.AudioContext || window.webkitAudioContext)) {
            console.log('webkit adio api');
            var audioContext = new (window.AudioContext || webkitAudioContext)();
            audioContext.backend = 'webkit';
        } else {
            var audioContext = new mozFlashAudioContext();
        }     

        var audioProcessBlockSize = 2048,
            toneRow = new ToneRow(audioContext, audioProcessBlockSize);

        var patt = window.patt = new Patter({
            minNote: 0,
            maxNote: 46,
            baseFreq: 55,
            octaveDivisions: 12 
        }, uri, toneRow);
        
        $(document).ready(function() {
            var face = window.face = new Face($('body'), patt);
            face.welcomeDialog();
        });
    }