function () {

            var isMuted = _volumeSlider.toggleMute();

            var title = isMuted ? 'Unmute' : 'Mute';

            $(this).attr('title', title);

        }