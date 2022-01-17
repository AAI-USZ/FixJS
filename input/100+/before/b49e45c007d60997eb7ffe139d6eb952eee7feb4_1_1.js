function(Y, NAME) {

    var suite = new YUITest.TestSuite(NAME),
        A = YUITest.Assert,
        rm,
        OA = YUITest.ObjectAssert;
    
    suite.add(new YUITest.TestCase({
    
        name: 'config tests',

        setUp: function() {

        },

        tearDown: function() {

        },
        
        'TODO Test get function': function() {

            A.skip();
        },

        'TODO Test getDefinition function': function() {

            A.skip();
        }
        
    }));

    YUITest.TestRunner.add(suite);

}