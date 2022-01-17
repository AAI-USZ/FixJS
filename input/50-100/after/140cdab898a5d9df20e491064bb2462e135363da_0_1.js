function(event, data) {
            console.log(event, data);
            if(event === 'error') {
                console.log('error: ' + ERROR_CODES[data.originalEvent.currentTarget.error.code]);
                console.log('cannot play ' + this.model.get('name'));
                this.destroy();
            }
        }