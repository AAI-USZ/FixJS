function (message, chan, html) {

        var pos = message.indexOf(': ');

        if (pos != -1) {

            if (client.id(message.substring(0, pos)) == -1) {

                return;

            }

            var id = client.id(message.substring(0, pos))

            var playname = message.substring(0, pos)

            var playmessage = this.html_escape(message.substr(pos + 2))

            var msg = playmessage.split(' ')

            for (x in msg) {

                var msgnew, otherend

                var msgl = msg[x].length

                var start = msg[x][0]

                var end = msg[x][parseInt(msgl - 1)]

                for (y in punctuation) {

                    if (start == punctuation[y]) {

                        start = msg[x][1]

                    }

                    if (end == punctuation[y]) {

                        end = msg[x][parseInt(msgl - 2)]

                        otherend = punctuation[y]

                    }

                }

                if (msg[x].substr(0, 7) == "http://" || msg[x].substr(0, 8) == "https://") {

                    var link = msg[x]

                    link = link.replace(/&amp;/g, "&")

                    msgnew = "<a href = '" + link + "'>" + link + "</a>"

                    playmessage = playmessage.replace(msg[x], msgnew)

                }

                if (((start == "*" && end == "*" && msgl > 2) || ((start == "/" || start == "\\") && (end == "/" || end == "\\") && msgl > 2) || (start == "_" && end == "_" && msgl > 2)) && etext === "true") {

                    var modifier, endmodifier, newmsg

                    if (start == "*") {

                        modifier = "<b>"

                        endmodifier = "</b>"

                    }

                    if (start == "/" || start == "\\") {

                        modifier = "<i>"

                        endmodifier = "</i>"

                    }

                    if (start == "_") {

                        modifier = "<u>"

                        endmodifier = "</u>"

                    }

                    var i = msg[x].lastIndexOf(end)

                    if (i >= 0) {

                        newmsg = msg[x].substring(0, i) + endmodifier + (otherend == undefined ? "" : otherend)

                    }

                    msgnew = newmsg.replace(start, modifier)

                    playmessage = playmessage.replace(msg[x], msgnew)

                }

            }

            var colour = client.color(id)

            if (colour === "#000000") {

                var clist = ['#5811b1', '#399bcd', '#0474bb', '#f8760d', '#a00c9e', '#0d762b', '#5f4c00', '#9a4f6d', '#d0990f', '#1b1390', '#028678', '#0324b1'];

                colour = clist[src % clist.length];

            }

            if (playmessage.toLowerCase().indexOf(client.ownName().toLowerCase()) != -1 && playname !== client.ownName()) {

                var name = new RegExp("\\b" + client.ownName() + "\\b", "i")

                newplaymessage = playmessage.replace(name, "<span style='" + hilight + "'>" + client.ownName() + "</span>")

                if (newplaymessage !== playmessage) {

                    playmessage = newplaymessage.replace(newplaymessage, "<i> " + newplaymessage + "</i><ping/>")

                }

            }

            for (x in stalkwords) {

                if (playmessage.toLowerCase().indexOf(stalkwords[x].toLowerCase()) != -1 && playname !== client.ownName()) {

                    var stalk = new RegExp("\\b" + stalkwords[x] + "\\b", "i")

                    newplaymessage = playmessage.replace(stalk, "<span style='" + hilight + "'>" + stalkwords[x] + "</span>")

                    if (newplaymessage !== playmessage) {

                        playmessage = newplaymessage.replace(newplaymessage, "<i> " + newplaymessage + "</i><ping/>")

                    }

                }

            }

            if (playmessage.substr(0, 4) == "&gt;" && tgreentext === "true") {

                playmessage = "<font color = '" + greentext + "'>" + playmessage + "</font>"

            } else {

                playmessage = "<font color = '" + fontcolour + "'>" + playmessage

            }

            var symbolLength = 0

            for (x in auth_symbol) {

                if (x > symbolLength) {

                    symbolLength = x

                }

            }

            var auth = client.auth(id)

            if (auth > symbolLength) {

                auth = 0

            }

            playmessage = this.channelLinks(playmessage)

            client.printChannelMessage("<font face ='" + fontstyle + "'><font size = " + fontsize + "><font color='" + colour + "'><timestamp/> " + auth_symbol[auth] + auth_style[auth] + playname + ": </font>" + this.authEnd(auth_style[auth]) + playmessage, chan, true)

            sys.stopEvent()

        }

    }