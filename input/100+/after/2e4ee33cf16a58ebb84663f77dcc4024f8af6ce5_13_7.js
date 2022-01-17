function() {
    var tree = {
        "osgAnimation.FloatLerpChannel": {
            "Name": "euler_x", 
            "TargetName": "Cube", 
            "KeyFrames": [
                [ -0.04, 0],
                [ 0.36, -0] ]
        }
    };

    osgDB.Promise.when((new osgDB.Input()).setJSON(tree).readObject()).then(function(result) {
        ok(result.getKeyframes().length === 2, "Check keyframes FloatLerpChannel");
        ok(result.getTargetName() === "Cube", "Check TargetName FloatLerpChannel");
        ok(result.getName() === "euler_x", "Check Name FloatLerpChannel");
        start();
    });
}