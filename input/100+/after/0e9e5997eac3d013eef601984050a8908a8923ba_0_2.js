function allToggle(state)
{
    var target;
    var displaySetting;

    if (state == false)
    {
        // All on to set off!
        if (ie == true)
        {
            displaySetting = "block"; // IE is always different from the rest!
        }
        else
        {
            displaySetting = "table-row";
        }
    }
    else
    {
        // Set all off to set on.
        displaySetting = "none";
    }

    for (var theToggle = 1; theToggle <= numToggles; theToggle++)
    {
        var target = document.getElementById("section-"+theToggle);
        var secatag = document.getElementById("sectionatag-" + theToggle);
        if ((target != null) && (secatag != null))
        {
            target.style.display = displaySetting;
            toggleexacttopic(target,secatag,theToggle,false,false);
        }
    //alert(theToggle);
    }
    // Now save the state of the toggles for efficiency...
    save_toggles();
}