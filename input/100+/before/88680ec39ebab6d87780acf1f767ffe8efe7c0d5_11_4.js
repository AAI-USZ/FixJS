function(uicomponentid, isLink) {

  var me = eXo.wiki.UIWikiPortlet;

  var component = document.getElementById(uicomponentid);

  var DOMUtil = eXo.core.DOMUtil;

  var breadcrumb = DOMUtil.findFirstDescendantByClass(component, 'div', 'BreadcumbsInfoBar');

  var breadcrumbPopup = DOMUtil.findFirstDescendantByClass(component, 'div', 'SubBlock');

  // breadcrumbPopup = DOMUtil.findFirstDescendantByClass(breadcrumbPopup, 'div', 'SubBlock');

  var itemArray = DOMUtil.findDescendantsByTagName(breadcrumb, "a");

  var shortenFractor = 3 / 4;

  itemArray.shift();

  var ancestorItem = itemArray.shift();

  var lastItem = itemArray.pop();

  if (lastItem == undefined){

    return;

  }

  var parentLastItem = itemArray.pop();

  if(parentLastItem == undefined) {

    return;

  }

  var popupItems = new Array();

  var firstTime = true;

  var content = String(lastItem.innerHTML);

  while (breadcrumb.offsetWidth > shortenFractor * breadcrumb.parentNode.offsetWidth) {

    if (itemArray.length > 0) {

      var arrayLength = itemArray.length;

      var item = itemArray.pop();

      popupItems.push(item);

      if (firstTime) {

        firstTime = false;

        var newItem = item.cloneNode(true);

        newItem.innerHTML = ' ... ';

        if (isLink) {

          newItem.href = '#';

          eXo.core.Browser.eventListener(newItem, 'mouseover', me.showBreadcrumbPopup);

        }

        breadcrumb.replaceChild(newItem, item);

      } else {

        var leftBlock = DOMUtil.findPreviousElementByTagName(item, 'div');

        breadcrumb.removeChild(leftBlock);

        breadcrumb.removeChild(item);

      }

    } else {

      break;

    }

  }



  if (content.length != lastItem.innerHTML.length) {

    lastItem.innerHTML = '<span title="' + content + '">' + lastItem.innerHTML + '...' + '</span>';

  }

  me.createPopup(popupItems, isLink, breadcrumbPopup);

}