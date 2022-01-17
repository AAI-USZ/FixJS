function(index) {
    if(index < 0) throw new OutOfBoundsException();
     
    if(this.head === null) {
        console.log('List is empty.');
        return;
     }
    
    var previous = null;
    var record = this.head; 
    var count = 0;

    
    //console.log('record: ' + record.data + ', ' + record.next);
        
    while(count !== index) {
        previous = record;
        if(record.next === null) throw new OutOfBoundsException();
        else  {
            record = record.next;
            count++;    
        }
        
        //console.log('record: ' + record.data + ', ' + record.next);
    }

    console.log('removed item ' + record.data + ' at index ' + index);
    
    //if(record.next
    
    if(record.next === null) {
        //var nullNode = null;
        //record.data = null;
        //record.next = null;
        //record = 4000;
        previous.next = null;
        console.log("replaced by " +  null);
    }
    else {        
        console.log(" replaced by " + record.next.data);
        record.data = record.next.data;
        record.next = record.next.next;
    }
         
     /*
     //Check bounds
     if(index < 0) throw new OutOfBoundsException();
     
     if(this.head === null) {
        console.log('List is empty.');
        return;
     }
     
     if(index === 0) {
        this.head = this.head.next;
        return;
     }
     
    var record = this.head; 
    var count = 0;
    
    while(count != index) {
        if(record.next === null) throw new OutOfBoundsException();
        else  {
            record = record.next;
            count++;    
        }
    }
    
    console.log('removed item ' + record.data + ' at index ' + index);
    
    if(record.next !== null) {
        console.log('removed not null');
        record.data = record.next.data;
        record.next = record.next.next;    
    }
    else { console.log('removed and null');
        record.data = null;
        record.next = null;
        record = null;
    }*/
}