function shouldShow(entry) {
        return [".git", ".svn", ".DS_Store", "Thumbs.db"].indexOf(entry.name) === -1;
    }