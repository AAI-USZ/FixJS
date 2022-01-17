function initialize() {
//	console.log("-=-=- In initialize() ");
	sp = getSpotifyApi(1);
    ui = sp.require("sp://import/scripts/ui");
	models = sp.require('sp://import/scripts/api/models');
    views = sp.require("sp://import/scripts/api/views");
	application = models.application;

	player = models.player;

    setUpObserve();
    activePlaylist = new models.Playlist();
//	console.log( "activePlaylist now exists; it's " + activePlaylist.length + " long ");

    //AaronD: testing playlist view...
    playedList = new views.List(activePlaylist);
    playedList.node.classList.add("sp-light");
    document.getElementById("played-list").appendChild(playedList.node);

    application.observe(models.EVENT.ARGUMENTSCHANGED, handleArgs);

    if (!localStorage["apiKey"]) {
        localStorage["apiKey"] = apiKey;
    } else {
        apiKey = localStorage["apiKey"];
    }

    if (!localStorage["apiHost"]) {
        localStorage["apiHost"] = apiHost;
    } else {
        apiHost = localStorage["apiHost"];
    }

    if (!localStorage["tpID"]) {
        tpID = null;
    } else {
        tpID = localStorage["tpID"];
        var siteURL = "http://" + apiHost + "/api/v4/catalog/read?api_key=" + apiKey + "&id=" + tpID + "&results=100";
        $('._en_catalog_site').show().children().attr('href', siteURL);
    }
    $("#_api_key").val(localStorage["apiKey"]);
    $("#_host").val(localStorage["apiHost"]);

    //Select the Artist field and allow Enter to Submit - quickstart FTW!
    $(document).ready(function () {
        $("#param_form").keydown(function (event) {
            if (event.keyCode === 13) {
                makePlaylist();
                return false;
            }
        });
        $("#_artist").select();
    });

    $("#_catalog_id").val(tpID);

    // populate list of taste profiles
    retrieveListOfProfiles();

    dynplayModel = new DynplayModel();
    nowPlayingView = new NowPlayingView({
        model:dynplayModel,
        el:$("#nowplaying")
    });

    artistUrlsView = new ArtistUrlsView({
        model:dynplayModel,
        el:$("#urls_regions")
    });

    biographiesView = new BiographiesView({
        model:dynplayModel,
        el:$("#biographies_regions")
    });

    dynplayModel.set({"myview":nowPlayingView});
    dynplayModel.set({"urlview":artistUrlsView});
    dynplayModel.set({"bioview":biographiesView});
}