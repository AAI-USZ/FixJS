function() {
				this.timeout(1);
				var r = recur().on(7).month();
				var start = new Date('2012-12-31T23:42:15Z');
				var expected = new Date('2013-07-01T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			}