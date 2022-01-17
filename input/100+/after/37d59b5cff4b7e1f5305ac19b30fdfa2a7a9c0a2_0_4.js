function(tx) {

		var query="INSERT INTO Orders VALUES (null, '"+orderId+"', '"+escape(customerName)+"', '"+escape(customerStAddress)+"', '"+

		customerCity+"', '"+customerPostcode+"', '"+customerCountry+"', '"+customerTelephone+"', '"+

		customerEmail+"', '"+escape(deliveryAddress)+"', '"+escape(deliveryMethod)+"', '"+escape(paymentMethod)+"', '"+

		datePurchased+"', '"+escape(name)+"', '"+currency+"', '"+finalPrice+"', '"+additionalInfo+"')";

		

		tx.executeSql(query);

		}