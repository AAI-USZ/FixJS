function(feed_id, options) {
            options = options || {};
            var self = this;
            var $story_titles = this.$s.$story_titles;
            var feed = this.model.get_feed(feed_id) || options.feed;
            var temp = feed.get('temp') || !feed.get('subscribed');
            
            if (!feed || (temp && !options.try_feed)) {
                // Setup tryfeed views first, then come back here.
                options.feed = options.feed && options.feed.attributes;
                return this.load_feed_in_tryfeed_view(feed_id, options);
            }

            this.flags['opening_feed'] = true;
            
            if (options.try_feed || feed) {
                this.reset_feed();
                this.hide_splash_page();
                if (options.story_id) {
                    this.flags['select_story_in_feed'] = options.story_id;
                }
            
                this.active_feed = feed.id;
                this.next_feed = feed.id;
                
                feed.set('selected', true, options);
                if (NEWSBLUR.app.story_unread_counter) {
                    NEWSBLUR.app.story_unread_counter.remove();
                }
                
                NEWSBLUR.app.story_titles.show_loading(options);
                this.hide_stories_error();
                // this.show_stories_progress_bar();
                this.iframe_scroll = null;
                this.set_correct_story_view_for_feed(feed.id);
                this.make_feed_title_in_stories(feed.id);
                this.switch_taskbar_view(this.story_view);

                _.delay(_.bind(function() {
                    if (!options.delay || feed.id == self.next_feed) {
                        this.model.load_feed(feed.id, 1, true, $.rescope(this.post_open_feed, this), 
                                             this.show_stories_error);
                    }
                }, this), options.delay || 0);

                if (!this.story_view || this.story_view == 'page') {
                    _.delay(_.bind(function() {
                        if (!options.delay || feed.id == this.next_feed) {
                            NEWSBLUR.app.original_tab_view.load_feed_iframe(feed.id);
                        }
                    }, this), options.delay || 0);
                } else {
                    NEWSBLUR.app.original_tab_view.unload_feed_iframe();
                    this.flags['iframe_prevented_from_loading'] = true;
                }
                this.setup_mousemove_on_views();
                
                if (!options.silent) {
                    var feed_title = feed.get('feed_title') || '';
                    var slug = _.string.words(_.string.clean(feed_title.replace(/[^a-z0-9\. ]/ig, ''))).join('-').toLowerCase();
                    var url = "site/" + feed.id + "/" + slug;
                    if (!_.string.include(window.location.pathname, url)) {
                        // console.log(["Navigating to url", url]);
                        NEWSBLUR.router.navigate(url);
                    }
                }
            }
        }