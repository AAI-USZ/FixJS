function()
    {
        var pick = 0;
        var ar = this.completions.list;
        for (var i = 1; i < ar.length; i++)
        {
            if (ar[i].length < ar[pick].length)
                pick = i;
        }
        this.completions.index = pick;
    }