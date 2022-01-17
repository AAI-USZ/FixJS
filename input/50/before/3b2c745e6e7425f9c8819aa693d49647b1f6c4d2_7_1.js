function (e) {

        var code = e.which;

        //ENTER: 13

        if (code == 13)

            _addPlaylist();

    }).bind('paste drop', function () { return _addPlaylist(); }