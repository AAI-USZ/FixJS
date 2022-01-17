function(data) {    
    if(this.head === null) {
        console.log('The list is empty');

        this.head = new Node();
        this.head.data = data;
    }
    else {
        console.log('The list is not empty');
        var node = new Node();
        node.data = data;
                
        var record = this.head;
        
        while(record.next !== null) {
            record = record.next;
        }
        
        record.next = node;
        console.log(record.data + ', ' + record.next.data);
    }
    
    console.log('added: ' + data);
}