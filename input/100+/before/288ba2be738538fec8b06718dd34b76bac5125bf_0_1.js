function() {
            var self = this;
            this._super();
               
            // Append message body
            self.$node.find('.message-body').append(self.options.body);
            
            if (self.options.cancelBtn !== '') {
                Button($('<button class="'+self.options.cancelBtnClass+'">'+self.options.cancelBtn+'</button>').appendTo(self.$node.find('.buttons')))
                    .on('click', self.cancel);
            }

            if (self.options.okBtn !== '') {
                Button($('<button class="'+self.options.okBtnClass+'">'+ 
                        self.options.okBtn+'</button>').appendTo(self.$node.find('.buttons')))
                    .on('click', self.ok);
            }
            if (self.options.style !== '') {
                self.$node.find('.message-icon').addClass(self.options.style);
            }
        }