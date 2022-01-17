function() {
                var self = this;
                var markup = '<div id="' + this.id + '" class="jqPopup hidden">\
	        				<header>' + this.title + '</header>\
	        				<div><div style="width:1px;height:1px;-webkit-transform:translate3d(0,0,0);float:right"></div>' + this.message + '</div>\
	        				<footer>\
	        					<a href="javascript:;" class="'+this.cancelClass+'" id="cancel">' + this.cancelText + '</a>\
	        					<a href="javascript:;" class="'+this.doneClass+'" id="action">' + this.doneText + '</a>\
	        				</footer>\
	        			</div></div>';
                $(this.container).append($(markup));
                
                $("#" + this.id).bind("close", function(){
                	self.hide();
                })
                
                if (this.cancelOnly) {
                    $("#" + this.id).find('A#action').hide();
                    $("#" + this.id).find('A#cancel').addClass('center');
                }
                $("#" + this.id).find('A').each(function() {
                    var button = $(this);
                    button.bind('click', function(e) {
                        if (button.attr('id') == 'cancel') {
                            self.cancelCallback.call(self.cancelCallback, self);
                            self.hide();
                        } else {
                            self.doneCallback.call(self.doneCallback, self);
                            if(self.autoCloseDone)
                                self.hide();
                        }
                        e.preventDefault();
                     });
                });
                self.positionPopup();
                $.blockUI(0.5);
                $('#' + self.id).removeClass('hidden');
                $('#' + self.id).bind("orientationchange", function() {
                    self.positionPopup();
                });
                
                this.onShow(this);
                
            }