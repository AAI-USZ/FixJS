function () {

        _window = {

            webworks: {

                exec: jasmine.createSpy("window.webworks.exec")

            }

        };

        GLOBAL.window = _window;

    }