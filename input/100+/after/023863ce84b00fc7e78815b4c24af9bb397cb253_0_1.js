function() {
    EventSystem.init();
    Menu.init();

    playlistManager = new PlaylistsManager();

    LoadingBar.init();
	Volume.init();
	TranslationSystem.init();
    SpotifyImporterPopup.init();
    SettingsPopup.init();
    Search.init();
    Queue.init();
    Ping.init();
    Notifications.init();
    player = new PlayerManager();
    player.init();
    Timeline.init();
    InfoPopup.init();
    VideoInfo.init();
    FlattrFinder.init();
    AutoFlattrer.init();
    BottomPanel.init();
    UserManager.init(USER);
    ExternalUserPage.init();
    ExternalUserSubscriptions.init();
    TopMenu.init();
    Toplist.init();
    URIManager.init();
    LayoutManager.init();

    updateFlattrPuffText();
    EventSystem.addEventListener('language_changed', updateFlattrPuffText);
    
    $('.login-link').click(LoadingBar.show);

    $('.playlists').click(function(event) {
        if ($(event.target).hasClass('playlists')) {
            Utils.deSelectSelectedVideos();
        }
    });
}