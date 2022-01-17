function() {
        var self = this;
        
        this.$modal = $.make('div', { className: 'NB-modal-tutorial NB-modal' }, [
            $.make('span', { className: 'NB-modal-loading NB-spinner'}),
            $.make('div', { className: 'NB-modal-page' }),
            $.make('h2', { className: 'NB-modal-title' }),
            $.make('div', { className: 'NB-page NB-page-1' }, [
              $.make('h4', 'NewsBlur is a visual feed reader with intelligence.'),
              $.make('div', 'You\'ll figure out much of NewsBlur by playing around and trying things out. This tutorial is here to quickly offer a foundation.'),
              $.make('h4', 'This tutorial covers:'),
              $.make('ul', [
                $.make('li', [
                  $.make('div', { className: 'NB-right' }, 'Page 2'),
                  'Using the three views (Original, Feed, and Story)'
                ]),
                $.make('li', [
                  $.make('div', { className: 'NB-right' }, 'Page 3'),
                  'Training and filtering stories'
                ]),
                $.make('li', [
                  $.make('div', { className: 'NB-right' }, 'Page 4'),
                  'Tips and tricks that may not be obvious'
                ]),
                $.make('li', [
                  $.make('div', { className: 'NB-right' }, 'Page 5'),
                  'Feedback, open source, the blog, and twitter'
                ])
              ]),
              $.make('h4', 'Why you should use NewsBlur:'),
              $.make('ul', [
                $.make('li', [
                  'This is a free service that is always getting better.'
                ]),
                $.make('li', [
                  'See the original site and read stories as the author intended.'
                ]),
                $.make('li', [
                  'Spend less time as NewsBlur filters the stories for you.'
                ])
              ])
            ]),
            $.make('div', { className: 'NB-page NB-page-2' }, [
              $.make('h4', 'Read your sites with three different views:'),
              $.make('div', { className: 'NB-tutorial-view' }, [
                $.make('div', { className: 'NB-tutorial-view-title' }, [
                  $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/application_view_tile.png' }),
                  'Original'
                ]),
                $.make('img', { className: 'NB-tutorial-view-image', src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/tutorial_view_original.png' }),
                $.make('span', 'The site itself.')
              ]),
              $.make('div', { className: 'NB-tutorial-view' }, [
                $.make('div', { className: 'NB-tutorial-view-title' }, [
                  $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/application_view_list.png' }),
                  'Feed'
                ]),
                $.make('img', { className: 'NB-tutorial-view-image', src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/tutorial_view_feed.png' }),
                $.make('span', 'All feed stories.')
              ]),
              $.make('div', { className: 'NB-tutorial-view' }, [
                $.make('div', { className: 'NB-tutorial-view-title' }, [
                  $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/application_view_gallery.png' }),
                  'Story'
                ]),
                $.make('img', { className: 'NB-tutorial-view-image', src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/tutorial_view_story.png' }),
                $.make('span', 'Story click-through.')
              ]),
              $.make('ul', [
                $.make('li', [
                  'The view you choose is saved per-site, so you can mix-and-match.'
                ]),
                $.make('li', [
                  'Double-click story titles to temporarily open a story in the Story view.'
                ]),
                $.make('li', [
                  'In the Original view, if a story is not found, it will temporarily open in the Feed view.'
                ]),
                $.make('li', [
                  'Much about these views can be customized under Preferences.'
                ])
              ])
            ]),
            $.make('div', { className: 'NB-page NB-page-3' }, [
              $.make('h4', 'NewsBlur works best when you use intelligence classifiers.'),
              $.make('ul', [
                $.make('li', { className: 'NB-tutorial-train-1' }, [
                  $.make('b', 'First: Train stories and sites.'),
                  $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/tutorial_train_feed.png' }),
                  $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/tutorial_train_story.png' })
                ]),
                $.make('li', [
                  $.make('b', 'Second: The intelligence slider filters stories based on training.'),
                  $.make('div', { className: 'NB-tutorial-stories', id: 'story_titles' }),
                  $.make('img', { className: 'NB-trainer-bullet', src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_green.png'}),
                  ' are stories you like',
                  $.make('br'),
                  $.make('img', { className: 'NB-trainer-bullet', src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_yellow.png'}),
                  ' are stories you have not yet rated',
                  $.make('br'),
                  $.make('img', { className: 'NB-trainer-bullet', src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_red.png'}),
                  ' are stories you don\'t like',
                  $.make('div', { className: 'NB-taskbar-intelligence' }, [
                    $.make('div', { className: 'NB-tutorial-slider' }),
                    $.make('div', { className: 'NB-intelligence-slider' }, [
                        $.make('ul', { className: 'segmented-control' }, [
                            $.make('li', { className: 'NB-intelligence-slider-control NB-intelligence-slider-red' }, [
                                $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_red.png' }),
                                $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_yellow.png' }),
                                $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_green.png' })
                            ]),
                            $.make('li', { className: 'NB-intelligence-slider-control NB-intelligence-slider-yellow' }, [
                                $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_yellow.png' }),
                                $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_green.png' })
                            ]),
                            $.make('li', { className: 'NB-intelligence-slider-control NB-intelligence-slider-green' }, [
                                $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/icons/silk/bullet_green.png' })
                            ])
                        ])
                    ])
                  ])
                ])
              ])
            ]),
            $.make('div', { className: 'NB-page NB-page-4' }, [
              $.make('h4', 'Here are a few tricks that may enhance your experience:'),
              $.make('ul', [
                $.make('li', { className: 'NB-tutorial-tips-sites' }, [
                  $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/tutorial_tips_sites.png' }),
                  $.make('div', [
                    'Click on the sites count at the top of the sidebar to hide sites with no unread stories.'
                  ])
                ]),
                $.make('li', [
                  $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/tutorial_tips_instafetch.png' }),
                  'Instantly refresh a site by right-clicking on it and selecting ',
                  $.make('b', 'Insta-fetch stories.')
                ]),
                $.make('li', [
                  $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/tutorial_tips_stories.png' }),
                  'Click the arrow next to sites and stories to open up a menu.'
                ]),
                $.make('li', { className: 'NB-tutorial-tips-train' }, [
                  $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/tutorial_tips_train.png' }),
                  $.make('div', 'Train sites in the Feed view by clicking directly on the tags and authors. The tags will rotate color between like and dislike.')
                ]),
                $.make('li', [
                  $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL + '/img/reader/tutorial_tips_folders.png' }),
                  'Folders can be nested inside folders.'
                ]),
                $.make('li', [
                  'There are more than a dozen keyboard shortcuts you can use:',
                  $.make('div', { className: 'NB-modal-keyboard' }, [
                    $.make('div', { className: 'NB-keyboard-group' }, [
                      $.make('div', { className: 'NB-keyboard-shortcut' }, [
                        $.make('div', { className: 'NB-keyboard-shortcut-explanation' }, 'Next story'),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            '&#x2193;'
                        ]),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            'j'
                        ])
                      ]),
                      $.make('div', { className: 'NB-keyboard-shortcut NB-last' }, [
                        $.make('div', { className: 'NB-keyboard-shortcut-explanation' }, 'Previous story'),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            '&#x2191;'
                        ]),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            'k'
                        ])
                      ])
                    ]),
                    $.make('div', { className: 'NB-keyboard-group' }, [
                      $.make('div', { className: 'NB-keyboard-shortcut' }, [
                        $.make('div', { className: 'NB-keyboard-shortcut-explanation' }, 'Next site'),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            'shift',
                            $.make('span', '+'),
                            '&#x2193;'
                        ])
                      ]),
                      $.make('div', { className: 'NB-keyboard-shortcut NB-last' }, [
                        $.make('div', { className: 'NB-keyboard-shortcut-explanation' }, 'Prev. site'),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            'shift',
                            $.make('span', '+'),
                            '&#x2191;'
                        ])
                      ])
                    ]),
                    $.make('div', { className: 'NB-keyboard-group' }, [              
                      $.make('div', { className: 'NB-keyboard-shortcut' }, [
                        $.make('div', { className: 'NB-keyboard-shortcut-explanation' }, 'Switch views'),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            '&#x2190;'
                        ]),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            '&#x2192;'
                        ])
                      ]),        
                      $.make('div', { className: 'NB-keyboard-shortcut NB-last' }, [
                        $.make('div', { className: 'NB-keyboard-shortcut-explanation' }, 'Open Site'),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            'enter'
                        ])
                      ])
                    ]),
                    $.make('div', { className: 'NB-keyboard-group' }, [
                      $.make('div', { className: 'NB-keyboard-shortcut' }, [
                        $.make('div', { className: 'NB-keyboard-shortcut-explanation' }, 'Page down'),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            'space'
                        ])
                      ]),
                      $.make('div', { className: 'NB-keyboard-shortcut NB-last' }, [
                        $.make('div', { className: 'NB-keyboard-shortcut-explanation' }, 'Page up'),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            'shift',
                            $.make('span', '+'),
                            'space'
                        ])
                      ])
                    ]),
                    $.make('div', { className: 'NB-keyboard-group' }, [
                      $.make('div', { className: 'NB-keyboard-shortcut' }, [
                        $.make('div', { className: 'NB-keyboard-shortcut-explanation' }, 'Next Unread Story'),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            'n'
                        ])
                      ]),
                      $.make('div', { className: 'NB-keyboard-shortcut NB-last' }, [
                        $.make('div', { className: 'NB-keyboard-shortcut-explanation' }, 'Hide Sidebar'),
                        $.make('div', { className: 'NB-keyboard-shortcut-key' }, [
                            'u'
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ]),
            $.make('div', { className: 'NB-page NB-page-5' }, [
              $.make('h4', 'Stay connected to NewsBlur on Twitter'),
              $.make('div', { className: 'NB-tutorial-twitter' }, [
                $.make('a', { className: 'NB-splash-link', href: 'http://twitter.com/samuelclay', target: '_blank' }, [
                  $.make('img', { src: 'http://a0.twimg.com/profile_images/1382021023/Campeche_Steps_normal.jpg', style: 'border-color: #505050;' }),
                  $.make('span', '@samuelclay')
                ]),
                $.make('a', { className: 'NB-splash-link', href: 'http://twitter.com/newsblur', target: '_blank' }, [
                  $.make('img', { src: 'http://a0.twimg.com/profile_images/1268996309/logo_128_normal.png' }),
                  $.make('span', '@newsblur')
                ])
              ]),
              $.make('h4', { className: 'NB-tutorial-feedback-header' }, 'Community Feedback'),
              $.make('ul', [
                $.make('li', [
                  $.make('a', { href: 'http://getsatisfaction.com/newsblur', className: 'NB-splash-link' }, [
                    'NewsBlur on ',
                    $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL+'/img/reader/getsatisfaction.png', style: 'vertical-align: middle;margin: -2px 0 0' }),
                    ' Get Satisfaction'
                  ])
                ])
              ]),
              $.make('h4', { className: 'NB-tutorial-feedback-header' }, [
                'Open Source Code'
              ]),
              $.make('ul', [
                $.make('li', [
                  $.make('a', { href: 'http://github.com/samuelclay', className: 'NB-splash-link' }, [
                    $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL+'/img/reader/howitworks_github.png', style: 'float: right;margin: -68px 12px 0 0' }),
                    'NewsBlur on ',
                    $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL+'/img/reader/github_icon.png', style: 'vertical-align: middle;margin: -2px 0 0' }),
                    ' GitHub'
                  ])
                ])
              ]),
              $.make('h4', { className: 'NB-tutorial-feedback-header' }, 'The NewsBlur Blog'),
              $.make('ul', [
                $.make('li', [
                  $.make('div', { className: 'NB-modal-submit-button NB-modal-submit-green NB-javascript NB-tutorial-finish-newsblur-blog', style: 'float: right;margin-top: -2px' }, [
                    'Finish Tutorial and Load',
                    $.make('img', { src: NEWSBLUR.Globals.MEDIA_URL+'/img/favicon.png', style: "margin: -3px 0px 0px 4px; vertical-align: middle;" }),
                    ' the NewsBlur Blog ',
                    $.make('span', { className: 'NB-raquo' }, '&raquo;')
                  ]),
                  'Monthly updates.'
                ])
              ])
            ]),
            $.make('div', { className: 'NB-modal-submit' }, [
              $.make('div', { className: 'NB-page-next NB-modal-submit-button NB-modal-submit-green NB-modal-submit-save' }, [
                $.make('span', { className: 'NB-tutorial-next-page-text' }, 'Next Page '),
                $.make('span', { className: 'NB-raquo' }, '&raquo;')
              ]),
              $.make('div', { className: 'NB-page-previous NB-modal-submit-button NB-modal-submit-grey NB-modal-submit-save' }, [
                $.make('span', { className: 'NB-raquo' }, '&laquo;'),
                ' Previous Page'
              ])
            ])
        ]);
    }