function(alternative) {
            var $playlist;
            if (alternative) {
                self.play(alternative);
                
                /* Update the model linked to the view so the 
                   alternative is dragged instead of the unplayable video */
                if (video.listView) {
                    alternative.listView = video.listView;
                    $playlist = video.listView.parents('.tracklist');
                    if ($playlist.length) {
                        alternative.createAlternativeContextMenuButton(video, $playlist.data('model'));
                    }
                    video.listView.data('model', alternative);
                }
            } else {
                self.next();
            }
        }