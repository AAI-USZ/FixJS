function (e) {
        e.preventDefault();

        var $this = $(this);
        var $container = $this.closest("li");
        var id = $(".number", $container).text();

        if ($this.hasClass("stop")) {
            clearInterval(timers[id].interval);
            $this.removeClass("stop").addClass("start").find(".ui-btn-text").text("Start");

            return;
        }
        else
            $this.removeClass("start").addClass("stop").find(".ui-btn-text").text("Stop");

        var $display;

        if (timers[id])
            $display = timers[id].display;
        else {
            var $elapsed = $(".elapsed", $container);
            timers[id] = { lap: $elapsed.data("lap") };
            $display = timers[id].display = $elapsed;
        }

        timers[id].start = now();
        timers[id].interval = setInterval(function () { updateTimer(id); }, 10);
    }