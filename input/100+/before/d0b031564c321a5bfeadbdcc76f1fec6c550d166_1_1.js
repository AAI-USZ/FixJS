function (msg, from) {
            woh.log('enter stage [drama] with msg ' + msg);
            woh.show(woh.els.drama);
            this.msg = msg;
            var captionPlayer = new woh.CaptionPlayer();
            for (var i = 0; i < msg.length; i ++) {
                var caption = new woh.Caption(msg[i]);
                captionPlayer.add(caption);
            }
            captionPlayer.play();
            this.actTime = captionPlayer.totalTime / 1000;
        }