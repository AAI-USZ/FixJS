function()
    {
        cancel(); // In case we switch song before the scrobble (as the duration is async, we may warn the extension too late)
        
        if (currentDeezerTimeout) // Handle song fast zapping
        {
            window.clearTimeout(currentDeezerTimeout);
        }

        currentDeezerTimeout = window.setTimeout(sendTrack, 1000); // As the duration may be not available.
    }