function(frame)
    {
        SendInput_(frame,[{IsDown:true,Button:BUTTONS.FORWARD}]);
        SendInput_(frame+1,[{IsDown:true,Button:BUTTONS.FORWARD},{IsDown:true,Button:BUTTONS.HARD_PUNCH}]);
    }