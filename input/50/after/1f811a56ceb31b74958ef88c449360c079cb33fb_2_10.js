function()
    {
        this.ReleaseText();
        this.ResetKeys();
        managed_.Kill()
        managed_ = null;
        announcer_.Release();
    }