function(template) {
            var $template = $($.trim(template));
            var $header = this.make('div', { 
                "class": 'NB-story-comments-public-header-wrapper' 
            }, this.make('div', { 
                "class": 'NB-story-comments-public-header' 
            }, Inflector.pluralize(' public comment', $('.NB-story-comment', $template).length, true)));

            this.$(".NB-story-comments-public-teaser-wrapper").replaceWith($template);
            $template.before($header);
        }