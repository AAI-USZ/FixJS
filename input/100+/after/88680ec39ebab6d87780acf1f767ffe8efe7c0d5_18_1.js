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
    var isIE = (gj.browser.msie != undefined)
    var idPortal = (isIE) ? 'UIWorkingWorkspace' : 'UIPortalApplication';
    this.portal = document.getElementById(idPortal);
    var portlet = document.getElementById(this.portletId);
    var wikiLayout = gj(portlet).find('div.UIWikiMiddleArea')[0];
    this.layoutContainer = gj(wikiLayout).find('div.WikiLayout')[0];
    this.spliter = gj(this.layoutContainer).find('div.Spliter')[0];
    this.verticalLine = gj(this.layoutContainer).find('div.VerticalLine')[0];
    if (this.spliter) {
      this.leftArea = gj(this.spliter).prev('div')[0];
      this.rightArea = gj(this.spliter).next('div')[0];
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