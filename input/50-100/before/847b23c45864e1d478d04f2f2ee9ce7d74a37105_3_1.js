function render(digest, timeUnit, calendarState, connectorEnabled) {
        hideEventInfo();
        this.getTemplate("text!applications/calendar/tabs/clock/clock.html", "clock", function() {
            if (calendarState == oldState)
                return;
            else
                oldState = calendarState;
			 setup(digest, timeUnit, connectorEnabled);
		});
	}