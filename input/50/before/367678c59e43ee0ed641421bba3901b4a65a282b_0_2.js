function() {
            if (Capkom.profile.get('useAudio')) {
              return jQuery('.tts', element).ttswidget('talk');
            }
          }