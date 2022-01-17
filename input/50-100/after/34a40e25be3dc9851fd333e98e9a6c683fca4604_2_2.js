function () {
				notificationController.initialize();
				var buildEvent = new MockBuildEventBuilder().withFailedBuilds(2).create();

				serviceController.buildFixed.dispatch(buildEvent);

				expect(window.webkitNotifications.createNotification).toHaveBeenCalledWith(
					'img/icon-128.png', 'Build fixed - ' + buildEvent.buildName, buildEvent.group
				);
			}