function(){
        	var data = that.getdata();
        	console.log("this.save", data);
            my.prop.onsave(data);
            that.trigger("onsaved.tpledit", 
            		$.extend(
            			data,
            			$.extend(that.position(), { width: that.width(), height: that.height() } )
            		)
            	);
        }