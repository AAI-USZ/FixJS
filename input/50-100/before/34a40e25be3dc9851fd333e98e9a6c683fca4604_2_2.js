function () {
				notificationController.initialize();
				var buildEvent = new MockBuildEventBuilder().withFailedBuilds(2).create();

				serviceController.buildFixed.dispatch(buildEvent);

				expect(window.webkitNotifications.createNotification).toHaveBeenCalledWith(
					'img/icon-128.png', buildEvent.message, buildEvent.details
				);
			}