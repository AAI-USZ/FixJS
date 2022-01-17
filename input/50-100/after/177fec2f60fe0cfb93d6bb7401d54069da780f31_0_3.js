function() {
				this.timeout(1);
				var r = recur().at('09:14:21')
				var start = new Date(2012, 11, 31, 23, 42, 15);
				var expected = new Date(2013,0,1,9,14,21);

				var l = later(1, true).getNext(r, start);
				l.should.eql(expected);
			}