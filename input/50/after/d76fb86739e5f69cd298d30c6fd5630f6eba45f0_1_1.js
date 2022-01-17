function (channel, message) {
            var json = JSON.parse(message);
            json.channel = channel;
            message = JSON.stringify(json);
            util.writeSizedString(this.socket,message);
        }