function Menu(){
    var buttonWidth = 288;
    var buttonHeight = 50;
    return [
        UITitle('FORGE', WIDTH/2, 270),
        UIButton('Single Player', WIDTH/2 - (buttonWidth/2), 450 - (buttonHeight *2), buttonWidth, buttonHeight, showGame),
        UIButton('Multiplayer', WIDTH/2 - (buttonWidth/2), 450 - buttonHeight, buttonWidth, buttonHeight, showGame),
        UIButton('Settings', WIDTH/2 - (buttonWidth/2), 450, buttonWidth, buttonHeight, showSettings),
        UIButton('Choose Map', WIDTH/2 - (buttonWidth/2), 450 + buttonHeight, buttonWidth, buttonHeight, chooseMap),
        UIButton('Help', WIDTH/2 - (buttonWidth/2), 450 + (buttonHeight *2), buttonWidth, buttonHeight),
    	UITextbox('name', 50, 50, 200, 40)
    ];
}