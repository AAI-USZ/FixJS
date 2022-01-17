function() {
    if (!localStorage.eula) {
        $('#main').hide();
        // 何故かレンダリングされないタイミングがあるのでずらす
        setTimeout(function() {
            $('#eula').show();
        }, 20);
        return;
    }

    if (window.popupMode) {
        if (request_uri.param('error')) {
            //
        } else {
            if (Config.get('popup.window.autosize')) {
                document.body.style.width = '' + 500 + 'px';
            } else {
                document.body.style.width = '' + Math.max(100, Config.get('popup.window.width')) + 'px';
            }
            // 同期実行だとうまく幅を調整できないので遅らせる
            setTimeout(function () {
                var overflow = $('#header').width() - $('body').width();
                if (overflow > 0) {
                    var search = $('#search-word');
                    search.width(Math.max(search.width() - overflow, 100));
                }
            }, 35);
            /*
            if (Config.get('popup.window.autosize')) {
                chrome.windows.getLastFocused(function(w) {
                    var width = 500;
                    var height = w.height - 300;
                    height = Math.max(height, 300);
                    setWindowSize(width, height);
                });
            } else {
                setWindowSize(Config.get('popup.window.width'), Config.get('popup.window.height'));
            }
            */
        }
    }

    // 確認ポップアップを出力するようなイベントのためのリスナ
    $("#delete-button").bind( "click", function ( evt ) {
        var id = evt.target.id;
        var msg = "このブックマークを削除します。 よろしいですか?";
        confirmWithCallback( id, msg, deleteBookmark );
    } );

    // ブックマーク追加時のタグ一覧のタグクリックのリスナ
    $('dd span.tag').live( 'click', function() {
        var bView = View.bookmark;
        var tag = this.textContent;
        var input = bView.commentEL.get(0);
        var index = 0;
        if ( this.className.indexOf('selected') == -1 ) {
            index = input.selectionEnd + tag.length + 2;
            bView.tagCompleter.inputLine.addTag(tag);
        } else {
            index = input.value.length - tag.length - 2;
            bView.tagCompleter.inputLine.deleteTag(tag);
        }
        input.setSelectionRange(index, index);
        return false;
    } );

    var user = UserManager.user;
    if (user) {
        var hicon = $('#header-usericon');
        hicon.append(E('img', {
            title: user.name,
            alt: user.name,
            src: user.view.icon,
            width: 16,
            height: 16,
        }));
        hicon.show();
    }
    $('#search-form').bind('submit', searchFormSubmitHandler);
    if (Config.get('popup.search.incsearch')) {
        $('#search-word').bind('keyup', searchIncSearchHandler);
    }
    $('#image-detect-container-list img').live('click', function() {
        View.bookmark.imageSelect(this);
    });
    $('a').live('click', function() {
        this.target = '_blank';
    });
    // $('a').each(function() { this.target = '_blank' });
    if (request_uri.param('error')) {
        ViewManager.show('bookmark');
        return;
    }

    if (Config.get('popup.lastView') == 'bookmark') {
        ViewManager.show('bookmark');
    } else if (Config.get('popup.lastView') == 'search' && Config.get('popup.search.lastWord')) {
        document.getElementById('search-word').value = Config.get('popup.search.lastWord');
        View.search.search($('#search-word').attr('value'));
    } else {
        ViewManager.show('comment');
    }
}