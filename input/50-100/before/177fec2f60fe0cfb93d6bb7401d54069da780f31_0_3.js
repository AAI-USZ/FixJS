function() {
				this.timeout(1);
				var r = recur().at('09:14:21')
				var start = new Date('2012-012-31T23:42:15');
				var expected = new Date('2013-01-01T09:14:21');

				var l = later(1, true).getNext(r, start);
				l.should.eql(expected);
			}