function(filePath)
            {
                var dstPath = PATH.join(finalBuildDir, filePath);
                dependencies.push(dstPath);
                tasks.copy(dstPath, filePath, [], {copyToDirectory: true});
            }