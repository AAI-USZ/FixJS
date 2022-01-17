function(id) {
        var userList = phpr.userStore.getList();
        for (var i in userList) {
            if (userList[i].id == id) {
                return userList[i];
            }
        }
    }