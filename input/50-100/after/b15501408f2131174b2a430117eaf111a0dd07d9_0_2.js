function(badgeId, callback) {
    if(!flex.badges.init()){
        return { error: { code: 401, message: "First configure badges." } }
    }

    flex.socket.emit('badges.badge.get', { 
        'app_id': flex.appData.app_id,
        'badge_id' : badgeId
    }, function (res) {
        if (typeof callback != 'undefined') {
            return callback(res);
        }
    });
}