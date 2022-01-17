function () {

        var sayHello = function (name, elementId) {
            var element = document.getElementById(elementId);
            element.innerHTML = "Hello, " + name + ", JavaScript is running.";
        };

        return {
            speakToMe: sayHello
        };
    }