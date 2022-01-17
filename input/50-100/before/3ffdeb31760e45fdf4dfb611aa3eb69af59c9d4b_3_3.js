function test(list) {
                
                // test may be called multiple times
                // queue should simply concatenate other calls
                queue = concat.apply(queue, [list]);
                
                // if wru.random is true, the queue is ranodomized
                // this is to make tests indipendent from each others
                wru.random && sort.call(queue, messItUp);
                
                // if there is no test to waitForIt
                // Dary() has been called already
                // we can procede with next test
                // invoking isGonnaBeLegen()
                waitForIt || isGonnaBeLegen();
            }