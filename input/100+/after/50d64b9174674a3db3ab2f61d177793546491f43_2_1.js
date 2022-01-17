function addTriangle(lines, linesIndex, i0, i1, i2) {
        lines[linesIndex++] = i0;
        lines[linesIndex++] = i1;

        lines[linesIndex++] = i1;
        lines[linesIndex++] = i2;

        lines[linesIndex++] = i2;
        lines[linesIndex++] = i0;

        return linesIndex;
    }