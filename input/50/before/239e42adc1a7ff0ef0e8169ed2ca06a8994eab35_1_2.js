function(id) {
        var userList = this.userStore.getList();
        for (var i in userList) {
            if (userList[i].id == id) {
                return userList[i];
            }
        }
    }