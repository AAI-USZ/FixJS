function(e) {
        var $button = $(e.currentTarget);
        var $next = $('.NB-page-controls-text-next', $button);
        var $loading = $('.NB-page-controls-text-loading', $button);
        var $loaded = $('.NB-page-controls-text-loaded', $button);
        var height = this.$('.NB-page-controls').height();
        var innerheight = $button.height();
        
        $loading.text('Loading...').css('bottom', height).animate({'bottom': innerheight}, {
            'duration': 500,
            'easing': 'easeInOutQuint',
            'queue': false
        });
        $next.animate({'bottom': -1 * innerheight}, {
            'duration': 500,
            'easing': 'easeInOutQuint',
            'queue': false
        });
        $button.addClass('NB-loading');
        
        $button.animate({'backgroundColor': '#5C89C9'}, 650)
               .animate({'backgroundColor': '#2B478C'}, 900);
        this.feed_stories_loading = setInterval(function() {
            $button.animate({'backgroundColor': '#5C89C9'}, {'duration': 650})
                   .animate({'backgroundColor': '#2B478C'}, 900);
        }, 1550);
        
        this.page += 1;
        
        $.ajax({
            url: '/',
            method: 'GET',
            data: {
                'page': this.page,
                'format': 'html'
            },
            success: _.bind(this.post_next_page, this)
        });
    }