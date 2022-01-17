function (data) {

            fileBrowserDialog.empty();

            var first_val = data[0];

            var i = 0;

            var list, link = null;

            data = $.grep(data, function (value) {

                return i++ != 0;

            });

            $('<h2>').text(first_val.current_path).appendTo(fileBrowserDialog);

            list = $('<ul>').appendTo(fileBrowserDialog);

            $.each(data, function (i, entry) {

                link = $("<a href='javascript:void(0)' />").click(function () { browse(entry.path, endpoint); }).text(entry.name);

                $('<span class="ui-icon ui-icon-folder-collapsed"></span>').prependTo(link);

                link.hover(

                    function () {$("span", this).addClass("ui-icon-folder-open");    },

                    function () {$("span", this).removeClass("ui-icon-folder-open"); }

                );

                link.appendTo(list);

            });

            $("a", list).wrap('<li class="ui-state-default ui-corner-all">');

            fileBrowserDialog.dialog('option', 'dialogClass', 'browserDialog');

        }