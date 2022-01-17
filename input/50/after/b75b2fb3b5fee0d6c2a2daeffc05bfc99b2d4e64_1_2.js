function test_greater_than(value, greater_than, msg, properties)
{
    wp_test(function () { assert_true(value > greater_than, msg); }, msg, properties);
}