function () {
                        $('#page-inner').css('left', 0);
                        window.location.hash = '#' + next + '/1';
                        $('#page-inner,#footer').anim({opacity:1},.6,'ease-in');
                    }