function main() {
    AppMobi.device.hideSplashScreen();

    var access_token = getValueFromUrl('access_token');
    if (access_token) {
        Player = JSON.parse(getValueFromUrl('player'));
        localStorage["player"] = JSON.stringify(Player);
        localStorage["fb_token"] = access_token;
        Navigation.GoTo.MainMenu();
    } else if (localStorage["player"]) {
        Player = JSON.parse(localStorage["player"]);
        Navigation.GoTo.MainMenu();
    } else {
        Navigation.GoTo.Login();
    }

    return false;
}