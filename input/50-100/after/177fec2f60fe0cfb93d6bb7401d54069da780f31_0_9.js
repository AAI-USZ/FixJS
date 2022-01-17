function() {
			this.timeout(1);
			var r = recur().on(6).hour();
			var start = new Date(2012, 5, 5);
			var expected = new Date(2012,5,5,6,0,0);

			var l = later(1, true).getNext(r, start);
			l.should.eql(expected);
		}