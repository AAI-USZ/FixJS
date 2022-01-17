function () {
				notificationController.initialize();
				var buildEvent = new MockBuildEventBuilder().withFailedBuilds(0).create();

				serviceController.buildFixed.dispatch(buildEvent);

				expect(window.webkitNotifications.createNotification).toHaveBeenCalledWith(
					'img/icon-128.png', 'All builds are green', ''
				);
			}