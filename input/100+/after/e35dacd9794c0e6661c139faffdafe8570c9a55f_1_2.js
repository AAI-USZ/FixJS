function(crc) {
        	try {
        		var code = Builder.getCode(crc.el);
        		if (code != crc.content && !crc.el.dirty) {
        			// mark as dirty
        			//crc.el.dirty = true;
        			//invoke("builder:updateCRCFile&dirty="+crc.el.id);
        		} else if (code == crc.content && crc.el.dirty) {
        			crc.el.dirty = false;
					crc.el.removeClassName("dirty");
        			invoke("builder:updateCRCFile&clean="+crc.el.id);
        		}
        	} catch(e){};
        }