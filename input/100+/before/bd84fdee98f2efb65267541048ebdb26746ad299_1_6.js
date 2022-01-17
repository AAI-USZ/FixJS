function() {
    var builderList = ["Android Builder", "Chrome Frame Tests (ie6)", "Chrome Frame Tests (ie7)", "Chrome Frame Tests (ie8)", "Interactive Tests (dbg)", "Linux", "Linux Builder (dbg)",
        "Linux Builder (dbg)(shared)", "Linux Builder x64", "Linux Clang (dbg)", "Linux Sync", "Linux Tests (dbg)(1)", "Linux Tests (dbg)(2)", "Linux Tests (dbg)(shared)", "Linux Tests x64",
        "Linux x64", "Mac", "Mac 10.5 Tests (dbg)(1)", "Mac 10.5 Tests (dbg)(2)", "Mac 10.5 Tests (dbg)(3)", "Mac 10.5 Tests (dbg)(4)", "Mac 10.6 Tests (dbg)(1)", "Mac 10.6 Tests (dbg)(2)",
        "Mac 10.6 Tests (dbg)(3)", "Mac 10.6 Tests (dbg)(4)", "Mac Builder", "Mac Builder (dbg)", "Mac10.5 Tests (1)", "Mac10.5 Tests (2)", "Mac10.5 Tests (3)", "Mac10.6 Sync",
        "Mac10.6 Tests (1)", "Mac10.6 Tests (2)", "Mac10.6 Tests (3)", "NACL Tests", "NACL Tests (x64)", "Vista Tests (1)", "Vista Tests (2)", "Vista Tests (3)", "Win", "Win Aura",
        "Win Builder", "Win Builder (dbg)", "Win Builder 2010 (dbg)", "Win7 Sync", "Win7 Tests (1)", "Win7 Tests (2)", "Win7 Tests (3)", "Win7 Tests (dbg)(1)", "Win7 Tests (dbg)(2)",
        "Win7 Tests (dbg)(3)", "Win7 Tests (dbg)(4)", "Win7 Tests (dbg)(5)", "Win7 Tests (dbg)(6)", "XP Tests (1)", "XP Tests (2)", "XP Tests (3)", "XP Tests (dbg)(1)", "XP Tests (dbg)(2)",
        "XP Tests (dbg)(3)", "XP Tests (dbg)(4)", "XP Tests (dbg)(5)", "XP Tests (dbg)(6)"];
    var expectedBuilders = [["Interactive Tests (dbg)", 2], ["Linux Tests (dbg)(1)"], ["Linux Tests (dbg)(2)"], ["Linux Tests (dbg)(shared)"], ["Linux Tests x64"], ["Mac 10.5 Tests (dbg)(1)"],
        ["Mac 10.5 Tests (dbg)(2)"], ["Mac 10.5 Tests (dbg)(3)"], ["Mac 10.5 Tests (dbg)(4)"], ["Mac 10.6 Tests (dbg)(1)"], ["Mac 10.6 Tests (dbg)(2)"], ["Mac 10.6 Tests (dbg)(3)"],
        ["Mac 10.6 Tests (dbg)(4)"], ["Mac10.5 Tests (1)"], ["Mac10.5 Tests (2)"], ["Mac10.5 Tests (3)"], ["Mac10.6 Tests (1)"], ["Mac10.6 Tests (2)"], ["Mac10.6 Tests (3)"], ["NACL Tests"],
        ["NACL Tests (x64)"], ["Vista Tests (1)"], ["Vista Tests (2)"], ["Vista Tests (3)"], ["Win7 Tests (1)"], ["Win7 Tests (2)"], ["Win7 Tests (3)"], ["Win7 Tests (dbg)(1)"],
        ["Win7 Tests (dbg)(2)"], ["Win7 Tests (dbg)(3)"], ["Win7 Tests (dbg)(4)"], ["Win7 Tests (dbg)(5)"], ["Win7 Tests (dbg)(6)"], ["XP Tests (1)"], ["XP Tests (2)"], ["XP Tests (3)"],
        ["XP Tests (dbg)(1)"], ["XP Tests (dbg)(2)"], ["XP Tests (dbg)(3)"], ["XP Tests (dbg)(4)"], ["XP Tests (dbg)(5)"], ["XP Tests (dbg)(6)"]];
    deepEqual(generateBuildersFromBuilderList(builderList, isChromiumDepsGTestRunner), expectedBuilders);
}