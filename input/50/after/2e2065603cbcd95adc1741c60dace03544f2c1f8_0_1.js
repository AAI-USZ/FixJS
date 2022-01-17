function(next_game_id, next_game_opts) {
                        $this.poll_discard(root);
                        $.cardstories_tabs.remove_tab_for_game(game.id, player_id, root, function() {
                            $this.reload(player_id, next_game_id, next_game_opts, root);
                        });
                    }