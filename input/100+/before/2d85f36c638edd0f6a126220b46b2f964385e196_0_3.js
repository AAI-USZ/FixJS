function ()
{
    // Start timing the analysis
    var startTimeMs = (new Date()).getTime();

    // Until a fixed point is reached
    for (;;)
    {
        if (this.instrWorkList.isEmpty() === false)
        {
            // Run one type flow analysis iteration
            this.instrItr();
        }

        else if (this.blockWorkList.isEmpty() === false)
        {
            // Run one live value analysis iteration
            this.blockItr();
        }

        // Both work lists are empty
        else
        {
            break;
        }
    }

    // Stop the timing
    var endTimeMs = (new Date()).getTime();
    var time = (endTimeMs - startTimeMs) / 1000;

    // Update the total analysis time
    this.totalTime += time;
}