function() {
            instance.getRandomWord = function() { return "hello"; };
            var game = instance.tryCreateGame("foo", "bar", "", "");  
            var guesses = ["a", "b", "c", "d", "e", "f"];
            for(var i in guesses) {
                assertTrue(game.hasGuessesLeft());
                instance.tryGuess("foo", "bar", "", guesses[i]);
            }
            assertFalse(game.hasGuessesLeft());
            assertNull(instance.getGame("foo"));
        }