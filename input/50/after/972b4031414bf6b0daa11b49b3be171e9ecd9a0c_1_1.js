function constructor() {
            _socket = io.connect('/**HOST**/');
            return that;
        }