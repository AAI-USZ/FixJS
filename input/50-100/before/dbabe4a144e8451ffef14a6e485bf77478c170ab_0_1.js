function(alternative) {
            var $playlist;
            if (alternative) {
                self.play(alternative);
                
                /* Update the model linked to the view so the 
                   alternative is dragged instead of the unplayable video */

                alternative.createListView();
                $playlist = video.listView.parents('.tracklist');
                if ($playlist.length) {
                    alternative.createAlternativeContextMenuButton(video, $playlist.data('model'));
                }

                if (video.listView) {
                    video.listView.data('model', alternative);
                }
            } else {
                self.next();
            }
        }