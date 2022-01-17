function(ev) {
            nextProblem(1);
            $(Khan).trigger("gotoNextProblem");

            // Disable next question button until next time
            $(this)
                .attr("disabled", true)
                .addClass("buttonDisabled");
        }