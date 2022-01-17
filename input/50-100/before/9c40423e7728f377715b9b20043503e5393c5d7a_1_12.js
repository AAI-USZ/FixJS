function (normalSprite, selectedSprite, three, four, five)//overloaded function
{
    var ret = new cc.MenuItemSprite();
    //when you send 4 arguments, five is undefined
    if (five) {
        ret.initFromNormalSprite(normalSprite, selectedSprite, three, four, five);
    }
    else if (four) {
        return cc.MenuItemSprite.create(normalSprite, selectedSprite, null, three, four);
    }
    else {
        return cc.MenuItemSprite.create(normalSprite, selectedSprite, three, null, null);
    }
    return ret;
}