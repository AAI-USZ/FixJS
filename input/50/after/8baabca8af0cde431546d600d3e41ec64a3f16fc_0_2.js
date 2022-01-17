function(data) {
                currentPage.captions[slug] = data;
                callback();
                $('#page-inner,#footer').anim({opacity:1},.6,'ease-in');
            }