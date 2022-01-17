function(data) {
            var message = data && data.message || "Sorry, this reply could not be posted. Probably a bug.";
            if (!NEWSBLUR.Globals.is_authenticated) {
                message = "You need to be logged in to reply to a comment.";
            }
            var $error = $.make('div', { className: 'NB-error' }, message);
            $submit.removeClass('NB-disabled').text('Post');
            $form.find('.NB-error').remove();
            $form.append($error);
            if (NEWSBLUR.app.story_list) {
                NEWSBLUR.app.story_list.fetch_story_locations_in_feed_view();
            }
        }