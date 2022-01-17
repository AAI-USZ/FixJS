function test_equals(value, equals, msg, properties)
{
    wp_test(function () { assert_equals(value, equals, msg); }, msg, properties);
}