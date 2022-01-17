function(counter)
                {
                    FBTest.compare(1, counter, "There must be precise number " +
                        "of occurences (1) actual: " + 1);
                    callback();
                }