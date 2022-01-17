function () {

            var isMuted = volumeSlider.toggleMute();

            var title = isMuted ? 'Unmute' : 'Mute';

            $(this).attr('title', title);

        }