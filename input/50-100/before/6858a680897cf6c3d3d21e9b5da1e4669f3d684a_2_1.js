function(html, data)
        {
            console.log(this.page)
            $(".navbar a.user").fancybox();
            if (typeof(data) === 'object') {
                var template = Handlebars.compile(html);
                html = template(data);
            }

            this.content.html(html);
            this.page.removeClass('hidden');
        }