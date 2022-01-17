function test_true(value, msg, properties)
{
    wp_test(function () { assert_true(value, msg); }, msg, properties);
}