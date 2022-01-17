function setup() {
    // Restore the $.cardstories object from the saved copy.
    $.cardstories = $.extend({}, cardstories_copy);
    // Delete the cookies that might be set under the /static or root path so
    // that they don't interfere with the tests.
    function deleteCookie(name) {
        $.each(['/', '/static', '/static/'], function(i, path) {
            $.cookie(name, null, {path: path});
        });
    }
    deleteCookie('CARDSTORIES_ID');
    deleteCookie('CARDSTORIES_INVITATIONS');

    // Mock out History.js.
    var mock_history = {
        pushState: function() { throw 'Please rebind "pushState"'; },
        getState: function() { throw 'Please rebind "getState"'; }
    };
    $.cardstories.history = mock_history;

    // Stub out some functions.
    $.cardstories.setTimeout = function(cb, delay) { return window.setTimeout(cb, 0); };
    $.cardstories.delay = function(root, delay, qname) { return; };
    $.cardstories.ajax = function() { throw 'Please rebind "ajax"'; };
    $.cardstories.reload = function() { throw 'Please rebind "reload"'; };
    $.cardstories.poll_ignore = function() { throw 'Please rebind "poll_ignore"'; };
    $.cardstories.animate_sprite = function(movie, fps, frames, rewind, loop, cb) { movie.show(); if (cb) {cb();}};
    $.cardstories.preload_images = function(root, cb) { cb(); };
    $.cardstories.update_player_info_from_ws = function(player_id) {};
    $.cardstories.get_player_info_by_id = function(player_id) {
        return {'name': 'Player ' + player_id,
                'avatar_url': '/static/css/images/avatars/default/' + player_id % 6 + '.jpg'};
    };
    $.cardstories_audio = {};
    $.cardstories_audio.play = function(name, root) {};
    $.cardstories_audio.loop = function(name, root, limit) {};
    $.cardstories_audio.stop = function(name, root) {};
    $.cardstories_table = {};
    $.cardstories_table.get_available_game = function(player_id, root, cb) { cb(); };
}