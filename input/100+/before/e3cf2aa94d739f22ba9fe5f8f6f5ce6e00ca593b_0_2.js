function(data) {

        var items = [];



        $.each(data, function(key, val) {

            items.push('<li><a href="' + val.url + '" rel="avatarover" data-placement="top" data-title="' + val.login + '" data-content="' + val.login + ' has made ' + val.contributions + ' contributions to GitList"><img src="' + val.avatar_url + '" width="32" height="32" /></a></li>');

        });



        $('<ul/>', {

            'class': 'contributor-list',

            html: items.join('')

        }).appendTo('#contributors');

        $('[rel=avatarover]').popover();

    }