function () {
  this.rebuildDataForBoundaries = false;

  eventManager.mix(FilterBarController);
  eventManager.mix(MultiSelector);
  
  // default filters
  this.filterConditions = {
    area: null, // null means the whole city
    states: ["open", "opened", "closed"],
    services: null, // null means all services
    dateRange: {
      // On Monday, we show Friday-Sunday instead of just Sunday
      from: (dateTools.today().getDay() === 1) ? dateTools.subtract(dateTools.today(), dateTools.ONE_DAY * 3) : dateTools.yesterday(),
      to: dateTools.today()
    }
  };
  
  this.requests = {
    open: [],
    opened: [],
    closed: []
  };
  
  this.areas = new Array();
  this.services = new Array();
  
  // initialize sub-controllers
  this.legend = new LegendController();
  this.legend.dataSource = this;
  this.map = new MapController();
  this.map.dataSource = this;
  this.filterBar = new FilterBarController(this);
  this.api = new ThreeOneOneApi();
  this.headerBar = new HeaderBarController();

  eventManager.subscribe("filtersChanged", this);

  // this gets the collections of areas and services from the API
  // and passes them to the filterBar controller to use to populate the dropdowns 
  this.api.findDistinct('{"boundaries": 1}', 
                        '{"_id": ' + Config.endpoint + '}',
                        this.areas,
                        function(data, self) {
                          self.areas = data.boundaries;
                          self.services = data.services;
                          console.log("boundaries filter count: " 
                            + self.areas.length);
                          console.log("services filter count: " 
                            + self.services.length);
                          console.log("updating filter selectors");
                          self.filterBar.updateFilters();
                        },
                        this);
                        
  this.updateData();
}