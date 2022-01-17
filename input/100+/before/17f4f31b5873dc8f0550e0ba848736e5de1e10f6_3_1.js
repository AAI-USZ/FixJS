function (data) {
    this.command = 'mailbody';
    if (data instanceof Function) {
        this.send_data = data;
    }
    else if (data instanceof Array) {
        var data_marker = 0;
        this.send_data = function () {
            while (data_marker < data.length) {
                var line = data[data_marker];
                data_marker++;
                if (!this.send_data_line(line)) {
                    return false;
                }
            }
            return true;
        };
    }
    else {
        this.send_data = function () {
            this.socket.write(data);
            return true;
        };
    }
    this.continue_data();
}