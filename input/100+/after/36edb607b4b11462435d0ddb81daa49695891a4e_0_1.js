function handleData(data) {        
        pct = 0;
        pl = "";
        down = true;
        nearMax = false;
        docTitle = "MineCanary - " + server + " - ";
        if(data.error) {
            str = "there was an error!";
            docTitle += "error";
        } else {
            motd = ""
            if(data.status == "up") {
                pct = 100 * Math.min(data.players / data.max_players, 1);
                nearMax = (pct >= 95);
                pl = data.players + "/" + data.max_players + " players";
                motd = " [" + data.motd + "]"
                down = false;
                docTitle += pl;
            } else {
                docTitle += "down";
            }
            
            str = "The server <tt>" + punycode.toUnicode(data.server) + "</tt>" + motd + " is <span class='status-" + data.status + "'>" + data.status + "</span>.";
            str += "<br />It has been " + data.status + " since <abbr class='timeago' title='" + data.lastchange + "'>" + moment(data.lastchange).calendar() + "</abbr>.";
            str += "<br />Last checked <abbr class='timeago' title='" + data.timestamp + "'>" + moment(data.timestamp).calendar() + "</abbr>.";
        }
        str += "<br />Status refreshes every " + seconds_between + " second" + seconds_between_plural + ".";
        $("#result").html(str);
        $("#num-players").text(pl);
        $("#player-meter").toggleClass("meter-down", down);
        $("#meter-bar").animate({"width": pct+"%"}, 500);
        $("#meter-bar").toggleClass("meter-warn", nearMax);
        document.title = docTitle;
        jQuery("abbr.timeago").timeago();
        $("#spinner").hide();

        t = setTimeout(getData, TIME_BETWEEN);
    }