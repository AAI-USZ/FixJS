function onAlertLoad()
{
  prefillAlertInfo();

  // Read out our initial settings from prefs.
  try
  {
    var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService();
    prefService = prefService.QueryInterface(Components.interfaces.nsIPrefService);
    var prefBranch = prefService.getBranch(null);
    gSlideIncrement = prefBranch.getIntPref("alerts.slideIncrement");
    gSlideTime = prefBranch.getIntPref("alerts.slideIncrementTime");
    gOpenTime = prefBranch.getIntPref("alerts.totalOpenTime");
  }
  catch (ex)
  {
  }

  // TODO: This seems to not work
  var cb = document.getElementById('close-box');
  cb.addEventListener('click', handleCloseBoxClick, false);

  if (showAd()) {
    document.getElementById('adbox').setAttribute('hidden', 'false');
    var Iframe = document.createElement('iframe');
    Iframe.setAttribute('border','1');
    Iframe.setAttribute('width','300px');
    Iframe.setAttribute('height','250px');
  Iframe.setAttribute("src", 'http://www.iicdn.com/www/delivery/afr.php?zoneid=57&refresh=60');
    document.getElementById('ad').appendChild(Iframe);
  }
  else {
    //d('not showing ad');
    document.getElementById('adbox').setAttribute('hidden', 'true');
  }

  //d('gOrigin: ' + gOrigin);
  // d('NS_ALERT_HORIZONTAL: ' + NS_ALERT_HORIZONTAL);
  // d('NS_ALERT_LEFT: ' + NS_ALERT_LEFT);
  // d('NS_ALERT_TOP: ' + NS_ALERT_TOP);
  // d('screen: ' + screen.width + 'x' + screen.height);



  // Make sure that the contents are fixed at the window edge facing the
  // screen's center so that the window looks like "sliding in" and not
  // like "unfolding". The default packing of "start" only works for
  // vertical-bottom and horizontal-right positions, so we change it here.
  // if (gOrigin & NS_ALERT_HORIZONTAL)
  // {
  //   if (gOrigin & NS_ALERT_LEFT)
  //     document.documentElement.pack = "end";

  //   d('setting horizontal orientation');

  //   // Additionally, change the orientation so the packing works as intended
  //   document.documentElement.orient = "horizontal";
  // }
  // else
  // {
  //   d('not setting horizontal');

  //   if (gOrigin & NS_ALERT_TOP)
  //     document.documentElement.pack = "end";
  // }

  var alertBox = document.getElementById("alertBox");

  sizeToContent();

  // Work around a bug where sizeToContent() leaves a border outside of the content
  var contentDim = document.getElementById("alertBox").boxObject;
  if (window.innerWidth == contentDim.width + 1)
    --window.innerWidth;

  // Start with a 1px width/height, because 0 causes trouble with Gk1/2
  gCurrentSize = 1;

  // Determine final size
  if (gOrigin & NS_ALERT_HORIZONTAL)
  {
    gFinalSize = window.outerWidth;
    //window.outerWidth = gCurrentSize;
  }
  else
  {
    gFinalSize = window.outerHeight;
    //window.outerHeight = gCurrentSize;
  }

  // d('gFinalSize/window.outerHeight: ' + gFinalSize + '/' + window.outerHeight);
  // d('determine x: ' + (gOrigin & NS_ALERT_LEFT));
  // d('determine y: ' + (gOrigin & NS_ALERT_TOP));

  // d ('determining y: ' + screen.availTop + ' + ' + screen.availHeight + ' - ' + window.outerHeight);

  // Determine position
  var x = gOrigin & NS_ALERT_LEFT ? screen.availLeft :
          screen.availLeft + screen.availWidth - window.outerWidth;
  var y = gOrigin & NS_ALERT_TOP ? screen.availTop :
          screen.availTop + screen.availHeight;// - window.outerHeight;

  //d('x,y: ' + x + ',' + y);

  // Offset the alert by 10 pixels from the edge of the screen
  if (gOrigin & NS_ALERT_HORIZONTAL)
    y += gOrigin & NS_ALERT_TOP ? 10 : -10;
  else
    x += gOrigin & NS_ALERT_LEFT ? 10 : -10;

  // d('screeny: ' + window.screenY);
  window.moveTo(x, y);
  // d('screeny: ' + window.screenY);
  // d('x,y: ' + x + ',' + y);
  // d('gSlideTime: ' + gSlideTime);

  //  setTimeout(function() { animateAlert(); }, gSlideTime);
  setTimeout(animateAlert, gSlideTime);
}