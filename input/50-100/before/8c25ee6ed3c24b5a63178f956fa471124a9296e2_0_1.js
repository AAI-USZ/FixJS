function (string) {

        var channels = client.channelNames()

        var newstring = string

        for (x in channels) {

            if (string.toLowerCase().indexOf("#" + channels[x].toLowerCase()) != -1) {

                var channel = new RegExp("#" + channels[x], "i")

                newstring = string.replace(channel, '<a href="po:join/' + channels[x] + '">#' + channels[x] + "</a>")

            }

        }

        return newstring

    }