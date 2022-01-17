function(data){
    this.buffer += data;
    var doAgain = true;
    while(doAgain){
        doAgain = false;
        if(this.state == READ_SIZE){
            if(this.buffer.length >= JSONMAXSIZE_CHARS_HEADER){
                this.nextSize = parseInt(this.buffer.substr(0,JSONMAXSIZE_CHARS_HEADER));
                this.buffer = this.buffer.substring(JSONMAXSIZE_CHARS_HEADER);
                this.state = READ_JSON;
            }
        }

        if(this.state == READ_JSON){
            if(this.buffer.length >= this.nextSize){
                var json = JSON.parse(this.buffer.substr(0,this.nextSize));
                this.callBack(json);
                this.buffer = this.buffer.substring(this.nextSize+1); // a new line should be passed after json
                doAgain = true;
                this.state = READ_SIZE;
            }
        }
    }
}