function() {
				this.timeout(1);
				var r = recur().on(7).hour();
				var start = new Date('2012-02-28T22:34:15Z');
				var expected = new Date('2012-02-29T07:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			}