function(story) {
            return story.score() < score && !story.get('visible');
        }