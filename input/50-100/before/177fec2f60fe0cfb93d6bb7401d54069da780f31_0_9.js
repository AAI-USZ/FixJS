function() {
			this.timeout(1);
			var r = recur().on(6).hour();
			var start = new Date('2012-06-05');
			var expected = new Date('2012-06-05T06:00:00');

			var l = later(1, true).getNext(r, start);
			l.should.eql(expected);
		}