function() {
				delete blade.cb[filename];
				st.parentNode.removeChild(st);
				cb(new Error("Timeout Error: Blade Template [" + filename +
					"] could not be loaded.") );
			}