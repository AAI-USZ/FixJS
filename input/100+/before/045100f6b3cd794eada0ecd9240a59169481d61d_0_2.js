function(feed_id, view) {
            var feed = this.model.get_feed(feed_id || this.active_feed);
            var $original_tabs = $('.task_view_page, .task_view_story');
            var $page_tab = $('.task_view_page');
            view = view || this.model.view_setting(feed_id, 'view');

            if (feed && feed.get('disabled_page')) {
                view = 'feed';
                $original_tabs.addClass('NB-disabled-page')
                              .addClass('NB-disabled')
                              .attr('title', 'The original page has been disabled by the publisher.')
                              .tipsy({
                    gravity: 's',
                    fade: true,
                    delayIn: 200
                });
                $original_tabs.each(function() {
                    $(this).tipsy('enable');
                });
            } else if (feed && feed.get('has_exception') && feed.get('exception_type') == 'page') {
                if (view == 'page') {
                    view = 'feed';
                }
                $('.task_view_page').addClass('NB-exception-page');
            } else {
                $original_tabs.removeClass('NB-disabled-page')
                              .removeClass('NB-disabled')
                              .removeClass('NB-exception-page');
                $original_tabs.each(function() {
                    $(this).tipsy('disable');
                });
            }

            if (feed_id == 'starred') {
                $page_tab.addClass('NB-disabled-page').addClass('NB-disabled');
            }

            this.story_view = view;
        }