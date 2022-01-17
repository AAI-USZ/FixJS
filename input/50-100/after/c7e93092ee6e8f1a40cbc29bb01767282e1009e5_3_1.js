function (f) {
        fullPath = path.join(dir, f);
        if (!fs.statSync(fullPath).isDirectory()) {
            if (hasValidExtension(fullPath)) {
                throw localize.translate("EXCEPTION_NON_JS_FILE_IN_API_DIR", fullPath);
            }
        } else {
            checkNonJSFiles(fullPath);
        }
    }