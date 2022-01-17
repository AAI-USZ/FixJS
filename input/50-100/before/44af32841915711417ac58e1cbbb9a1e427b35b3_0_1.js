function()
{
    var last_update = GM_getValue("last_update", "0");
    var date = new Date();
    var stamp = date.getTime();
    
    if(stamp - last_update >= (Math.random() * 59 + 1) * 60000)
    {
        GM_setValue("last_update", stamp.toString());
        showArticle();
    }
}