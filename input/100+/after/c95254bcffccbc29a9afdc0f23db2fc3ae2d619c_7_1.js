function(){

                var tests = document.getElementById("qunit-tests").childNodes;
                for(var i in tests){
                    var node = tests[i];
                    var failed = /fail/.test(node.className);
                    if(failed) {
                        var text = node.querySelector("strong").innerText;
                        text.substring(0, text.length - 5);
                        console.log(text);

                        var failingItems = node.querySelectorAll(".fail");
                        var failingItemsCount = failingItems.length;
                        for(var j = 0; j < failingItemsCount; j++) {
                          var failingItem = failingItems.item(j);
                          console.log("   - " + failingItem.innerText);
                        }
                    }
                }

                var el = document.getElementById('qunit-testresult');
                console.log(el.innerText);
                try {
                    return el.getElementsByClassName('failed')[0].innerHTML;
                } catch (e) { }
                return 10000;
            }