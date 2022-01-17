function() {
        var self = this;
        
        this.$modal = $.make('div', { className: 'NB-modal-intro NB-modal' }, [
            $.make('div', { className: 'NB-modal-page' }),
            $.make('span', { className: 'NB-modal-loading NB-spinner'}),
            $.make('h2', { className: 'NB-modal-title' }, 'Welcome to NewsBlur'),
            $.make('img', { className: 'NB-intro-spinning-logo', src: NEWSBLUR.Globals.MEDIA_URL + 'img/logo_512.png' }),
            $.make('div', { className: 'NB-page NB-page-1' }, [
                $.make('h4', { className: 'NB-page-1-started' }, "So much time and so little to do. Strike that! Reverse it.")
            ]),
            $.make('div', { className: 'NB-page NB-page-2 carousel' }, [
                $.make('div', { className: 'carousel-inner NB-intro-imports' }, [
                    $.make('div', { className: 'item NB-intro-imports-start' }, [
                        $.make('h4', { className: 'NB-page-2-started' }, "Let's get some sites to read."),
                        $.make('div', { className: 'NB-intro-import NB-intro-import-google' }, [
                            $.make('h3', [
                                'Import from', 
                                $.make('br'), 
                                $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + 'img/reader/google-reader-logo.gif' })
                            ]),
                            $.make('a', { href: NEWSBLUR.URLs['google-reader-authorize'], className: 'NB-google-reader-oauth NB-modal-submit-green NB-modal-submit-button' }, [
                                'Connect to Google'
                            ]),
                            $.make('div', { className: 'NB-error' })
                        ]),
                        $.make('div', { className: 'NB-intro-import NB-intro-import-opml' }, [
                            $.make('h3', ['Upload an', $.make('br'), 'OPML file']),
                            $.make('form', { method: 'post', enctype: 'multipart/form-data', className: 'NB-opml-upload-form' }, [
                                $.make('div', { href: '#', className: 'NB-intro-upload-opml NB-modal-submit-green NB-modal-submit-button' }, [
                                    'Upload OPML File',
                                    $.make('input', { type: 'file', name: 'file', id: 'NB-intro-upload-opml-button', className: 'NB-intro-upload-opml-button' })
                                ])
                            ]),
                            $.make('div', { className: 'NB-error' })
                        ])
                    ]),
                    $.make('div', { className: 'item NB-intro-imports-progress' }, [
                        $.make('h4', { className: 'NB-page-2-started' }, "Importing your sites..."),
                        $.make('div', { className: 'NB-loading' })
                    ]),
                    $.make('div', { className: 'item NB-intro-imports-sites' }, [
                        $.make('h4'),
                        $.make('div', { className: 'NB-intro-import-restart NB-modal-submit-grey NB-modal-submit-button' }, [
                            '&laquo; Restart and re-import your sites'
                        ])
                    ])
                ]),
                $.make('div', { className: 'NB-intro-bookmarklet NB-intro-section' }, [
                    NEWSBLUR.generate_bookmarklet(),
                    $.make('div', { className: 'NB-intro-bookmarklet-arrow' }, '&larr;'),
                    $.make('div', { className: 'NB-intro-bookmarklet-info' }, 'Install the bookmarklet')
                ])
            ]),
            $.make('div', { className: 'NB-page NB-page-3' }, [
                $.make('h4', { className: 'NB-page-3-started' }, "Connect with friends"),
                $.make('div', { className: 'NB-intro-services' })
            ]),
            $.make('div', { className: 'NB-page NB-page-4' }, [
                $.make('h4', { className: 'NB-page-4-started' }, "Keep up-to-date with NewsBlur"),
                $.make('div', { className: 'NB-intro-section' }, [
                    $.make('div', { className: 'NB-intro-uptodate-follow NB-intro-uptodate-follow-twitter NB-right' }, [
                        $.make('input', { type: 'checkbox', id: 'NB-intro-uptodate-follow-newsblur' }),
                        $.make('label', { 'for': 'NB-intro-uptodate-follow-newsblur' }, [
                            $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + 'img/reader/new-window-icon.png', className: 'NB-intro-uptodate-newwindow' }),
                            $.make('img', { src: 'http://a0.twimg.com/profile_images/1268996309/logo_128_normal.png', style: 'border-color: #505050;' }),
                            $.make('span', [
                                'Follow @newsblur on', 
                                $.make('br'), 
                                $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + 'img/reader/twitter_icon.png' }),
                                'Twitter'
                            ])
                        ])
                    ]),
                    $.make('div', { className: 'NB-intro-uptodate-follow NB-intro-uptodate-follow-twitter' }, [
                        $.make('input', { type: 'checkbox', id: 'NB-intro-uptodate-follow-samuelclay' }),
                        $.make('label', { 'for': 'NB-intro-uptodate-follow-samuelclay' }, [
                            $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + 'img/reader/new-window-icon.png', className: 'NB-intro-uptodate-newwindow' }),
                            $.make('img', { src: 'http://a0.twimg.com/profile_images/1382021023/Campeche_Steps_normal.jpg', style: 'border-color: #505050;' }),
                            $.make('span', [
                                'Follow @samuelclay on', 
                                $.make('br'), 
                                $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + 'img/reader/twitter_icon.png' }),
                                'Twitter'
                            ])
                        ])
                    ])
                ]),
                $.make('div', { className: 'NB-intro-section' }, [
                    $.make('div', { className: 'NB-intro-uptodate-follow NB-right' }, [
                        $.make('input', { type: 'checkbox', id: 'NB-intro-uptodate-follow-popular' }),
                        $.make('label', { 'for': 'NB-intro-uptodate-follow-popular' }, [
                            $.make('span', [
                                'Subscribe to', 
                                $.make('br'), 
                                $.make('img', { src: '/media/img/favicon.png' }),
                                'Popular Shared Stories'
                            ])
                        ])
                    ]),
                    $.make('div', { className: 'NB-intro-uptodate-follow' }, [
                        $.make('input', { type: 'checkbox', id: 'NB-intro-uptodate-follow-blog' }),
                        $.make('label', { 'for': 'NB-intro-uptodate-follow-blog' }, [
                            $.make('span', [
                                'Subscribe to', 
                                $.make('br'), 
                                $.make('img', { src: '/media/img/favicon.png' }),
                                'The NewsBlur Blog'
                            ])
                        ])
                    ])
                ]),
                $.make('div', { className: 'NB-intro-section' }, [
                    "You're ready to go! Hope you enjoy NewsBlur."
                ])
            ]),
            $.make('div', { className: 'NB-modal-submit' }, [
              $.make('div', { className: 'NB-page-next NB-modal-submit-button NB-modal-submit-green NB-modal-submit-save' }, [
                $.make('span', { className: 'NB-tutorial-next-page-text' }, "Let's Get Started "),
                $.make('span', { className: 'NB-raquo' }, '&raquo;')
              ])
            ])
        ]);
        
        $('.carousel', this.$modal).carousel({});
    }