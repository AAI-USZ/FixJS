function(counter)
                {
                    FBTest.compare(13, counter, "There must be precise number " +
                         "of occurences (13) actual: " + counter);
                    callback();
                }