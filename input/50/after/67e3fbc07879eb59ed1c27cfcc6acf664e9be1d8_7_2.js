function(id)
    {
        var p = this.GetRightMostPlayer();
        return !!p && p.id_ == id;
    }