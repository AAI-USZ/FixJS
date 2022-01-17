function (item, itr)
{
    if (itr.prev === null)
        this.addFirst(item);
    else
        itr.prev.next = new LinkedList.Node(item, itr.current);
}