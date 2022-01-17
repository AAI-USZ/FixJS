function(errorCount)
    {
        var firebugButton = Firefox.getElementById("firebug-button");
        if (errorCount && Firebug.showErrorCount)
        {
            if (firebugButton)
            {
                firebugButton.setAttribute("showErrors", "true");
                firebugButton.setAttribute("errorCount", errorCount);
            }
        }
        else
        {
            if (firebugButton)
            {
                firebugButton.removeAttribute("showErrors");

                // Use '0', so the horizontal space for the number is still allocated.
                // The button will cause re-layout if there are more than 9 errors.
                firebugButton.setAttribute("errorCount", "0");
            }
        }
    }