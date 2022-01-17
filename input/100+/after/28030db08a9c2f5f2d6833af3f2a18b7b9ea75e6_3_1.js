function (element, className) {
    element = baidu.dom.g(element);

    // 对于 textNode 节点来说没有 className
    if(!element || !element.className) return false;

    var classArray = baidu.string.trim(className).split(/\s+/), 
        len = classArray.length;

    className = element.className.split(/\s+/).join(" ");

    while (len--) {
        if(!(new RegExp("(^| )" + classArray[len] + "( |\x24)")).test(className)){
            return false;
        }
    }
    return true;
}