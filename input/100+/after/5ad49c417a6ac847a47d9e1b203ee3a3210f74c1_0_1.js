function() {
        _.bindAll(this, 
            'popcornVideoChangeSourceSeekagift', 
            'popcornVideoChangeSourceRpyg',
            'popcornVideoChangeSourceNinjaSysop',
            'popcornVideoChangeSourceMacadjan',
            'popcornVideoChangeSourceGreenmine',
            'popcornVideoChangeSourcePiweekday'
        );
        this.time;
        if( $('#footnote div').not(':hidden')) {
            this.$('#footnote').hide();
        }
        var pop = Popcorn('#video');
  
        pop.footnote({
            start: Piweek.event_fire01,
            end: Piweek.event_end01,
            text: Piweek.event_text01,
            target: Piweek.event_target01
        }),
        pop.footnote({
            start: Piweek.event_fire02,
            end: Piweek.event_end02,
            text: Piweek.event_text02,
            target: Piweek.event_target02
        }),
        pop.tagthisperson({
            start: Piweek.event_fire01,
            end: Piweek.event_end01,
            person: Piweek.person_name01,
            image: Piweek.person_pic01,
            href: "http://www.kaleidos.net",
            target: Piweek.person_target01
        }),
        pop.tagthisperson({
            start: Piweek.event_fire02,
            end: Piweek.event_end02,
            person: Piweek.person_name02,
            image: Piweek.person_pic02,
            href: "http://www.kaleidos.net",
            target: Piweek.person_target02
        }),
        pop.twitter({
            start: Piweek.event_fire01,
            end: Piweek.event_end01,
            title: Piweek.twitter_title01,
            src: Piweek.twitter_tag01,
            target: Piweek.twitter_src01
        }),
        pop.twitter({
            start: Piweek.event_fire02,
            end: Piweek.event_end02,
            title: Piweek.twitter_title02,
            src: Piweek.twitter_tag02,
            target: Piweek.twitter_src02
        }),
        pop.code({
            start: Piweek.event_fire01,
            end: Piweek.event_fire01 + 3,
            onStart: function( options ) {
                $('#footnote').fadeIn();
                $('#persontag').fadeIn();
                $('#tweeterdiv').fadeIn();
            },
            onEnd: function( options ) {
                $('#footnote').fadeOut();
                $('#persontag').fadeOut();
                $('#tweeterdiv').fadeOut();
            }
        }),
        pop.code({
            start: Piweek.event_fire02,
            end: Piweek.event_fire02 + 3,
            onStart: function( options ) {
                $('#footnote').fadeIn();
                $('#persontag').fadeIn('slow');
                $('#tweeterdiv').fadeIn();
            },
            onEnd: function( options ) {
                $('#footnote').fadeOut();
                $('#persontag').fadeOut('slow');
                $('#tweeterdiv').fadeOut();
            }
        });
    }