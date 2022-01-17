function() {
    var builderList = ["Chrome Frame Tests", "GPU Linux (NVIDIA)", "GPU Linux (dbg) (NVIDIA)", "GPU Mac", "GPU Mac (dbg)", "GPU Win7 (NVIDIA)", "GPU Win7 (dbg) (NVIDIA)", "Linux Perf", "Linux Tests",
        "Linux Valgrind", "Mac Builder (dbg)", "Mac10.6 Perf", "Mac10.6 Tests", "Vista Perf", "Vista Tests", "Webkit Linux", "Webkit Linux ASAN",  "Webkit Linux (dbg)", "Webkit Linux (deps)", "Webkit Linux 32",
        "Webkit Mac Builder", "Webkit Mac Builder (dbg)", "Webkit Mac Builder (deps)", "Webkit Mac10.5", "Webkit Mac10.5 (dbg)(1)", "Webkit Mac10.5 (dbg)(2)", "Webkit Mac10.6", "Webkit Mac10.6 (dbg)",
        "Webkit Mac10.6 (deps)", "Webkit Mac10.7", "Webkit Win", "Webkit Win (dbg)(1)", "Webkit Win (dbg)(2)", "Webkit Win (deps)", "Webkit Win Builder", "Webkit Win Builder (dbg)",
        "Webkit Win Builder (deps)", "Webkit Win7", "Win (dbg)", "Win Builder"];
    var expectedBuilders = [["Webkit Linux (deps)", 2], ["Webkit Mac10.6 (deps)"], ["Webkit Win (deps)"]];
    deepEqual(generateBuildersFromBuilderList(builderList, isChromiumWebkitDepsTestRunner), expectedBuilders);
}