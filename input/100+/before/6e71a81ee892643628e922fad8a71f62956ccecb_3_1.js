function toggleSounds() {

            if (supports_html5_storage() == true) {

                localStorage['jenkinsSoundsEnabled'] = !soundsEnabled();

            }

            else {

                cachedSoundsEnabled = !cachedSoundsEnabled;

            }



            if (soundsEnabled()) {

                soundModule.playJobStarted();

            }

        }