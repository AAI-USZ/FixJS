function() {
                var repetition = list._element.querySelector('*[data-montage-id="repetition"]').controller;
                expect(repetition).toBeDefined();
                expect(repetition._items.length).toBe(3);
                expect(list._element.querySelectorAll(".montage-Slider").length).toBe(3);
            }