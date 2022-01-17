function(fName)
            {
                var srcDir = PATH.join('Frameworks', fName),
                    dstDir = PATH.join(finalBuildDir, 'Frameworks', fName);
                dependencies.push(dstDir);
                tasks.copy(dstDir, srcDir);
            }