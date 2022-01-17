function(newWorkingCopy)
    {
        var oldWorkingCopy = this._workingCopy;
        if (this._content === newWorkingCopy)
            delete this._workingCopy;
        else
            this._workingCopy = newWorkingCopy;
        this.workingCopyChanged();
        this.dispatchEventToListeners(WebInspector.UISourceCode.Events.WorkingCopyChanged, {oldWorkingCopy: oldWorkingCopy, workingCopy: newWorkingCopy});
    }