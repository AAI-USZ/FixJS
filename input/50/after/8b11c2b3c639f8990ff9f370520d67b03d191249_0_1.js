function () {
                        path = $(this).attr('src');
                        virtualScripts.push($.tapestry.utils.rebuildURL(path));
                    }