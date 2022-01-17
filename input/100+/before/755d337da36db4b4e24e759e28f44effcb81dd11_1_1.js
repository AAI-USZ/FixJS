function(   EShopAPI, 
					Phresco, 
					Listener, 
					AboutusBootstrap, 
					NavigationBootstrap, 
					SearchBootstrap, 
					CategoryBootstrap, 
					ProductBootstrap, 
					OrderFormBootstrap, 
					OrderFormViewBootstrap, 
					OrderHistoryBootstrap, 
					MyCartBootstrap, 
					NewproductsBootstrap, 
					ProductDetailsBootstrap, 
					ShoppingCartBootstrap, 
					ContactusBootstrap, 
					RegisterSuccessBootstrap, 
					LoginBootstrap, 
					RegisterBootstrap, 
					OrderSuccessBootstrap,
					LoginSuccessBootstrap) {

		var api, 
		phresco, 
		listener, 
		aboutusBootstrap, 
		navigationBootstrap, 
		searchBootstrap, 
		categoryBootstrap, 
		hideItems, 
		productBootstrap, 
		orderFormBootstrap, 
		orderFormViewBootstrap, 
		orderHistoryBootstrap, 
		myCartBootstrap, 
		newproductsBootstrap, 
		productDetailsBootstrap,
		shoppingCartBootstrap, 
		contactusBootstrap, 
		registerSuccessBootstrap, 
		loginBootstrap, 
		registerBootstrap,
		loginSuccessBootstrap,
		orderSuccessBootstrap;

		listener = new Listener();

		api = new EShopAPI();
        api.initialize();
		
		phresco = new Phresco();
		phresco.initialize(listener, api);

		aboutusBootstrap = new AboutusBootstrap();
		aboutusBootstrap.init(listener, api);

		navigationBootstrap = new NavigationBootstrap();
		navigationBootstrap.init(listener, api, phresco);

		searchBootstrap = new SearchBootstrap();
		searchBootstrap.init(listener, api, phresco);

		categoryBootstrap = new CategoryBootstrap();
		categoryBootstrap.init(listener, api, phresco);

		productBootstrap = new ProductBootstrap();
		productBootstrap.init(listener, api, phresco);

		orderFormBootstrap = new OrderFormBootstrap();
		orderFormBootstrap.init(listener, api, phresco);

		orderFormViewBootstrap = new OrderFormViewBootstrap();
		orderFormViewBootstrap.init(listener, api, phresco);

		orderHistoryBootstrap = new OrderHistoryBootstrap();
		orderHistoryBootstrap.init(listener, api, phresco);

		orderSuccessBootstrap = new OrderSuccessBootstrap();
		orderSuccessBootstrap.init(listener, api, phresco);

		myCartBootstrap = new MyCartBootstrap();
		myCartBootstrap.init(listener, api, phresco);

		newproductsBootstrap = new NewproductsBootstrap();
		newproductsBootstrap.init(listener, api, phresco);

		productDetailsBootstrap = new ProductDetailsBootstrap();
		productDetailsBootstrap.init(listener, api, phresco);

		shoppingCartBootstrap = new ShoppingCartBootstrap();
		shoppingCartBootstrap.init(listener, api, phresco);

		contactusBootstrap = new ContactusBootstrap();
		contactusBootstrap.init(listener, api, phresco);

		registerSuccessBootstrap = new RegisterSuccessBootstrap();
		registerSuccessBootstrap.init(listener, api, phresco);

		loginBootstrap = new LoginBootstrap();
		loginBootstrap.init(listener, api, phresco);

		registerBootstrap = new RegisterBootstrap();
		registerBootstrap.init(listener, api, phresco);

		loginSuccessBootstrap = new LoginSuccessBootstrap();
		loginSuccessBootstrap.init(listener, api, phresco);

		hideItems = ['ProductDetails','ShoppingCart','OrderFormView','OrderForm','Login','OrderSuccess','Aboutus','Contactus','Register','LoginSuccess','RegisterSuccess','OrderHistory'];
        phresco.hideWidget(hideItems);
	}