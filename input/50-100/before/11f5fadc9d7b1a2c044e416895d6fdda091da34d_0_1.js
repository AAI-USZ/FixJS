function(story) {
            var visible = story.score() >= score;
            var same_story = include_active_story && story.id == active_story_id;
            var read = !!story.get('read_status');
            
            return visible && (!read || same_story);
        }