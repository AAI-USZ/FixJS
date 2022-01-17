function($, Clazz, Widget) {

    function ShoppingCart() {
    }

    ShoppingCart.prototype = new Clazz();    
    ShoppingCart.prototype = new Widget(); 

    ShoppingCart.prototype.mainNode = undefined;
    ShoppingCart.prototype.mainContent = undefined;
    ShoppingCart.prototype.apiHost = undefined;
    ShoppingCart.prototype.apiPort = undefined;
    ShoppingCart.prototype.hideItems = undefined;
    ShoppingCart.prototype.listener = undefined;
    ShoppingCart.prototype.phrescoapi = undefined;
    ShoppingCart.prototype.api = undefined;
    ShoppingCart.prototype.dataItem = undefined;
    ShoppingCart.prototype.categoryId = undefined;
    ShoppingCart.prototype.productId = undefined;

    ShoppingCart.prototype.initialize = function(container, listener, phrescoapi, api) {
		listener.subscribe("ShoppingCart",this,"onHashChange");
		this.mainNode = container;
		this.listener = listener;
        this.phrescoapi = phrescoapi;
        this.hideItms = [];
        this.api = api; 
    };

    ShoppingCart.prototype.setMainContent = function() {
		var self = this,
		shoppingcard_data = self.dataItem, mainContent, topH3, productContainer, backHref, shoppingCarth5,
		checkoutcol1Div, productsDiv, checkoutcol2Div, quantityDiv, checkoutcol3Div, amountDiv, checkoutcol4, removeDiv, 
		remProductId, checkoutrow2, checkoutvaluecol1, co_col1position1, co_product_image,
		co_product_description, checkoutvaluecol2, checkoutvaluecol3, checkoutvaluecol4, data, clear1, subtotal, clear2, buttons, button1, button2, event, j, i;

        mainContent = $('<div></div>');
        topH3 = $('<h3>product Checkout</h3>');
        productContainer = $('<div class="productcontainer">');

		backHref = $('<span style="float:right;text-decoration:none;"><a href="#" class="back_buttonstyle">Back</a></span>');
		
		shoppingCarth5 = $('<h5> My Shopping Cart</h5>');
		
		checkoutcol1Div = $('<div class="checkoutcol1"> ');
		productsDiv = $('<div class="co_col1position1">Products</div> ');
		checkoutcol1Div.append(productsDiv);
		
		checkoutcol2Div = $(' <div class="checkoutcol2">');
		quantityDiv = $('<div class="co_col1position2">Quantity</div> ');
		checkoutcol2Div.append(quantityDiv);
		
		checkoutcol3Div = $(' <div class="checkoutcol3">');
		amountDiv = $('<div class="co_col1position2">Total Amount</div> ');
		checkoutcol3Div.append(amountDiv);
		
		checkoutcol4 = $(' <div class="checkoutcol4">');
		removeDiv = $('<div class="co_col1position2">Remove Item</div> ');
		checkoutcol4.append(removeDiv);
		
		$(backHref).bind('click', {categoryId : self.categoryId, productId : self.productId},function(event){

			if((event.data.categoryId !== undefined || event.data.categoryId !== null) && (event.data.productId === undefined || event.data.productId === null)){

				self.hideItems = ['ShoppingCart'];
                self.phrescoapi.hideWidget(self.hideItems);

                self.listener.publish(event,"Products",[event.data]);

			}else if((event.data.categoryId === undefined || event.data.categoryId === null) && (event.data.productId !== undefined || event.data.productId !== null)){

				self.hideItems = ['ShoppingCart'];
                self.phrescoapi.hideWidget(self.hideItems);

                self.listener.publish(event,"ProductDetails",[event.data]);
			}
		});
					
		productContainer.append(backHref);
		productContainer.append(shoppingCarth5);
		productContainer.append(checkoutcol1Div);
		productContainer.append(checkoutcol2Div);
		productContainer.append(checkoutcol3Div);
		productContainer.append(checkoutcol4);
		
		if(shoppingcard_data !== undefined && shoppingcard_data !== null){

			for (j = 0; j < shoppingcard_data.length; j++) {

				remProductId = shoppingcard_data[j].productId;// for removing purpose
				checkoutrow2= $('<div class="chectoutrow2">');
		        checkoutvaluecol1= $('<div class="checkoutvaluecol1">'); 
		        co_col1position1= $('<div class="co_col1position1">');
		        co_product_image= $('<div class="co_product_image"><img src="' + self.api.wsURLWithoutContext + '/images/web/' + shoppingcard_data[j].image + '" width="120" height="120" alt="' + self.api.wsURLWithoutContext + '/images/web/' + shoppingcard_data[j].image + '"></div>');
		        co_product_description= $('<div class="co_product_description">' + shoppingcard_data[j].name + '</div>');
				co_col1position1.append(co_product_image);
				co_col1position1.append(co_product_description);
				checkoutvaluecol1.append(co_col1position1);
				subtotal = shoppingcard_data[j].price;

				data = {};
				data.productId = shoppingcard_data[j].productId;
				data.singlePrice = shoppingcard_data[j].price;

		        checkoutvaluecol2 = $('<div class="checkoutvaluecol2"><div class="co_col1position2"><div class="co_input"><input type="text" value="' + shoppingcard_data[j].quantity + '" name="productQuantity" id="productQuantity" size="3" maxlength="2" style="width:40px" /></div></div></div>');
				checkoutvaluecol3 = $('<div class="checkoutvaluecol3"><div class="co_col1position2"><div class="co_input"><span id="totalAmount_' + data.productId + '">' + (shoppingcard_data[j].quantity * subtotal) +'</span></div></div></div>');  
				checkoutvaluecol4 = $('<div class="checkoutvaluecol4"><div class="co_col1position2"><input type="submit" value="Remove" class="remove_buttonstyle"/></div></div>');  

				self.addFunction(shoppingcard_data, subtotal, checkoutvaluecol2, checkoutvaluecol4, data, self);

				checkoutrow2.append(checkoutvaluecol1);
				checkoutrow2.append(checkoutvaluecol2);
				checkoutrow2.append(checkoutvaluecol3);
				checkoutrow2.append(checkoutvaluecol4);
				productContainer.append(checkoutrow2);
			}

			clear1 = $('<div class="clear"></div>');
			subtotal = $('<div class="subtotal_pos">SubTotal: $'+ self.totalCalc(shoppingcard_data) +'</div>'); 
			clear2 = $('<div class="clear"></div>'); 
			buttons = $('<div class="checkout_buttonposition2">');
			button1 = $('<input type="submit" value="Update Cart" class="checkout_buttonstyle" />');
			button2 = $('<input type="submit" value="Check Out" class="checkout_buttonstyle" />');
			$(button2).bind('click', {categoryId:0} , function(event){
				self.hideItems = ['ShoppingCart'];
				self.phrescoapi.hideWidget(self.hideItems);
				self.listener.publish(event,"OrderForm",[event.data]);
			});

			event = {};
			self.listener.publish(event,"MyCart",[self.phrescoapi.productArray]);
			buttons.append(button1);
			buttons.append(button2);
			productContainer.append(clear1);
			productContainer.append(subtotal);
			productContainer.append(clear2);
			if(shoppingcard_data.length !== 0){
				productContainer.append(buttons);
			}	
		}
                                   
		mainContent.append(topH3);  
		mainContent.append(productContainer);
	    this.mainContent = mainContent;
    };

    ShoppingCart.prototype.renderUI = function() {
        this.setMainContent();
        return this.mainContent;
    };
    
    ShoppingCart.prototype.onHashChange = function(event,data) {
		this.dataItem = data.productArray;
		this.categoryId = data.categoryID;
		this.productId = data.productID;
        this.render(this.mainNode);
		this.mainNode.show();
    };

	ShoppingCart.prototype.hideWidget = function(){
        this.mainNode.hide();
    };

    ShoppingCart.prototype.addFunction = function(shoppingcard_data, subtotal, checkoutvaluecol2, checkoutvaluecol4, data, self){
		var i;
		$(checkoutvaluecol4).bind('click', data, function(event){
			self.phrescoapi.removeShoppingCart(event.data.productId);
			data = {productArray : self.phrescoapi.productArray,categoryID : null,productID : null};
			self.listener.publish(event,"ShoppingCart",data);
		});

		$(checkoutvaluecol2).bind('focusout',data, function(event){
			$("#totalAmount_" + event.data.productId).text(event.target.value * event.data.singlePrice);
			for (i = 0; i < shoppingcard_data.length; i++) {
				if(shoppingcard_data[i].productId === event.data.productId){
					shoppingcard_data[i].quantity = event.target.value;
					break;
				}
			}
			self.listener.publish(event,"MyCart",[self.phrescoapi.productArray]);
			$(subtotal).text("SubTotal: $" + self.totalCalc(shoppingcard_data));
		});
    };

    ShoppingCart.prototype.totalCalc = function(shoppingcard_data){
		var totalAmount =0, i;

		for (i = 0; i < shoppingcard_data.length; i++) {
			 totalAmount += Number(this.phrescoapi.productArray[i].quantity * this.phrescoapi.productArray[i].price);
		}

		return totalAmount;	
    };

    return ShoppingCart;
}