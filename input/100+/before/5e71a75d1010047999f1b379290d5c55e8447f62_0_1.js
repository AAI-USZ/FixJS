function(feed_id, options) {
            debugger;
            // console.log(["open_social_stories", feed_id, options]);
            options = options || {};
            if (_.isNumber(feed_id)) feed_id = "social:" + feed_id;
            
            var feed = this.model.get_feed(feed_id);
            var $story_titles = this.$s.$story_titles;
            var $social_feed = this.find_social_feed_with_feed_id(feed_id);

            if (!feed && !options.try_feed) {
                // Setup tryfeed views first, then come back here.
                var socialsub = this.model.add_social_feed({
                    id: feed_id,
                    user_id: parseInt(feed_id.replace('social:', ''), 10)
                });
                return this.load_social_feed_in_tryfeed_view(socialsub, options);
            }
            
            this.reset_feed();
            this.hide_splash_page();
            
            this.active_feed = feed.id;
            this.next_feed = feed.id;
            this.flags.river_view = true;
            if (options.story_id) {
                this.flags['select_story_in_feed'] = options.story_id;
            }
            
            this.iframe_scroll = null;
            this.flags['opening_feed'] = true;
            feed.set('selected', true, options);
            this.make_feed_title_in_stories(feed.id);
            this.$s.$body.addClass('NB-view-river');
            this.flags.social_view = true;
            
            this.set_correct_story_view_for_feed(this.active_feed);
            
            // TODO: Only make feed the default for blurblogs, not overriding an explicit pref.
            this.switch_taskbar_view('feed');
            this.setup_mousemove_on_views();
            
            this.hide_stories_error();
            this.show_stories_progress_bar();
            this.model.fetch_social_stories(this.active_feed, 1, 
                _.bind(this.post_open_social_stories, this), this.show_stories_error, true);
            
            if (this.story_view == 'page') {
                _.delay(_.bind(function() {
                    if (!options.delay || feed.id == this.next_feed) {
                        NEWSBLUR.app.original_tab_view.load_feed_iframe();
                    }
                }, this), options.delay || 0);
            } else {
                this.flags['iframe_prevented_from_loading'] = true;
            }

            if (!options.silent && feed.get('feed_title')) {
                var slug = _.string.words(_.string.clean(feed.get('feed_title').replace(/[^a-z0-9\. ]/ig, ''))).join('-').toLowerCase();
                var url = "social/" + feed.get('user_id') + "/" + slug;
                if (!_.string.include(window.location.pathname, url)) {
                    var params = {};
                    if (_.string.include(window.location.pathname, "social/" + feed.get('user_id'))) {
                        params['replace'] = true;
                    }
                    // console.log(["Navigating to social", url, window.location.pathname]);
                    NEWSBLUR.router.navigate(url, params);
                }
            } else if (!feed.get('feed_title')) {
                console.log(["No feed title on social", feed]);
                NEWSBLUR.router.navigate('');
            }
        }