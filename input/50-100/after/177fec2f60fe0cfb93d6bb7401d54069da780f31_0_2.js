function() {
				this.timeout(1);
				var r = recur().on(6).hour();
				var start = new Date(2012, 11, 31, 23, 42, 15);
				var expected = new Date(2013,0,1,6,0,0);

				var l = later(1,true).getNext(r, start);
				
				l.should.eql(expected);
			}