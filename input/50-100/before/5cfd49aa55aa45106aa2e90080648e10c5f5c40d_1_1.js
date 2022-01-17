function(GLOBAL) {

    var library = function() {

        var sayHello = function(name) {
            alert("Hello, " + name);
        };

        return {
            speakToMe: sayHello
        };
    }();

    GLOBAL["library"] = library;

}