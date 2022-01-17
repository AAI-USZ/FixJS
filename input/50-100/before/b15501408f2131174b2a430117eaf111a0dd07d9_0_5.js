function(userId, badgeId, callback) {
    if(!flex.badges.init){
        return { error: { code: 401, message: "First configure badges." } }
    }

    flex.socket.emit('badges.user.set', { 
        'app_id': flex.appData.app_id,
        'user_id' : userId,
        'badge_id' : badgeId
    }, function (res) {
        if (typeof callback != 'undefined') {
            callback(res);
        }
    });
}