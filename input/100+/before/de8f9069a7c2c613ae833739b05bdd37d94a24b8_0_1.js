function(root) {
            var deferred;
            var data = this.history.getState().data;
            if (data.player_id !== undefined) {
                root = $(root);
                // Discard any running poll.
                this.poll_discard(root);
                // Clear all queues.
                this.clear_queues(root);
                // Wipe out the DOM structure and re-create it from a clean copy.
                var dom_clone = root.data('dom_clone');
                root.empty();
                root.append(dom_clone);
                // Re-init cardstories.
                deferred = this.load_game(data.player_id, data.game_id, data.options, root);
            } else {
                deferred = $.Deferred().resolve();
            }

            return deferred;
        }