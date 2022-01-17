function toggle(item) {
        var trails = $g.qsa("li", item)

        var opening = false;

        for (i = 0; i < trails.length; i++) {
            var trail = trails[i];

            //interestingly, style.display does not work in this case...
            var isVisible = trail.getClientRects().length > 0;

            if (!isVisible) {
                trail.style.display = "block";
                trail.setAttribute("was-hidden", "true");
                opening = true;
            } else if (trail.getAttribute("was-hidden") == "true") {
                trail.style.display = "none"
                opening = false;
            }
        }

        var count = $g.qs('.count', item);
        if (count && opening) {
            count.style.display = "none";
        } else if (count) {
            count.style.display = "block";
        }

    }