function () {
    ok($("#path1").is(":visible"), "and the first path is visible.");
    ok($("#path2").is(":hidden"), "and the second path is hidden.");
    ok($("#path3").is(":hidden"), "and the third path is hidden.");

    adore.switchToNextPath();
    ok($("#path1").is(":hidden"), "after switchToNextPath() the first path is hidden.");
    ok($("#path2").is(":visible"), "and the second path is visible.");
    ok($("#path3").is(":hidden"), "and the third path is hidden.");
}