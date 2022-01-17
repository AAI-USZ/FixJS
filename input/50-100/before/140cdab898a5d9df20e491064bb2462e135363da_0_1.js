function(event) {
            console.log(event);
            if(event === 'error') {
                console.log('cannot play ' + this.model.get('name'));
                this.destroy();
            }
        }