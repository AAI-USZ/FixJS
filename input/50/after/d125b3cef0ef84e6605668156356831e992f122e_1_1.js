function (winControl) {
            winControl.addEventListener("aftershow", publish.bind(null, "show"));
            winControl.addEventListener("afterhide", publish.bind(null, "hide"));
        }