function(){
			var object2 = create();
			var object1 = create();

			var methods = [];

			var one = function(){
				methods.push(1);
			};
			var two = function(){
				methods.push(2);
			};

			object1.addEvent('event', one);
			object2.addEvent('event', two);

			object1[fire]('event');
			expect(methods).toEqual([1]);
			object2[fire]('event');
			expect(methods).toEqual([1, 2]);
		}