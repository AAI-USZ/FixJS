function (doc, svg) {
        // Firefox and Chrome will (sometimes) not show an inlined background-image until the svg is connected to
        // the DOM it seems.
        var workaroundId = "rasterizeHTML_js_FirefoxWorkaround",
            doNotGarbageCollect;

        if (window.navigator.userAgent.indexOf("Firefox") >= 0 || window.navigator.userAgent.indexOf("Chrome") >= 0) {
            doNotGarbageCollect = doc.getElementById(workaroundId);
            if (doNotGarbageCollect) {
                doNotGarbageCollect.parentNode.removeChild(doNotGarbageCollect);
            }
            doNotGarbageCollect = doc.createElement("div");
            doNotGarbageCollect.innerHTML = svg;
            doNotGarbageCollect.style.visibility = "hidden";
            doNotGarbageCollect.style.width = "0px";
            doNotGarbageCollect.style.height = "0px";
            doNotGarbageCollect.id = workaroundId;
            doc.getElementsByTagName("body")[0].appendChild(doNotGarbageCollect);
        }
    }