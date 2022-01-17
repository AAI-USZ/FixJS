function () {
		if (self.title()) {
			Tasks.create({
				tasklistID: self.selectedTasklist().id(),
				due: self.due(),
				title: self.title(),
				notes: self.notes()
			}).done(function (task) {
				task.tasklist(self.selectedTasklist());
				taskdata.tasks.push(task);
				self.dispose();
			});
		}
	}