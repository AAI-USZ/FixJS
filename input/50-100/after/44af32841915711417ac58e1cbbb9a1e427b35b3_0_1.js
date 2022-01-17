function()
{
    var next_article = parseInt(GM_getValue("next_article", "0"));
    var date = new Date();
    var stamp = date.getTime();
    
    if(stamp >= next_article)
    {
        var new_time = stamp + ((Math.random() * 59 + 1) * 60000);
        GM_setValue("next_article", new_time.toString());
        showArticle();
    }
}