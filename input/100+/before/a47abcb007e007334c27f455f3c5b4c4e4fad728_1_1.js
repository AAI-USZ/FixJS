function(e) {
                    var href = $(this).attr('href');
                    if (href.indexOf('#') == 0) {
                        e.preventDefault();
                        var $footnote = $('a[name='+href.substr(1)+'], [id='+href.substr(1)+']',
                                          $iframe_contents);
                        NEWSBLUR.log(['Footnote', $footnote, href, href.substr(1)]);
                        $iframe_contents.scrollTo($footnote, { 
                            duration: 600,
                            axis: 'y', 
                            easing: 'easeInOutQuint', 
                            offset: 0, 
                            queue: false 
                        });
                        return false;
                    }
                    this.taskbar_show_return_to_page();
                }