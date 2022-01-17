function prepare(job, callback) {

    var PACKAGER_URL = "http://mac-ci:9000/job/" + job + "/ws/target/zip/*zip*/zip.zip",

        EXECUTABLES_URL = "http://mac-ci:9000/job/" + job + "/ws/target/dependency/*zip*/dependency.zip",

        FUNCTIONAL_TEST_URL = "http://mac-ci:9000/job/" + job + "/ws/Framework/ext/test/functional/*zip*/functional.zip",

        PACKAGER_FILENAME = "/zip.zip",

        EXECUTABLES_FILENAME = "/dependency.zip",

        FUNCTIONAL_TEST_FILENAME = "/functional.zip";

    

    // TODO: Do a CLEAN/Delete workspace first

    if (!path.existsSync(_workspace)) {

        console.log('CREATE: new workspace')

        fs.mkdirSync(_workspace, "0755");

    } else {

        console.log('DELETE: old workspace')

        wrench.rmdirSyncRecursive(_workspace);

        console.log('CREATE: new workspace')

        fs.mkdirSync(_workspace, "0755");

    }



    if (BUILD_ON_HUDSON) {

        // grab functional tests from framework/ext/test.functional and place in workpace/public/spec

        downloadUnzipDelete(PACKAGER_URL, PACKAGER_FILENAME, function() {

            downloadUnzipDelete(EXECUTABLES_URL, EXECUTABLES_FILENAME, function() {

                wrench.copyDirSyncRecursive(_workspace + "/dependency", _workspace + "/zip/dependencies");

                downloadUnzipDelete(FUNCTIONAL_TEST_URL, FUNCTIONAL_TEST_FILENAME, callback);

            });

        });



        function downloadUnzipDelete(url, filename, callback) {

            downloadDependency(url, filename, function (err) {

                if (err) {

                    callback(err);

                } else {

                    unzipDependency(filename, function (err) {

                        if (err) { 

                            callback(err);

                        } else {

                            fs.unlinkSync(_workspace + filename);

                            callback();

                        }

                    });

                }

            });

        }

    } else {

        // copy framwork/test.functional content to test-server/public/spec dir.

        wrench.copyDirSyncRecursive(_functional_dir, _spec_dir);

        fs_extra.copyFileSync(LOCAL_PACKAGER + "/Framework/clientFiles/webworks.js", path.normalize(__dirname + "/public/webworks.js"));

        callback();

    }

}