function(prtId) {
  try {
    if(String(typeof this.myBody) == "undefined" || !this.myBody) {
      this.myBody = document.getElementsByTagName("body")[0];
      this.bodyClass = String(this.myBody.className+'');
      this.myHtml = document.getElementsByTagName("html")[0];
    }
  }catch(e){};
  
  try{
    if(prtId.length > 0) this.portletId = prtId;
    var isIE = (eXo.core.Browser.getBrowserType() == "ie") ? true : false;
    var idPortal = (isIE) ? 'UIWorkingWorkspace' : 'UIPortalApplication';
    this.portal = document.getElementById(idPortal);
    var portlet = document.getElementById(this.portletId);
    var DOMUtil = eXo.core.DOMUtil;
    var wikiLayout = DOMUtil.findFirstDescendantByClass(portlet, "div", "UIWikiMiddleArea");
    this.layoutContainer = DOMUtil.findFirstDescendantByClass(wikiLayout, "div", "WikiLayout");
    this.spliter = DOMUtil.findFirstDescendantByClass(this.layoutContainer, "div", "Spliter");
    this.verticalLine = DOMUtil.findFirstDescendantByClass(this.layoutContainer, "div", "VerticalLine");
    if (this.spliter) {
      this.leftArea = DOMUtil.findPreviousElementByTagName(this.spliter, "div");
      this.rightArea = DOMUtil.findNextElementByTagName(this.spliter, "div");
      var leftWidth = eXo.core.Browser.getCookie("leftWidth");
      if (this.leftArea && this.rightArea && (leftWidth != null) && (leftWidth != "") && (leftWidth * 1 > 0)) {
        this.leftArea.style.width = leftWidth + 'px';
      }
      this.spliter.onmousedown = eXo.wiki.WikiLayout.exeRowSplit;
    }
    if(this.layoutContainer) {
      this.processeWithHeight();
      eXo.core.Browser.addOnResizeCallback("WikiLayout", eXo.wiki.WikiLayout.processeWithHeight);
    }
  }catch(e){
   return;
  };
}