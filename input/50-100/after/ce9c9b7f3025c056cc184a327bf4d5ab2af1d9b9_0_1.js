function getExamplePage (filePath) {
    name = path.basename(filePath);
    htmlPath = path.join(filePath, name + '.html');
    if (fs.existsSync(htmlPath)) {
        return fs.readFileSync(htmlPath);
    } else {
        return false;
    }
}