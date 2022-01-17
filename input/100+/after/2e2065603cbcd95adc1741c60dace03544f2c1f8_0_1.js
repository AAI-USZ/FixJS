function(next_owner_id) {
                $('.cardstories_next_game_author', element).css('display', 'none');
                $('.cardstories_next_game_player', element).css('display', 'none');
                var modal_visible = modal.is(':visible');

                // If the new next owner is the current player, we want him to click on the
                // "continue" button again to avoid brutally switching to a new game creation
                // without explanation.
                if (next_owner_id === player_id) {
                    var q = $this.create_queue(root);

                    if (modal_visible) {
                        $(root).queue(q, function(next) {
                            $this.close_modal(modal, overlay, next);
                        });
                    }

                    $(root).queue(q, function(next) {
                        $this.complete_display_next_game(centered || modal_visible, player_id, game, element, root);
                    });

                    $(root).dequeue(q);
                // If the next owner is not the current player simply update the next author name.
                } else {
                    $this.complete_update_next_author_info(next_owner_id, player_id, element);
                }
            }