function () {
            log('observationFormLayoutView._showEmbeddedVideo');
            var embeddedVideo = new EmbeddedVideoView({ el: $('#modal-dialog'), model: new EmbeddedVideo()});
            embeddedVideo.render();
        }