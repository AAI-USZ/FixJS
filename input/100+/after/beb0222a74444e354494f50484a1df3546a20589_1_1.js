function(){
            start();
            assert.strictEqual($("#countAtnd").text(), "(51)");
            assert.strictEqual($("#countEventAtnd").text(), "(1)");
            assert.strictEqual($("#countZusaar").text(), "(5)");
            assert.strictEqual($("#countKokucheese").text(), "(6)");
            assert.strictEqual($("#countPartake").text(), "(4)");
            assert.strictEqual($("#countConnpass").text(), "(3)");
            assert.strictEqual($("#total").text(), "70");
        }