function(){

  var requireScript, mainPanelElement, expandedPanelElement,
  titleElement;

   var CTRACKER_BASE_URL = "http://127.0.0.1:8585";


  // requireScript = document.createElement('script');
  // requireScript.type = 'text/javascript';
  // requireScript.setAttribute('data-main', CTRACKER_BASE_URL + '/scripts/main.js');
  // requireScript.src = CTRACKER_BASE_URL + '/scripts/require.js';
  // document.body.appendChild(requireScript);

  requireScript = document.createElement('script');
  requireScript.type = 'text/javascript';
  requireScript.src = CTRACKER_BASE_URL + '/dist/ctracker.js';
  document.body.appendChild(requireScript);

  mainPanelElement = document.createElement('div');
  mainPanelElement.id = 'closure-tracker-main-panel';

  titleElement = document.createElement('p');
  titleElement.innerHTML = 'Tracker-D';

  expandedPanelElement = document.createElement('div');
  expandedPanelElement.id = 'closure-tracker-expanded-panel';
  expandedPanelElement.setAttribute('style', 'display: none;');

  mainPanelElement.appendChild(titleElement);
  mainPanelElement.appendChild(expandedPanelElement);
  document.body.appendChild(mainPanelElement);
}