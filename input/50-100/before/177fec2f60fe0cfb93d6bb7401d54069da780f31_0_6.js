function() {
				this.timeout(1);
				var r = recur().on(6).dayOfMonth();
				var start = new Date('2012-012-31T23:42:15Z');
				var expected = new Date('2013-01-06T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			}