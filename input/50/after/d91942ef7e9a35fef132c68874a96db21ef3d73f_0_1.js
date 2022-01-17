function(pt) {
            if (typeof pt === "string") {
                return congruency.points[pt];
            } else {
                return pt;
            }
        }