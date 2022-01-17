function(event)
    {
        // Handle numeric value increment/decrement only at this point.
        if (!this._isEditingName && this._handleUpOrDownValue(event))
            return true;

        return false;
    }