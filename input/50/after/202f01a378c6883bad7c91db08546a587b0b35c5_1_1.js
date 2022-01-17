function (idx)
{
    if (idx === undefined)
        idx = 0;

    return getBlockAddr(this.memBlock, idx);
}