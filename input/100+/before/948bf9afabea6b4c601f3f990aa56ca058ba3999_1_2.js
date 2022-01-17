function(index) {
     //Check bounds
     if(index < 0) throw new OutOfBoundsException();
     
    var record = this.head; 
    var count = 0;

    
    while(count != index) {
        if(record.next === null) throw new OutOfBoundsException();
        else  {
            record = record.next;
            count++;    
        }
    }
    
    console.log('removed item ' + record.data + ' at index ' + index + " replaced by " + record.next.data);
    
    record.data = record.next.data;
    record.next = record.next.next;
    
    return record.data;
    
}