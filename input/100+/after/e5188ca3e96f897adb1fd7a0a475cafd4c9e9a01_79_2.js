function(storage, max)
    {
        var object = this.objectView(storage);
        return FirebugReps.Obj.propIterator(object, max);
    }