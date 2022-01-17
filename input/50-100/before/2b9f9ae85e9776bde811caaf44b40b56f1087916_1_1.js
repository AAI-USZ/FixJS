function (solution, index) {
        var paths = matchMaker.computeLeavesFromSolution(solution);
        var skeleton = matchMaker.pathsToSkeleton(paths);
        return {
            solution: solution,
            skeleton: skeleton,
            index: index
        }
    }