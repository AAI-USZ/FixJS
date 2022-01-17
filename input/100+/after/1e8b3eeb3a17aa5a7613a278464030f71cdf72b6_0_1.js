function showNode(f) {
        
        disableVozmeSpeech();

        currentNode = nodes[f];
        
        var content = document.getElementById("_Content");
        content.innerHTML = renderMainContent(currentNode);

        var neighbor = document.getElementById("Neighborhood");
        neighbor.innerHTML = renderNeighborhood(currentNode);


        var prev = document.getElementById("_Prev");
        if (f == 0) {
            prev.innerHTML = '&nbsp;';
        }
        else {
            prev.innerHTML = '<a href="javascript:goPreviousExplicit()"><img src="/static/icons/left.png" height="32px" width="32px"/></a>';
        }

        var next = document.getElementById("_Next");
        if (f == nodes.length-1) {
            next.innerHTML = '&nbsp;';
        }
        else {
            next.innerHTML = '<a href="javascript:goNextExplicit()"><img src="/static/icons/right.png" height="32px" width="32px"/></a>';
        }

        prevID = nextID = null;
        
        for (var ii in currentNode.ins) {
            var xi = currentNode.ins[ii];
            var id = xi.id;
            var relationship = '';
            if (xi.via!=null) {
                relationship = xi.via.name;
            }
            if (relationship == 'next')
                prevID = id;
        }
        for (var ii in currentNode.outs) {
            var xi = currentNode.outs[ii];
            var id = xi.id;
            var relationship = '';
            if (xi.via!=null) {
                relationship = xi.via.name;
            }
            if (relationship == 'next')
                nextID = id;
        }
        var status = document.getElementById("Status");
        if ((prevID!=null) || (nextID!=null))
            status.innerHTML = ((prevID!=null) ? "<--" : "") + " | " + ((nextID!=null) ? "-->" : "");
        else
            status.innerHTML = '';
        
        updateFonts();
        
//        var ex8 = new Animator(
//            {
//                duration: 400,
//                interval: 40,
//                onComplete: function() {
//                }
//            }
//        ).addSubject(
//            new NumericalStyleSubject(
//                content.id,
//                "opacity",
//                0.1,
//                1.0)
//        );
//        ex8.toggle();

        $("#_Content").css({opacity: 1.0});

    }