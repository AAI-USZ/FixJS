function () {
                    expect(gotFile).toBe(true);
                    expect(readFile).toBe(false);
                    expect(errorCode).toBe(FileError.NOT_FOUND_ERR);
                }