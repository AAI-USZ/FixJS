function (message, chan, html) {

        var pos = message.indexOf(': ');

        if (pos != -1) {

            if (client.id(message.substring(0, pos)) == -1) {

                return;

            }

            var id = client.id(message.substring(0, pos))

            var playname = message.substring(0, pos)

            if (client.auth(id) < 4 && client.auth(id) >= 0) {

                var playmessage = this.html_escape(message.substr(pos + 2))

            } else {

                var playmessage = message.substr(pos + 2)

            }

            var msg = playmessage.split(' ')

            for (x in msg) {

                var msgnew = ""

                var msgl = msg[x].length

                var start = msg[x][0]

                var end = msg[x][parseInt(msgl - 1)]

                if (start == ".") {

                    start = msg[x][1]

                }

                if (msg[x].substr(0, 7) == "http://" || msg[x].substr(0, 8) == "https://") {

                    var link = msg[x]

                    msgnew = "<a href = '" + link + "'>" + link + "</a>"

                    playmessage = playmessage.replace(msg[x], msgnew)

                }

                if (((start == "*" && end == "*" && msgl > 1) || ((start == "/" || start == "\\") && (end == "/" || end == "\\") && msgl > 1) || (start == "_" && end == "_" && msgl > 1)) && etext === "true") {

                    var modifier = ""

                    var endmodifier = ""

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

                    if (i >= 0 && i + end.length >= msg[x].length) {

                        newmsg = msg[x].substring(0, i) + endmodifier

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

            if (playmessage.substr(0, 4) == "&gt;" && tgreentext === "true") {

                playmessage = "<font color = '" + greentext + "'>" + playmessage + "</font>"

            } else {

                playmessage = "<font color = '" + fontcolour + "'>" + playmessage

            }

            if (client.auth(id) > 0 && client.auth(id) < 4) {

                client.printChannelMessage("<font face ='" + fontstyle + "'><font size = " + fontsize + "><font color='" + colour + "'><timestamp/><b> " + auth_symbol[client.auth(id)] + "<i>" + playname + ": </font></i></b>" + playmessage, chan, true)

                sys.stopEvent()

                return;

            }

            client.printChannelMessage("<font color='" + colour + "'><timestamp/><b>" + playname + ": </font></b>" + playmessage, chan, true)

            sys.stopEvent()

        }

    }