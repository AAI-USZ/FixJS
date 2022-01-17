function(){
        	var data = that.getdata();
            my.prop.onsave(data);
            that.trigger("onsaved.tpledit", 
            		$.extend(
            			data,
            			$.extend(that.position(), { width: that.width(), height: that.height() } )
            		)
            	);
        }