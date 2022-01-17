function (subClass, superClass, type) {
    var key, proto, 
        selfProps = subClass.prototype, 
        clazz = new Function();
        
    clazz.prototype = superClass.prototype;
    proto = subClass.prototype = new clazz();

    for (key in selfProps) {
        proto[key] = selfProps[key];
    }
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;

    // 类名标识，兼容Class的toString，基本没用
    typeof type == "string" && (proto.__type = type);

    subClass.extend = function(json) {
        for (var i in json) proto[i] = json[i];
        return subClass;
    }
    
    return subClass;
}