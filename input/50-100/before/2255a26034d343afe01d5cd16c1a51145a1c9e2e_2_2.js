function() {
        // Clear records
        this.results = [];
        
        // Loop through all records and store their results with a tag
        for (var num in this.records) {
            // Convert the total time to seconds
            var time = cp.math.convert(this.records[num].total, 1000, 2);
            
            var tag = this.records[num].id;
            this.results.push({
                name: tag,
                val: time });
            
            // Clear total from records
            this.records[num].total = 0;
        }
                
        // Display the resuls
        this.display();
    }