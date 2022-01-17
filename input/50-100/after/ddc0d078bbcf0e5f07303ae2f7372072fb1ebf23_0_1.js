function (i, entry) {

                link = $("<a href='javascript:void(0)' />").click(function () { browse(entry.path, endpoint); }).text(entry.name);

                $('<span class="ui-icon ui-icon-folder-collapsed"></span>').prependTo(link);

                link.hover(

                    function () {$("span", this).addClass("ui-icon-folder-open");    },

                    function () {$("span", this).removeClass("ui-icon-folder-open"); }

                );

                link.appendTo(list);

            }