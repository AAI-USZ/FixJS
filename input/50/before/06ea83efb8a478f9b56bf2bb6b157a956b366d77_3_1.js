function() {
        console.log("sample_ev0");
        ++counter;

        if(counter == 1) {
            this.delay(500, this);
            this.remove();
        }
    }