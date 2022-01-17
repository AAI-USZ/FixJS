function(counter)
                {
                    FBTest.compare(2, counter, "There must be precise number " +
                        "of occurences (2) actual: " + counter);
                    callback();
                }