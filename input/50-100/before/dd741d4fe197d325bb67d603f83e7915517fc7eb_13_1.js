function()
{
    var value = this.GetEnergy();
    if(value >= ENERGYBAR.MAX_LEVEL2)
        return ENERGYBAR.LEVELMAXED;
    else if(value >= ENERGYBAR.MAX_LEVEL1)
        return ENERGYBAR.LEVEL2;
    else if(value >= ENERGYBAR.MAX_LEVEL0)
        return ENERGYBAR.LEVEL1;
    else
        return ENERGYBAR.LEVEL0;

}