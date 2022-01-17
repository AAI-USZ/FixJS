function(rootNode){
  this.cleanUp();
  rootNode = typeof(rootNode) == 'string' ? document.getElementById(rootNode) : rootNode;
  this.rootNode = rootNode;
  this.events = new Array();
  this.weeks = new Array();
  var DOMUtil = eXo.core.DOMUtil;
  // Parse all event node to event object
  var allEvents = gj(rootNode).find('div.DayContentContainer'); 
  // Create and init all event
  for (var i = 0; i < allEvents.length; i++) {
    if (allEvents[i].style.display == 'none') {
      continue;
    }
    var eventObj = new EventObject();
    allEvents[i].onmouseover = eXo.calendar.EventTooltip.show;
    allEvents[i].onmouseout = eXo.calendar.EventTooltip.hide;
//    gj(allEvents[i]).on('mouseover',eXo.calendar.EventTooltip.show);
//    gj(allEvents[i]).on('mouseout',eXo.calendar.EventTooltip.hide);
    eventObj.init(allEvents[i]);
    this.events.push(eventObj);
  }
  this.UIMonthViewGrid = document.getElementById('UIMonthViewGrid');
  this.groupByWeek();
  this.sortByWeek();
}