function () {
        expect(window.foo).toBeDefined();
        expect(window.bar).toBeDefined();
        expect(window.woot).toBeDefined();
        expect(window.foo).toBe(_emulatedFrame.contentWindow.foo);
        expect(window.bar).toBe(_emulatedFrame.contentWindow.bar);
        expect(window.woot).toBe(_emulatedFrame.contentWindow.woot);
    }