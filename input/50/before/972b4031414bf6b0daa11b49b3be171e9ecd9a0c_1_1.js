function constructor() {
            _socket = io.connect('http:///**HOST**/');
            return that;
        }