function (item)
{
    var newNode = new LinkedList.Node(item, null);

    if (this.first === null)
    {
        this.first = newNode;
        this.last = newNode; 
    }
    else
    {
        this.last.next = newNode;
        this.last = newNode;
    }

    this.length++;

    assert (
        this.last === newNode,
        'error adding new node to linked list'
    );
}