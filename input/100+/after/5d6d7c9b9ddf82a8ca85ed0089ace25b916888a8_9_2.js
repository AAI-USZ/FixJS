function(require, dojo, mBootstrap, mStatus, mProgress, mCommands, mFileClient, mOperationsClient, mSearchClient, mSelection, mDialogs, mGlobalCommands,
			mSiteUtils, mSiteCommands, mSitesExplorer) {

	dojo.addOnLoad(function() {
		mBootstrap.startup().then(function(core) {
			var serviceRegistry = core.serviceRegistry;
			var preferences = core.preferences;
			document.body.style.visibility = "visible"; //$NON-NLS-0$
			dojo.parser.parse();

			// Register services
			var dialogService = new mDialogs.DialogService(serviceRegistry);
			var operationsClient = new mOperationsClient.OperationsClient(serviceRegistry);
			var statusService = new mStatus.StatusReportingService(serviceRegistry, operationsClient, "statusPane", "notifications", "notificationArea"); //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
			var progressService = new mProgress.ProgressService(serviceRegistry, operationsClient);
			
			var selection = new mSelection.Selection(serviceRegistry);
			var commandService = new mCommands.CommandService({serviceRegistry: serviceRegistry});

			var fileClient = new mFileClient.FileClient(serviceRegistry);
			var searcher = new mSearchClient.Searcher({serviceRegistry: serviceRegistry, commandService: commandService, fileService: fileClient});

			function createCommands() {
				var errorHandler = statusService.setProgressResult.bind(statusService);
				var goToUrl = function(url) {
					window.location = url;
				};
				mSiteCommands.createSiteServiceCommands(serviceRegistry, {
					createCallback: goToUrl,
					errorHandler: errorHandler
				});
				mSiteCommands.createSiteCommands(serviceRegistry);
			}
			
			mGlobalCommands.generateBanner("banner", serviceRegistry, commandService, preferences, searcher, explorer); //$NON-NLS-0$
			mGlobalCommands.setPageTarget({task: "Sites"});
			
			var explorer = new mSitesExplorer.SiteServicesExplorer2(serviceRegistry, selection, "table"); //$NON-NLS-0$
			createCommands();
			explorer.display();
		});
	});
}