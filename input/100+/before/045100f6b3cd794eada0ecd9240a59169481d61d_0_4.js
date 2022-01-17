function(view, skip_save_type) {
            // NEWSBLUR.log(['switch_taskbar_view', view, skip_save_type]);
            var self = this;
            var $story_pane = this.$s.$story_pane;
            var feed = this.model.get_feed(this.active_feed);
            
            if (view == 'page' && feed && feed.get('has_exception') && feed.get('exception_type') == 'page') {
              this.open_feed_exception_modal();
              return;
            } else if (_.contains(['page', 'story'], view) && feed && feed.get('disabled_page')) {
                view = 'feed';
            } else if ($('.task_button_view.task_view_'+view).hasClass('NB-disabled')) {
                return;
            }
            // NEWSBLUR.log(['$button', $button, this.flags['page_view_showing_feed_view'], $button.hasClass('NB-active'), skip_save_type]);
            var $taskbar_buttons = $('.NB-taskbar .task_button_view');
            var $feed_view = this.$s.$feed_view;
            var $feed_iframe = this.$s.$feed_iframe;
            var $page_to_feed_arrow = $('.NB-taskbar .NB-task-view-page-to-feed-arrow');
            var $feed_to_story_arrow = $('.NB-taskbar .NB-task-view-feed-to-story-arrow');
            
            if (!skip_save_type && this.story_view != view) {
                this.model.view_setting(this.active_feed, {'view': view});
            }
            
            $page_to_feed_arrow.hide();
            $feed_to_story_arrow.hide();
            this.flags['page_view_showing_feed_view'] = false;
            if (skip_save_type == 'page') {
                $page_to_feed_arrow.show();
                this.flags['page_view_showing_feed_view'] = true;
            } else if (skip_save_type == 'story') {
                $feed_to_story_arrow.show();
                this.flags['feed_view_showing_story_view'] = true;
            } else {
                $taskbar_buttons.removeClass('NB-active');
                $('.task_button_view.task_view_'+view).addClass('NB-active');
                this.story_view = view;
            }
            
            this.flags.scrolling_by_selecting_story_title = true;
            clearInterval(this.locks.scrolling);
            this.locks.scrolling = setTimeout(function() {
                self.flags.scrolling_by_selecting_story_title = false;
            }, 550);
            if (view == 'page') {
                NEWSBLUR.log(["iframe_prevented_from_loading", this.flags['iframe_prevented_from_loading']]);
                if (this.flags['iframe_prevented_from_loading']) {
                    NEWSBLUR.app.original_tab_view.load_feed_iframe();
                }
                NEWSBLUR.app.original_tab_view.scroll_to_selected_story(this.active_story, {immediate: true});
                
                $story_pane.animate({
                    'left': 0
                }, {
                    'easing': 'easeInOutQuint',
                    'duration': this.model.preference('animations') ? 550 : 0,
                    'queue': false
                });
            } else if (view == 'feed') {
                NEWSBLUR.app.story_list.scroll_to_selected_story(this.active_story, {immediate: true});
                NEWSBLUR.app.story_list.show_stories_preference_in_feed_view();
                
                $story_pane.animate({
                    'left': -1 * $feed_iframe.width()
                }, {
                    'easing': 'easeInOutQuint',
                    'duration': this.model.preference('animations') ? 550 : 0,
                    'queue': false
                });
                
                NEWSBLUR.app.story_list.reset_story_positions();
            } else if (view == 'story') {
                $story_pane.animate({
                    'left': -2 * $feed_iframe.width()
                }, {
                    'easing': 'easeInOutQuint',
                    'duration': this.model.preference('animations') ? 550 : 0,
                    'queue': false
                });
                NEWSBLUR.app.story_tab_view.load_story_iframe();
                if (!this.active_story) {
                    this.show_next_story(1);
                }
            }
            
            this.setup_mousemove_on_views();
        }