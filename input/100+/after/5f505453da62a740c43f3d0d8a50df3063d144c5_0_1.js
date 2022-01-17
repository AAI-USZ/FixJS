function(str) {
        var matcher = {
                yahoo: {
                    regex: /(https?:\/\/)?[^\/]*(youtube.com|youtu.be)\/(embed\/|.*v=)?([^\/&]*)/,
                    prefix: 'http://www.youtube.com/embed/',
                    postfix: ''
                },
                vimeo: {
                    regex: /(https?:\/\/)?[^\/]*vimeo.com\/(video\/)?([^\/&]*)/,
                    prefix: 'http://player.vimeo.com/video/',
                    postfix: '?title=0&byline=0&portrait=0'
                },
                dailymotion: {
                    regex: /(https?:\/\/)?[^\/]*dailymotion.com\/(.*#)?video[\/=]([^\/&]*)/,
                    prefix: 'http://www.dailymotion.com/embed/video/',
                    postfix: ''
                }
            },
            service,
            serviceopts,
            matches,
            videoid,
            url = '';
        for (service in matcher) {
            serviceopts = matcher[service];
            matches = str ? str.match(serviceopts.regex) : [];
            if (matches && matches.length === 4) {
                videoid = matches[3];
                url = serviceopts.prefix + videoid + serviceopts.postfix;
                break;
            }
        }
        return url;
    }