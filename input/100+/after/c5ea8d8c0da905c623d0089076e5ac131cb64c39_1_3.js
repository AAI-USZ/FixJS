function () {
                    if ((typeof google === "undefined") || (! google.hasOwnProperty('load'))) {
                        container.innerHTML = template.render(me.loadFromStorage(storageId));
                    } else if (! google.hasOwnProperty('feeds')) {
                        google.load("feeds","1",{nocss:true, callback:function () { ucsf.news.render(container, storageId, feedUrl, options, template);}});
                    } else {
                        me.render(container, storageId, feedUrl, options, template);
                    }
                }