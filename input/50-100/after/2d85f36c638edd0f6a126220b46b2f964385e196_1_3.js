function (item, itr)
{
    if (itr.current === null)
    {
        this.addLast(item);
    }
    else
    {
        itr.current.next = new LinkedList.Node(item, itr.current.next);
        this.length++;
    }
}