function() {
            var storeList = Y.all('.example #demo li'),
                cartList;
            storeList.item(0).simulate('click');
            storeList.item(3).simulate('click');
            storeList.item(5).simulate('click');
            storeList.item(8).simulate('click');
            cartList = Y.all('.example #demo2 li');

            // cartList.item(0) is the cart head
            Assert.isTrue((cartList.item(1).getHTML().indexOf('tomato') > -1),'failed to add tomato soup');
            Assert.isTrue((cartList.item(2).getHTML().indexOf('rice') > -1),'failed to add rice-a-roni');
            Assert.isTrue((cartList.item(3).getHTML().indexOf('banana') > -1),'failed to add banana');
            Assert.isTrue((cartList.item(4).getHTML().indexOf('peanut') > -1),'failed to add peanut butter');
        }