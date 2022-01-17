function (Y, theTopic)
{
    var section = document.getElementById("section-"+theTopic);  // CONTRIB-3283
    var secatag = document.getElementById("sectionatag-" + theTopic);
    if ((section != null) && (secatag != null))
    {
        toggleexacttopic(section,secatag,theTopic,true,false);
    }
//alert("show_topic " + theTopic);
}