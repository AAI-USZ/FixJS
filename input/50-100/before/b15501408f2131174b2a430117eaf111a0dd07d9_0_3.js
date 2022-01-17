function(userId, callback) {
    if(!flex.badges.init){
        return { error: { code: 401, message: "First configure badges." } }
    }

    flex.socket.emit('badges.user.getAll', { 
        'app_id': flex.appData.app_id,
        'user_id' : userId
    }, function (res) {
        if (typeof callback != 'undefined') {
            callback(res);
        }
    });
}