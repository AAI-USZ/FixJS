function(value, offset)
    {
        if (offset >= 2 && value.substr(offset-2, 2) === "()")
            return offset-1;
        return offset;
    }