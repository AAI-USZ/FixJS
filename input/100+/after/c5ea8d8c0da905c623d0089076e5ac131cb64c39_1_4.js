function (container, storageId, feedUrl, options) {
        var template;
        options = options || {};

        template = typeof options.template !== "function" ?
            new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");if(_.s(_.f("feed",c,p,1),c,p,0,9,313,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<div class=\"menu detailed\"><h2>");_.b(_.v(_.f("title",c,p,0)));_.b("</h2><ol>");if(_.s(_.f("entries",c,p,1),c,p,0,70,290,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("  <li>    <a class=\"no-ext-ind\" rel=\"external\" href=\"");_.b(_.v(_.f("link",c,p,0)));_.b("\"><span class=\"external\">");_.b(_.v(_.f("title",c,p,0)));_.b("</span>    <div class=\"smallprint light\">");_.b(_.v(_.d("dateTime.date",c,p,0)));_.b("</div>    <div class=\"smallprint light\">");_.b(_.v(_.d("dateTime.time",c,p,0)));_.b("</div></a>");});c.pop();}_.b("</ol></div>");});c.pop();}if(!_.s(_.f("feed",c,p,1),c,p,1,0,0,"")){_.b("<div class=\"content\"><p>Content could not be loaded.</p></div>");};return _.fl();;}) :
            new Hogan.Template(options.template);
    
        if (! navigator.onLine) {
            container.innerHTML = template.render(me.loadFromStorage(storageId));
        } else if ((typeof google === "undefined") || (! google.hasOwnProperty('load'))) {
            //use setTimeout to allow other tasks to finish and then try again
            setTimeout(
                function () {
                    if ((typeof google === "undefined") || (! google.hasOwnProperty('load'))) {
                        container.innerHTML = template.render(me.loadFromStorage(storageId));
                    } else if (! google.hasOwnProperty('feeds')) {
                        google.load("feeds","1",{nocss:true, callback:function () { ucsf.news.render(container, storageId, feedUrl, options, template);}});
                    } else {
                        me.render(container, storageId, feedUrl, options, template);
                    }
                }, 100);
        } else if (! google.hasOwnProperty('feeds')) {
            google.load("feeds","1",{nocss:true, callback:function () { ucsf.news.render(container, storageId, feedUrl, options, template);}});
        } else {
            me.render(container, storageId, feedUrl, options, template);
        }
    }