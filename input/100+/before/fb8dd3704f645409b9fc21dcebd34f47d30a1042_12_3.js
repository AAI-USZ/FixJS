function createInput(inputType) {
							var dateTimeInput = self._dateTimeInput = new DateTimeInput({
								type: inputType
							});
							dateTimeInput.addEventListener("change", function(e) {
								self.properties.__values__.value = e.value;
								self.fireEvent("change",e);
							});
							dateTimeInput.min = self.min;
							dateTimeInput.max = self.max;
							View.prototype.add.call(self,dateTimeInput);
						}