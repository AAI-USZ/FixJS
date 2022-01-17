function (e) {
	         status.hide();
	         if (e.success) {
	             var event = e.events[0];
		         var datetime = convertISOToDate(event.start_time);
	             name.value = event.name;
		         date.value = datetime.toLocaleDateString();
		         time.value = datetime.toLocaleTimeString();
		         duration.value = event.duration || "";
	             recurring.value = event.recurring || "";
		         recurringCount.value = event.recurring_count || "";
	             name.focus();
	         } else {
	             error(e);
	         }
	     }