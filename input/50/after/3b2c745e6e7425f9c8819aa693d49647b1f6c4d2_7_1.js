function (e) {

        var code = e.which;

        //ENTER: 13

        if (code == 13)

            addPlaylist();

    }).bind('paste drop', function () { return addPlaylist(); }