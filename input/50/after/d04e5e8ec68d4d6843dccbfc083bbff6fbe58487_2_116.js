function (cfg) {
		        expect(cfg.startFile.encoding).toEqual("iso-8859-1");//Ivan: Failing on this, doesn't seem to like this encoding (does webinos support this standard?).
		    }