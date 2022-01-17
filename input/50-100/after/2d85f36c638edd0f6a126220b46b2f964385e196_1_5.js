function (itr)
{
    assert (
        itr.valid(),
        'cannot remove item at iterator, iterator not valid'
    );

    if (itr.prev)
    {
        itr.prev.next = itr.current.next;
        this.length--;
    }
    else
    {
        this.remFirst();
    }
}