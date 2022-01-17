function (item)
{
    this.first = new LinkedList.Node(item, this.first);

    if (this.last === null)
        this.last = this.first;

    this.length++;
}