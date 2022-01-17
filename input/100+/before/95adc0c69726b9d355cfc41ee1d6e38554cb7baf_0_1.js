function() {
    var wkWs = gj("#UIWorkingWorkspace");
    if (wkWs.find("div.UIPortlet").length == 0 && wkWs.find("div.UIContainer").length == 0)
    {
      gj("#UIPage").parents(".VIEW-PAGE").css({"paddingTop" : "50px", "paddingRight" : "0px", "paddingBottom" : "50px", "paddingLeft" : "0px"});
    }
    var pageBodyBlock = gj("UIPageBody");
    var mask = pageBodyBlock.find("div.UIPageBodyMask");
    if(mask.length > 0)
    {
      mask.css("top", -pageBodyBlock[0].offsetHeight + "px").css("height", pageBodyBlock[0].offsetHeight + "px").css("width", pageBodyBlock[0].offsetWidth + "px");
    }
  }