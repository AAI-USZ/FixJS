function() {

				var controlManager = ed.controlManager;



				if (controlManager.get(RESTORE_DRAFT))

					controlManager.setDisabled(RESTORE_DRAFT, !self.hasDraft());

			}