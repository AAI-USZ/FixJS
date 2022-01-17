function(input, manager) {
    var jsonObj = input.getJSON();
    // check
    // 
    var check = function(o) {
        if (o.Animations) {
            return true;
        }
        return false;
    };
    if (!check(jsonObj)) {
        return;
    }

    for (var i = 0, l = jsonObj.Animations.length; i < l; i++) {
        var entry = jsonObj.Animations[i];
        var anim = input.setJSON(entry).readObject();
        if (anim) {
            manager.registerAnimation(anim);
        }
    }
    return manager;
}