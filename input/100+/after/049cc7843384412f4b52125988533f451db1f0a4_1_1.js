function() {
        var self = this;
        
        this.$modal = $.make('div', { className: 'NB-modal-classifiers NB-modal NB-modal-trainer'}, [
            $.make('h2', { className: 'NB-modal-title' }, 'Intelligence Trainer'),
            $.make('h3', { className: 'NB-modal-subtitle' }, 'Here\'s what to do:'),
            $.make('ol', { className: 'NB-trainer-points' }, [
                $.make('li', [
                    $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/sample_classifier_tag.png', style: 'float: right;margin-top: 4px;', width: 155, height: 17 }),
                    $.make('b', 'You will see a bunch of tags and authors.'),
                    ' Sites will be ordered by popularity. Click on what you like and don\'t like.'
                ]),
                $.make('li', [
                    $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/intelligence_slider_all.png', style: 'float: right', width: 127, height: 92 }),
                    $.make('b', 'The intelligence slider filters stories.'),
                    $.make('img', { className: 'NB-trainer-bullet', src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_green.png'}),
                    ' are stories you like',
                    $.make('br'),
                    $.make('img', { className: 'NB-trainer-bullet', src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_yellow.png'}),
                    ' are stories you have not yet rated',
                    $.make('br'),
                    $.make('img', { className: 'NB-trainer-bullet', src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_red.png'}),
                    ' are stories you don\'t like'
                ]),
                $.make('li', [
                    // $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/sample_menu.png', style: 'float: right', width: 176, height: 118 }),
                    $.make('b', 'Stop any time you like.'),
                    ' You can always come back to this trainer.'
                ]),
                $.make('li', [
                    $.make('b', 'Don\'t worry if you don\'t know what you like right now.'),
                    ' Just skip the site. You can train directly in the Feed view.'
                ])
            ]),
            (!NEWSBLUR.Globals.is_authenticated && $.make('div', { className: 'NB-trainer-not-authenticated' }, 'Please create an account and add sites you read. Then you can train them.')),
            $.make('div', { className: 'NB-modal-submit' }, [
                (!NEWSBLUR.Globals.is_authenticated && $.make('a', { href: '#', className: 'NB-modal-submit-close NB-modal-submit-button' }, 'Close')),
                (NEWSBLUR.Globals.is_authenticated && $.make('a', { href: '#', className: 'NB-modal-submit-begin NB-modal-submit-button NB-modal-submit-grey NB-disabled' }, 'Loading Training...'))
            ])
        ]);
        
    }