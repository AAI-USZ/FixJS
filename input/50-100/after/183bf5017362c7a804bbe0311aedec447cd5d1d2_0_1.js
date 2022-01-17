function(){

		

		expect(L.version).toBeDefined();

		

		var L2 = L.noConflict();

		this.after(function () {

			window.L = L2;

		});



		expect(L).toEqual('test');

		expect(L2.version).toBeDefined();

	}