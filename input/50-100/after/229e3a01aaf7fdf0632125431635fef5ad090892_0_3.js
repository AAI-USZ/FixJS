function(json) {
            var data;
            if(this.connection.readyState === 1) {
                console.log('gameclient sendmg. bison:'+this.useBison+' data:'+json);
                if(this.useBison) {
                    data = BISON.encode(json);
                } else {
                    data = JSON.stringify(json);
                }
                this.connection.send(data);
            }
        }