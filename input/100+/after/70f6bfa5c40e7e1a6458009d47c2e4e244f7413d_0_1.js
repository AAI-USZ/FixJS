function ($) {
  // "use strict";

 window.hugrid = {

             state : {
                  gridstate : 'undefined',
                  gridonload :  'undefined'
                },
              
              getGridstate : function() {
                return window.hugrid.state.gridstate ;
              },

              toggleState : function() {
                // change our indicators of state
                if (window.hugrid.state.gridstate == 'on') {
                  window.hugrid.state.gridstate = 'off' ;
                }
                else if( window.hugrid.state.gridstate == 'off'){
                  window.hugrid.state.gridstate = 'on' ;
                }
              }
  } ;
 
  makehugrid = function () {

    // called at startup. Remove grids, clear state.
    initialCleanUp() ;
    
    /* Column Container */
    var hugridDiv = document.createElement("div");
    hugridDiv.id  = "hugrid";

    /* Left Margin Column */
    leftDiv = document.createElement("div");
    leftDiv.className = "mline mlineL";
    hugridDiv.appendChild(leftDiv);

    /* Create Columns */
    for (var i = 0; i < (columns - 1); i++) {
      colDiv = document.createElement("div");
      colDiv.className = "hugcol";
      hugridDiv.appendChild(colDiv);
      lineLDiv = document.createElement("div");
      lineLDiv.className = "lineL";
      colDiv.appendChild(lineLDiv);
      lineRDiv = document.createElement("div");
      lineRDiv.className = "lineR";
      colDiv.appendChild(lineRDiv);
    }

    /* Right Margin Column */
    rightDiv = document.createElement("div");
    rightDiv.className = "mline mlineR";
    hugridDiv.appendChild(rightDiv);

    document.body.appendChild(hugridDiv);

    /* If Rows */
    if (rowheight !== 0)  {
      /* Row Container */
      pageheight     = $(document.body).height();
      var hugridRows = document.createElement("div") ;
      hugridRows.id  = "hugridRows";
      /* Create Rows */
      for (var i = 0; i < (pageheight / rowheight); i++) {
        rowDiv = document.createElement("div");
        rowDiv.className = "hugrow";
        hugridRows.appendChild(rowDiv);
        lineB = document.createElement("div");
        lineB.className = "lineB";
        rowDiv.appendChild(lineB);
      }

      document.body.appendChild(hugridRows);
      // if we have reached this far,
      //  then upon creating the grid, toggle our indication of state
      window.hugrid.state.gridstate = "on" ;
    }

    /* Apply CSS Properties */
    $('#hugrid').css('width', pagewidth + pageUnits);

    if (typeof window.pageleftmargin === 'number') {
      $('#hugrid').css('left', pageleftmargin + pageUnits);
      $('#hugrid').css('margin', '0');
    } else if (typeof window.pagerightmargin === 'number') {
      $('#hugrid').css('right', pagerightmargin + pageUnits);
      $('#hugrid').css('left', 'auto');
      $('#hugrid').css('margin', '0');
    } else {
      if (pageUnits === '%') {
        $('#hugrid').css('left', ((100 - pagewidth) / 2) + pageUnits);
        $('#hugrid').css('margin-left', 'auto');
      } else {
        $('#hugrid').css('margin-left', '-' + (pagewidth / 2) + pageUnits);
      }
    }

    $('#hugrid div.hugcol').css('margin-left', columnwidth + colUnits);
    $('#hugrid div.hugcol').css('width', gutterwidth + colUnits);
    $('#hugridRows').css('margin-top', pagetopmargin + 'px');
    $('#hugridRows div.hugrow').css('margin-top', (rowheight - 1) + 'px');

    /* Create hugridUX and button */
    var hugridUX = document.createElement("div");
    hugridUX.id = "hugridUX";
    document.body.appendChild(hugridUX);
    $('#hugridUX').append('<div id="hugridButtonBkgd"></div><button id="hugridButton"></button>');
    $('#hugridButton').append('<span id="hugbuttonON">ON</span>');
    $('#hugridButton').append('<span id="hugbuttonOFF" style="display:none;">OFF</span>');

    /* On/Off Button - click functionality */
    $('#hugridButton').click(function () {
      $('#hugridButton').toggleClass('buttonisoff') ;
      $('#hugrid').toggle();
      $('#hugridRows').toggle();
      $("#hugridButton span").toggle();
      window.hugrid.toggleState() ;
    });
  };
  

function  initialCleanUp() {
    /* Remove Previously Existing Grid Elements */
    $('#hugrid').remove();
    $('#hugridRows').remove();
    $('#hugridUX').remove();
    window.hugrid.state.gridstate = 'off' ;
    }


  setgridonresize = function () {
    if ( window.hugrid.state.gridstate === 'off') {
      $('#hugridButton').toggleClass('buttonisoff') ;
      $('#hugrid').toggle();
      $('#hugridRows').toggle();
      $("#hugridButton span").toggle();
    }
  } ;

}