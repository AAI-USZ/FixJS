function() {

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

		}