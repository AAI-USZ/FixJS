function(char, isAlternate)
{
    var name = "";
    switch(char)
    {
        case CHARACTERS.KEN: { name = "ken"; break;}
        case CHARACTERS.RYU: { name = "ryu"; break;}

        case CHARACTERS.RANDOM1:
        case CHARACTERS.RANDOM2:
        {
            switch(this.currentStance_)
            {
                case "ryu": { return this.SetChar(CHARACTERS.RYU, isAlternate); }
                case "ken": { return this.SetChar(CHARACTERS.KEN, isAlternate); }
            };
        }
    }
    this.selected_ = char;
    this.currentStance_ = name + "_selected";
    this.folder_ = name + (!!isAlternate ? "2" : "");
}