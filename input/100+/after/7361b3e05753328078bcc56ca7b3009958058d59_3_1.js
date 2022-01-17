function(dropableObjs, clickObj, dragObj, e) {

  var clickBlock = (clickObj && clickObj.tagName) ? clickObj : document.getElementById(clickObj) ;

  var dragBlock = (dragObj && dragObj.tagName) ? dragObj : document.getElementById(dragObj) ;

  

  var blockWidth = clickBlock.offsetWidth ;

  var blockHeight = clickBlock.offsetHeight ;

  var tmpNode = clickBlock.cloneNode(true);



  tmpNode.style.background = "rgb(237,237,237)";

  tmpNode.style.width = dropableObjs[0].offsetWidth + 'px';

  gj(tmpNode).css({opacity:0.5});

//  eXo.core.Browser.setOpacity(tmpNode, 50) ;

  var UIMonthViewNode = document.createElement('div');

  UIMonthViewNode.className = 'UICalendarPortlet UIMonthView';

  var EventMonthContentNode = document.createElement('div');

  EventMonthContentNode.className = 'EventMonthContent';

  

	gj(UIMonthViewNode).addClass("DummyDNDClass");

	gj(EventMonthContentNode).addClass("DummyDNDClass");

	

  tmpNode = this.getCheckedObject(clickBlock) ;

  

  var len = tmpNode.length ;

  while(len--){

		tmpNode[len].style.width = dropableObjs[0].offsetWidth + 'px';

    EventMonthContentNode.appendChild(tmpNode[len]);    

  }

  UIMonthViewNode.appendChild(EventMonthContentNode);

	document.body.insertBefore(UIMonthViewNode,document.body.firstChild);

  this.DragDrop.initCallback = this.initCallback ;

  this.DragDrop.dragCallback = this.dragCallback ;

  this.DragDrop.dropCallback = this.dropCallback ;

  

  this.DragDrop.init(dropableObjs, clickBlock, UIMonthViewNode, e) ;

  return false ;

}