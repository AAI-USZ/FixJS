function(html, data)
        {
            if (typeof(data) === 'object') {
                var template = Handlebars.compile(html);
                html = template(data);

                $('#hidden-data').html($(html));
                $('#hidden-div').attr('href', '#hidden-data').fancybox().click();
            }

            // this.content.html(html);
            // this.page.removeClass('hidden');
        }