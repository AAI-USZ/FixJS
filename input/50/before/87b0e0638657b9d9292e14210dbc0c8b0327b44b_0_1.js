function()
    {
        if (currentDeezerTimeout) // Handle song fast zapping
        {
            window.clearTimeout(currentDeezerTimeout);
        }

        currentDeezerTimeout = window.setTimeout(sendTrack, 1000); // As the duration may be not available.
    }