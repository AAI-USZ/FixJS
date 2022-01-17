function () {
			function initializeFrom(projectsResponse) {
				for (var i = 0; i < projectsResponse.projects.project.length; i++) {
					var responseProject = projectsResponse.projects.project[i];
					initializeFromProject(responseProject);
				}
			}
			function initializeFromProject(project) {
				for (var j = 0; j < project.plans.plan.length; j++) {
					var responsePlan = project.plans.plan[j];
					if (self.settings.plans.indexOf(responsePlan.key) < 0) {
						continue;
					}
					initializePlan(responsePlan);
				}
			}

			function initializePlan(responsePlan) {
				if (!responsePlan.enabled) { return; }
				var plan = new BambooPlan(self.settings);
				plan.buildFailed.add(self.onBuildFailed, self);
				plan.buildFixed.add(self.onBuildFixed, self);
				plan.errorThrown.add(self.onPlanError, self);
				self.plans[responsePlan.key] = plan;
				self.plansCount++;
				plan.initialize(responsePlan);
			}

			var initializeFinished = new signals.Signal();
			initializeFinished.memorize = true;
			var self = this;
			this.plans = {};
			this.plansCount = 0;
			var initRequest = new BambooRequest(this.settings);
			initRequest.responseReceived.addOnce(function (projectsResponse) {
				initializeFrom(projectsResponse);
				initializeFinished.dispatch(true, projectsResponse);
			}, this);
			initRequest.errorReceived.addOnce(function (errorInfo) {
				initializeFinished.dispatch(false, errorInfo);
			}, this);
			initRequest.projects();
			return initializeFinished;



		}