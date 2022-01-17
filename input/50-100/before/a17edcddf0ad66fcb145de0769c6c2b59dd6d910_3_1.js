function (Example) {
	
	describe("test Example", function () {
		
		it("should be a function", function () {
			expect(typeof Example).toEqual("function");
		});
		
		it("should return Example", function (done) {
			expect(Example()).toEqual("Example");
		});

	});
	
}