function() {

        var sayHello = function(name) {
            alert("Hello, " + name);
        };

        return {
            speakToMe: sayHello
        };
    }