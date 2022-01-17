function bindContainerClickAndHold(containerNode, clickFunc, holdFunc) {
  // Rather than tracking suppressClick ourselves in here, we maintain the
  // state globally in Cards.  The rationale is that popup menus will be
  // triggered on contextmenu, which transfers responsibility of the click
  // event to the popup handling logic.  There is also no chance for multiple
  // contextmenu events overlapping (that we would consider reasonable).
  bindContainerHandler(
    containerNode, 'click',
    function(node, event) {
console.log('container click handling', Cards._suppressClick, event.button);
      if (Cards._suppressClick) {
        Cards._suppressClick = false;
        return;
      }
      clickFunc(node, event);
    });
  bindContainerHandler(
    containerNode, 'contextmenu',
    function(node, event) {
      // suppress the subsequent click if this was actually a left click
      if (event.button === 0) {
        console.log('context from 0 observed, suppressing');
        Cards._suppressClick = true;
      }
      else // avoid firefox context menu...
        event.preventDefault();

      return holdFunc(node, event);
    });
}