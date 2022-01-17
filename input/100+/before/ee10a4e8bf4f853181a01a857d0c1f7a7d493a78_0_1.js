function () {
        if (self.contest_stop != null)
            var sec_to_end = self.contest_stop - self.timestamp ;
        else
            var sec_to_end = Infinity;

        if (self.contest_start != null)
            var sec_to_start = self.contest_start - self.timestamp;
        else
            var sec_to_start = -Infinity;

        var now = new Date();

        var nowsec_to_end = sec_to_end - (now - firstDate) / 1000;
        var nowsec_to_start = sec_to_start - (now - firstDate) / 1000;
        if ((nowsec_to_end <= 0 && self.phase == 0 ) ||
            (nowsec_to_start <= 0 && self.phase == -1 ))
            window.location.href = url_root + "/";

        countdown = nowsec_to_end;

        if (self.phase == -1)
            countdown = nowsec_to_start;

        var hours = countdown / 60 / 60;
        var hoursR = Math.floor(hours);
        var minutes = countdown / 60 - (60*hoursR);
        var minutesR = Math.floor(minutes);
        var seconds = countdown - (60*60*hoursR) - (60*minutesR);
        var secondsR = Math.floor(seconds);
        if (minutesR < 10) m = "0" + minutesR;
        else m = minutesR;
        if (secondsR < 10) s = "0" + secondsR;
        else s = secondsR;

        if (self.remaining_div == null)
            self.remaining_div = $("#remaining");
        if (self.remaining_div != null)
            self.remaining_div.text(hoursR + ":" + m + ":" + s);
    }