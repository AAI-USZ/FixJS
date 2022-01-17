function(frame)
    {
        SendInput_(frame,{IsDown:true,Button:BUTTONS.FORWARD});
        SendInput_(frame+1,{IsDown:true,Button:BUTTONS.FORWARD|BUTTONS.HARD_PUNCH});
    }