function(char, isAlternate)
{
    var name = "";
    switch(char)
    {
        case CHARACTERS.KEN: { name = "ken"; break;}
        case CHARACTERS.RYU: { name = "ryu"; break;}
    }
    this.selected_ = char;
    this.currentStance_ = name + "_selected";
    this.folder_ = name + (!!isAlternate ? "2" : "");
}