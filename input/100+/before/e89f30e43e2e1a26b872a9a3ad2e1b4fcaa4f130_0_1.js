function(player_id, game, root) {
            var $this = this;
            var state = $(root).data('cardstories_state');
            var existing_players = state && state.game && state.game.players || [];
            var element = $('.cardstories_invitation .cardstories_owner', root);
            this.set_active('invitation_owner', element, root, game);
            this.display_progress_bar('owner', 3, element, root);
            this.display_master_info($this.get_master_info(game), element);
            this.init_board_buttons(player_id, element, root);
            $('.cardstories_sentence', element).text(game.sentence);
            var picked_card = $('.cardstories_picked_card', element);
            var src = picked_card.metadata({type: 'attr', name: 'data'}).card.supplant({card: game.winner_card});
            picked_card.find('.cardstories_card_foreground').attr('src', src);
            var go_vote = $('.cardstories_go_vote', element);

            // Immediately display seats for players who have already joined the game previously.
            this.existing_players_show_helper(existing_players, game, element, root);

            // Bind countdown select.
            $('.cardstories_countdown_select', go_vote).unbind('change').change(function() {
                $this.send_countdown_duration($(this).val(), player_id, game.id, root);
            });

            // Bind go vote button, if possible.
            if (game.ready) {
                $('.cardstories_modal_button', go_vote).unbind('click').click(function() {
                    $this.animate_scale(true, 5, 300, go_vote, function() {
                        $this.invitation_owner_go_vote_confirm(player_id, game, element, root);
                    });
                });
            }

            var deferred = $.Deferred();
            var q = $this.create_queue(root);

            // Display the advertise modal.
            $(root).queue(q, function(next) {
                $this.advertise(player_id, game.id, element, root);
                next();
            });

            // Then the invite friend buttons.
            $(root).queue(q, function(next) {
                $this.invitation_owner_slots_helper($('.cardstories_player_invite', element), player_id, game.id, element, root, next);
            });

            // Show players joining and picking cards.
            $(root).queue(q, function(next) {
                $this.invitation_owner_join_helper(player_id, game, element, root, next);
            });

            // Resolve deferred.
            $(root).queue(q, function(next) {
                deferred.resolve();
            });

            $(root).dequeue(q);

            return deferred;
        }