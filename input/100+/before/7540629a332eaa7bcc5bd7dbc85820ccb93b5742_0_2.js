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
        target = document.getElementById("section-"+theToggle);
        target.style.display = displaySetting;
        toggleexacttopic(target,document.getElementById("sectionatag-" + theToggle),theToggle,false);
    }
}