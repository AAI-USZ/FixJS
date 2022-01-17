function(isDown,keyCode,frame)
{
    if(!!isDown)
    {
        if(!this.isCharSelected_)
        {
            var direction = null;
            if(keyCode == this.Down) direction = CONSTANTS.DOWN;
            else if(keyCode == this.Up) direction = CONSTANTS.UP;
            else if(keyCode == this.Left) direction = CONSTANTS.LEFT;
            else if(keyCode == this.Right) direction = CONSTANTS.RIGHT;
            else if(keyCode == this.P1 || keyCode == this.P2 || keyCode == this.P3 || keyCode == this.K1 || keyCode == this.K2 || keyCode == this.K3)
            {
                /*
                if(this.selected_ == CHARACTERS.RYU
                    || this.selected_ == CHARACTERS.KEN
                    || this.selected_ == CHARACTERS.MBISON)
                */
                if(this.currentStance_ == "ken"
                    || this.currentStance_ == "ryu")
                {
                    this.isCharSelected_ = true;
                    this.chooseCharacterFn_(this);
                    this.isAlternateChar_ = (keyCode == this.K1 || keyCode == this.K2 || keyCode == this.K3);
                    if(this.getOtherCharacterFn_() == this.selected_)
                    {
                         this.isAlternateChar_ = !this.getOtherIsAlternateFn_()
                    }
                    this.SetChar(this.selected_, this.isAlternateChar_);
                }
            }

            if(!!direction)
            {
                var mustChange = (this.selected_ == CHARACTERS.RANDOM1 || this.selected_ == CHARACTERS.RANDOM2);
                this.changeCharacterFn_(direction);

                if(!!mustChange && (this.selected_ != CHARACTERS.RANDOM1 || this.selected_ != CHARACTERS.RANDOM2))
                {
                    this.randomSelect_ = 0;
                    this.randomCharFace_.Element.style.display = "none";
                }
                this.ShowCharacter();
            }
            if(!!this.isCharSelected_)
            {
                switch(this.currentStance_)
                {
                    case "ken_selected": this.selected_ = CHARACTERS.KEN; break;
                    case "ryu_selected": this.selected_ = CHARACTERS.RYU; break;
                };
            }
       }
    }
}