function IterationController(options) {

  this.id = options.id;

  this.storyListElement = options.storyListElement;

  this.iterationInfoElement = options.backlogDetailElement;

  this.assigmentListElement = options.assigmentListElement;

  this.taskListElement = options.taskListElement;

  this.hourEntryListElement = options.hourEntryListElement;

  this.metricsElement = options.metricsElement;

  this.smallBurndownElement = options.smallBurndownElement;

  this.burndownElement = options.burndownElement;

  this.tabs = options.tabs;

  this.historyElement = options.historyElement;

  this.init();

  

  this.initAssigneeConfiguration();

  this.initIterationInfoConfig();

  

  this.initialize();

  

  var me = this;

  this.tabs.bind('tabsselect', function(event, ui) {

    if(ui.index === 1) {

      me.selectAssigneesTab();

    } else if(ui.index === 2) {

      me.historyElement.load("ajax/iterationHistory.action",{iterationId: me.id});

    }

  });

  window.pageController.setMainController(this);

}