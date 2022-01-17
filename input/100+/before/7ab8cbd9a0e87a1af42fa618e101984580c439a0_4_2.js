function(x) {
        var tortoise, hare;
        tortoise = hare = x;
        if (hare === types.EMPTY) { 
            return true; 
        }
        while (true) {
            if (!(types.isPair(hare))) { return false; }
            if (types.isPair(tortoise)) { 
                // optimization to get amortized linear time isList.
                if (tortoise._isList === true) { return true; } 
                tortoise = tortoise.rest(); 
            }
            hare = hare.rest();
            if (types.isPair(hare)) { 
                if (hare._isList) { tortoise._isList = true; return true; }
                hare = hare.rest(); 
                if (types.isPair(hare) && hare._isList) { tortoise._isList = true; return true; }
            }
            if (hare === types.EMPTY) { 
                // optimization to get amortized linear time isList.
                tortoise._isList = true;
                return true; 
            }
            if (tortoise === hare) { return false; }
        }
    }