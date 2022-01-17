function () {
		if (self.title()) {
			task.update({
				due: self.due(),
				title: self.title(),
				notes: self.notes()
			}).done(function () {
				self.dispose();
			});
		}
	}