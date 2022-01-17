function() {
        var userList = this.userStore.getList();
        for (var i in userList) {
            if (userList[i].id == phpr.currentUserId) {
                return userList[i];
            }
        }
    }