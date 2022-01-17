function() {
    
     if(this.head === null) {
        console.log('List is empty.');
        return;
     }
     
    var record = this.head;
    var count = 0;
    
    console.log(record.data + ' at ' + count);
    count++;


    while(record.next !== null) {
        record = record.next;
        console.log(record.data + ' at ' + count);

        count++;
    }
}