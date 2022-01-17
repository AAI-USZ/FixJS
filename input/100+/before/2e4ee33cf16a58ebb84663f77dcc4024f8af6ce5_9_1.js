function(input, obj) {
    var jsonObj = input.getJSON();
    var check = function(o) {
        return true;
    };
    if (!check(jsonObj)) {
        return false;
    }
    
    if (jsonObj.Name) {
        obj.setName(jsonObj.Name);
    }

    if (jsonObj.UserDataContainer) {
        var userdata = input.setJSON(jsonObj.UserDataContainer).readUserDataContainer();
        if (userdata !== undefined) {
            obj.setUserData(userdata);
        }
    }

    return true;
}