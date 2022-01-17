function(flag)
{
    this.state_ = (this.state_ | (flag)) ^ (flag);
}