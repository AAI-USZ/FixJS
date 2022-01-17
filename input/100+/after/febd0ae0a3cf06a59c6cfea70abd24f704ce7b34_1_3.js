function(data) {
        $('.NB-error', this.$modal).remove();
        if (data.error) {
            var $error = $.make('div', { className: 'NB-error' }, [
                $.make('span', { className: 'NB-raquo' }, '&raquo; '),
                data.error
            ]).css({'opacity': 0});
            $('.NB-intro-services', this.$modal).append($error);
            $error.animate({'opacity': 1}, {'duration': 1000});
            this.resize();
            _gaq.push(['_trackEvent', 'reader_intro', 'Connect to ' + this.service.name + ' error']);
        } else {
            this.fetch_friends();
            _gaq.push(['_trackEvent', 'reader_intro', 'Connect to ' + this.service.name + ' success']);
        }
        NEWSBLUR.assets.preference('has_found_friends', true);
        NEWSBLUR.reader.check_hide_getting_started();
    }