function(a,b) {
        if (a.length != b.length) return false;
        for (var i = 0; i < b.length; i++) {
            if (a[i].compare) { 
                if (!a[i].compare(b[i])) return false;
            }
            if (a[i] !== b[i]) return false;
        }
        return true;
    }