function (canvas, svg) {
        // Firefox, Chrome & Safari will (sometimes) not show an inlined background-image until the svg is connected to
        // the DOM it seems.
        var workaroundId = "rasterizeHTML_js_FirefoxWorkaround",
            uniqueId = module.util.getConstantUniqueIdFor(canvas),
            doNotGarbageCollect = getOrCreateHiddenDivWithId(canvas.ownerDocument, workaroundId + uniqueId);

        doNotGarbageCollect.innerHTML = svg;
        doNotGarbageCollect.className = workaroundId; // Make if findable for debugging & testing purposes
    }