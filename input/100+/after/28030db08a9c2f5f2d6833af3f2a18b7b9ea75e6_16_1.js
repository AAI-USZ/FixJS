function() {

	

	/* 引入_inherits */

	var _inherits = function(subClass, superClass, className) {

		var key, proto, selfProps = subClass.prototype, clazz = new Function();



		clazz.prototype = superClass.prototype;

		proto = subClass.prototype = new clazz();

		for (key in selfProps) {

			proto[key] = selfProps[key];

		}

		subClass.prototype.constructor = subClass;

		subClass.superClass = superClass.prototype;



		// 类名标识，兼容Class的toString，基本没用

		if ("string" == typeof className) {

			proto._className = className;

		}

	};

	test("dispatchEvent", function() {

		expect(2);

		function myClass() {

			this.name = "myclass";

		}



		_inherits(myClass, baidu.lang.Class);// 通过继承baidu.lang.Class来获取它的dispatchEvent方法

			var obj = new myClass();

			obj.onMyEvent = function() {

				ok(true, "myEvent is dispatched");

			};



			var myEventWithoutOn = new (baidu.lang.Event)("MyEvent", obj);// 自定义事件对象,不以on开头

			var myEventWithOn = new (baidu.lang.Event)("onMyEvent")

			obj.dispatchEvent(myEventWithoutOn);

			obj.dispatchEvent(myEventWithOn);

		

		});



	test("addEventListener", function() {

		expect(2);

		function myClass() {

			this.name = "myclass";

		}



		_inherits(myClass, baidu.lang.Class);// 通过继承baidu.lang.Class来获取它的dispatchEvent方法

			var obj = new myClass();

			function listner(){ok(true, "listner is added");}

			

			var myEventWithoutOn = new (baidu.lang.Event)("onMyEvent", obj);

			obj.addEventListener("onMyEvent",listner,'onMyEvent');

			var yourEventWithoutOn = new (baidu.lang.Event)("YourEvent", obj);

			obj.addEventListener("YourEvent",listner,'YourEvent');

			

			obj.dispatchEvent("onMyEvent");

			obj.dispatchEvent("YourEvent");

		});

	

	test("addEventListener, more listeners", function() {

		expect(2);

		function myClass() {

			this.name = "myclass";

		}



		_inherits(myClass, baidu.lang.Class);// 通过继承baidu.lang.Class来获取它的dispatchEvent方法

			var obj = new myClass();

			var step = 0;

			function listner1(){

				step ++;

				equals(step, 1,  "listner1 is added");

			}

			function listner2(){

				step ++;

				equals(step, 2,  "listner2 is added");

			}

			

			var myEventWithoutOn = new (baidu.lang.Event)("onMyEvent", obj);

			obj.addEventListener("onMyEvent",listner1);

			obj.addEventListener("onMyEvent",listner1);

			obj.addEventListener("onMyEvent",listner2);

			

			obj.dispatchEvent(myEventWithoutOn);

		});



}