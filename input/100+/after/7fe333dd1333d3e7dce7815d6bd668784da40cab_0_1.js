function() {
		Ext.chart.Chart.CHART_URL = '/typo3/contrib/extjs/resources/charts.swf';

		Ext.QuickTips.init();

		// init Flashmessage
		Ext.ux.TYPO3.MvcExtjs.DirectFlashMessageDispatcher.initialize();
		Ext.ux.TYPO3.Newsletter.FlashMessageOverlayContainer.initialize({
			minDelay: 5,
			maxDelay: 15,
			logLevel: -1,
			opacity: 1
		});

		if (this.checkIfPage()) {
			this.initStore();
			this.initGui();
		} else if (this.checkIfPageIsFolder()){
			this.initFolderGui();
		} else {
			this.initHelpGui();
		}
	}