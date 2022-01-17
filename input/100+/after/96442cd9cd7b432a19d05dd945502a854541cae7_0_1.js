function(e) {
        makeButton(e,function(e) {
            var link = e.target;
            while(!Element.hasClassName(link,"advancedLink"))
                link = link.parentNode;
            link.style.display = "none";
            $(link).next().style.display="block";
            layoutUpdateCallback.call();
        });
        e = null; // avoid memory leak
    }