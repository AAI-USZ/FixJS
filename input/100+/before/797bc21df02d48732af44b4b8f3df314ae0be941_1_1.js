function (file, index) {
            // flag the currently active editor
            isActive = currentDoc && (file.fullPath === currentDoc.file.fullPath);

            files.push({
                file: file.fullPath,
                active: isActive
            });
        }