function (agency) {
            if (agency[lhs] == undefined) return false;
            return agency[lhs].toLowerCase().indexOf(rhs) > -1;
        }