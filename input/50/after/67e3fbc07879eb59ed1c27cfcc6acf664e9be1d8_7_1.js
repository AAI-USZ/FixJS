function(id)
    {
        var p = this.GetLeftMostPlayer();
        return !!p && p.id_ == id;
    }