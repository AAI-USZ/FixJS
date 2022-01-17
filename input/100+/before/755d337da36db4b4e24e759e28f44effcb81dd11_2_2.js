function(event){
			$("#totalAmount_" + event.data.productId).text(event.target.value * event.data.singlePrice);
			for (i = 0; i < shoppingcard_data.length; i++) {
				if(shoppingcard_data[i].productId === event.data.productId){
					shoppingcard_data[i].quantity = event.target.value;
					break;
				}
			}
			self.listener.publish(event,"MyCart",[self.phrescoapi.productArray]);
			self.subtotalAmount.text("SubTotal: $" + self.totalCalc(shoppingcard_data));
		}