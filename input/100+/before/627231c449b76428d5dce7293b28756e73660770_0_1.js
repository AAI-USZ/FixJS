function () {



    // Hide the body area until it is fully loaded in order to prevent flickrs

    $('#content').css('visibility', 'visible');



    // Initiate KnockoutJS binding which creates all the tiles and binds the whole

    // UI to viewModel.

    ko.applyBindings(viewModel);



    // See if user has a previous session where page setup was stored

    var cookie = readCookie("p");

    if (cookie != null && cookie.length > 0) {

        try {

            viewModel.loadSectionsFromString(cookie);

        } catch (e) {

            // Failed to load saved tiles. Load the default tiles.

            viewModel.loadSectionsFromString(DefaultTiles);

        }

    }

    else {

        // No cookie, load default tiles. Defined in Tiles.js

        viewModel.loadSectionsFromString(DefaultTiles);

    }



    var addedApps = readCookie("add");

    if (addedApps != null) {

        var tileNames = addedApps.split(",");

        _.each(tileNames, function (name) {

            if (!_.isEmpty(name)) {

                var builder = TileBuilders[name];

                var newTileDef = builder(_.uniqueId(name));

                var newTile = new Tile(newTileDef, ui, viewModel);

                newTile.index = 0;



                _.each(viewModel.sections()[0].tiles(), function (tile) {

                    tile.index++;

                });

                viewModel.sections()[0].tiles.push(newTile);



                createCookie("add", "");

            }

        });

    }



    // Whenever tile changes due to drag & drop or removing a tile,

    // save the position of the tiles in the cookie.

    viewModel.onTileOrderChange = function () {

        var newOrder = viewModel.toSectionString();

        if (newOrder !== DefaultTiles) {

            createCookie("p", newOrder, 2);



            if (!window.currentUser.isAnonymous) {

                $.get("SaveTiles.aspx");

            }

        }

    }



    $(window).resize(function () {

        viewModel.resize();

    });



    // Mouse wheel behavior for side scrolling.

    $("body").on("mousewheel", function (event, delta, deltaX, deltaY) {

        window.scrollBy(-delta * 50, 0);

    });



    $("#navbar").tooltip({

        title: "I am still here. Come here to go back to Dashboard",

        animate: true,

        placement: 'bottom',

        trigger: 'manual'

    });





    // Handles browser back button. When user presses the back button,

    // it detects it and closes the current app.

    $(window).hashchange(function () {

        var hash = location.hash;



        if (hash == "" || hash == "#") {

            if (viewModel.appRunning)

                viewModel.closeApp();

        }

    })



    // The google search bar behavior on the navigation bar.

    $('#googleSearchText').keypress(function (e) {

        if (e.keyCode == 13)

            $('#googleForm').submit();

    });



    // Supports only IE 9+, Chrome, Firefox, Safari

    if ($.browser.msie && parseInt($.browser.version) < 9)

        $("#browser_incompatible").show();



}