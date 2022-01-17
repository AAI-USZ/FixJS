function()
{
    this.ReleaseText();
    this.ResetKeys();
    this.managed_.Kill()
    this.managed_ = null;
    announcer_.Release();
}