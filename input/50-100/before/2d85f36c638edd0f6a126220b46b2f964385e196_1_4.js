function ()
{
    assert (
        this.first !== null,
        'cannot remove first, list empty'
    );

    var item = this.first.item;

    this.first = this.first.next;

    if (this.first === null)
        this.last = null;

    return item;
}