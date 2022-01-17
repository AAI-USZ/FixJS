function () {
			if (typeof document != "undefined") {
				var dom = document.createElement("div"),
					spy = jasmine.createSpy();
				dom.innerHTML = "<p></p><p></p><p></p><p></p>";
				Tools.loop(dom.querySelectorAll("p"), spy);
				expect(spy.callCount).toEqual(4);
			}
		}