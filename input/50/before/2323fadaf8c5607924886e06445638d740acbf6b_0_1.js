function(ev) {
            $(Khan).trigger("gotoNextProblem");

            // Disable next question button until next time
            $(this)
                .attr("disabled", true)
                .addClass("buttonDisabled");
        }