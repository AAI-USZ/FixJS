function() {
            instance.tryCreateGame("foo", "bar", "", "");
            Assert.assertEqual(instance.getGame("foo").user, "bar");
        }