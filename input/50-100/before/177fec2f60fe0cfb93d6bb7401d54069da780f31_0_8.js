function() {
				this.timeout(1);
				var r = recur().on(12).dayOfYear();
				var start = new Date('2012-012-31T23:42:15Z');
				var expected = new Date('2013-01-12T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			}