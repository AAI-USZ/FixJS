function(uicomponentid, isLink) {

  var me = eXo.wiki.UIWikiPortlet;

  var component = document.getElementById(uicomponentid);

  var breadcrumb = gj(component).find('div.BreadcumbsInfoBar')[0];

  var breadcrumbPopup = gj(component).find('div.SubBlock')[0];

  var itemArray = gj(breadcrumb).find('a');

  var shortenFractor = 3 / 4;

  itemArray.splice(0,1);

  var ancestorItem = itemArray.get(0);

  itemArray.splice(0,1);

  var lastItem = itemArray.get(itemArray.length-1);

  itemArray.splice(itemArray.length-1,1);

  if (lastItem == undefined){

    return;

  }

  var parentLastItem = itemArray.get(itemArray.length-1);

  itemArray.splice(itemArray.length-1,1);

  if(parentLastItem == undefined) {

    return;

  }

  var popupItems = new Array();

  var firstTime = true;

  var content = String(lastItem.innerHTML);

  while (breadcrumb.offsetWidth > shortenFractor * breadcrumb.parentNode.offsetWidth) {

    if (itemArray.length > 0) {

      var arrayLength = itemArray.length;

      var item = itemArray.splice(itemArray.length-1,1)[0];

      popupItems.push(item);

      if (firstTime) {

        firstTime = false;

        var newItem = gj(item).clone()[0];

        newItem.innerHTML = ' ... ';

        if (isLink) {

          newItem.href = '#';

          gj(newItem).mouseover(me.showBreadcrumbPopup);

        }

        breadcrumb.replaceChild(newItem, item);

      } else {

        var leftBlock = gj(item).prev('div')[0];

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