function(actor, playlist) {
        var $user = '<span class="user small link"><img src="' + actor.smallImageUrl + '"/><span clas="name">' + Utils.escape(actor.displayName) + '</span></span>';
        var $playlist = '<span class="link playlist">' + Utils.escape(playlist.title) + '</span>';
        var $div = $('<div class="activity">' + TranslationSystem.get('$user subscribed to your playlist $playlist', {$playlist: $playlist, $user: $user}) + '</div>'); 
        $div.find('.link.user').click(actor.goTo);
        $div.find('.link.playlist').click(playlist.goTo);
        return $div;
    }