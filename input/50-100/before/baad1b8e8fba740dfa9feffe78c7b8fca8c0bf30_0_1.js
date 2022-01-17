function(data) {
			if (data && data.indexOf("<strong>Module Information</strong>") != -1) {
				_ripper.getModule($(data));
				NUSchedule.signals.send("on_module_rip_success", index);
			} else {
				NUSchedule.signals.send("on_module_rip_error", index);
			}
			_ripper.ripNext();
		}