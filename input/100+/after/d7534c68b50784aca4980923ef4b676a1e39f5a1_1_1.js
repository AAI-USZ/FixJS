function receiveResults( data ) {
      var message = JSON.parse( data ),
          li,
          b,
          ol,
          a,
          oneTest,
          time,
          type,
          fail = 0,
          pass = 0,
          total = 0,
          oneTest;

      // If name is present, we know this is a testDone post, so push results into array.
      if ( message.name ) {
        results_arr.push( message );
      } else {

        // this message is a Done post, so tally up everything and build the list item
        ol = create( "ol" );
        ol.style.display = "none";

        // build inner list of results
        oneTest = results_arr.pop();
        while( oneTest ) {
          li = create( "li" );
          li.className = oneTest.failed ? "fail" : "pass";
          li.innerHTML = oneTest.name + " <b class='counts'>(<b class='failed'>" +
            oneTest.failed + "</b>, <b class='passed'>" +
            oneTest.passed + "</b>, " +
            oneTest.total + ")</b>";
          ol.appendChild( li );
          // set to displayed if tests failed
          if ( oneTest.failed ) {
            ol.style.display = "block";
          }
          oneTest = results_arr.pop();
        }

        a = create( "a" );
        a.innerHTML = "Run test in new window";
        a.href = currentTest.path;
        a.target = "_blank";

        fail = message.failed;
        pass = message.passed;
        total = message.total;
        time = message.runtime;

        type = currentTest.name + " Tests";

        mainB = create( "b" );
        mainB.innerHTML = "<span class='test-name'>" + type +
          "&nbsp;</span>completed in " +
          time + " milliseconds " + " <b class='counts'>(<b class='failed'>" +
          fail + "</b>, <b class='passed'>" +
          pass + "</b>, " + total + ")</b>";

        // set up click listener for expanding inner test list
        mainB.addEventListener( "click", function( e ) {
          var next = e.target.nextSibling.nextSibling,
              display = next.style.display;
          next.style.display = display === "none" ? "block" : "none";
        }, false );

        // build mainLi, append all children and then append to result list
        mainLi.className = fail ? "fail" : "pass";
        mainLi.removeChild( mainLi.firstChild );
        mainLi.appendChild( mainB );
        mainLi.appendChild( a );
        mainLi.appendChild( ol );

        // update running totals
        totalRun += total;
        totalFail += fail;
        totalPass += pass;
        totalTime += time;

        advance();
      }
    }