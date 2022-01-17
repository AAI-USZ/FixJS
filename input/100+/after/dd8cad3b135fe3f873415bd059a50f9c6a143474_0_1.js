function (e) {
	         status.hide();
	         if (e.success) {
	             var event = e.events[0];
		         var datetime = convertISOToDate(event.start_time);
	             name.value = event.name;
		         date.value = datetime.toLocaleDateString();
		         time.value = datetime.toLocaleTimeString();
		         if (event.duration) {
			         duration.value = event.duration.toString();
		         }
	             recurring.value = event.recurring || "";
		         if (event.recurring_count) {
		            recurringCount.value = event.recurring_count.toString();
		         }
	             name.focus();
	         } else {
	             error(e);
	         }
	     }