function(text_post_template, photo_post_template, 
                  link_post_template, video_post_template, audio_post_template,
                  quote_post_template) {

            var text_template = Handlebars.compile(text_post_template);
            var photo_template = Handlebars.compile(photo_post_template);
            var link_template = Handlebars.compile(link_post_template);
            var video_template = Handlebars.compile(video_post_template);
            var audio_template = Handlebars.compile(audio_post_template);
            var quote_template = Handlebars.compile(quote_post_template);

            $('.loading').remove();
            $.each(blog_posts.response.posts, function(i, p) {
                p.formated_date = moment(p.date).format('MMMM DD, YYYY')

                if (p.type == 'text')
                    $('#blog-posts').append(text_template(p));
                else if (p.type == 'photo')
                    $('#blog-posts').append(photo_template(p));
                else if (p.type == 'link')
                    $('#blog-posts').append(link_template(p));
                else if (p.type == 'video')
                    $('#blog-posts').append(video_template(p));
                else if (p.type == 'audio')
                    $('#blog-posts').append(audio_template(p));
                else if (p.type == 'quote')
                    $('#blog-posts').append(quote_template(p));

            });

            setupLinks();
            adjustBlogHeaders();
            setTimeout(setupBlogHeaderScroll, 1000);
            adjustSelection('home-link');
         }