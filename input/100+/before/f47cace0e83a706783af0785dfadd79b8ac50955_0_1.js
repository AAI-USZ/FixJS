function() {
        var oneOffs = {
            "quiz": "quizzes",
            "shelf": "shelves",
            "loaf": "loaves",
            "potato": "potatoes",
            "person": "people",
            "is": "are",
            "was": "were",
            "foot": "feet",
            "square foot": "square feet",
            "tomato": "tomatoes"
        };

        var pluralizeWord = function(word) {

            // noone really needs extra spaces at the edges, do they?
            word = $.trim(word);

            // determine if our word is all caps.  If so, we'll need to
            // re-capitalize at the end
            var isUpperCase = (word.toUpperCase() === word);
            var oneOff = oneOffs[word.toLowerCase()];
            var words = word.split(/\s+/);

            // first handle simple one-offs
            // ({}).watch is a function in Firefox, blargh
            if (typeof oneOff === "string") {
                return oneOff;
            }

            // multiple words
            else if (words.length > 1) {
                // for 3-word phrases where the middle word is 'in' or 'of',
                // pluralize the first word
                if (words.length === 3 && /\b(in|of)\b/i.test(words[1])) {
                    words[0] = KhanUtil.plural(words[0]);
                }

                // otherwise, just pluraize the last word
                else {
                    words[words.length - 1] =
                        KhanUtil.plural(words[words.length - 1]);
                }

                return words.join(" ");
            }

            // single words
            else {
                // "-y" => "-ies"
                if (/[^aeiou]y$/i.test(word)) {
                    word = word.replace(/y$/i, "ies");
                }

                // add "es"; things like "fish" => "fishes"
                else if (/[sxz]$/i.test(word) || /[bcfhjlmnqsvwxyz]h$/.test(word)) {
                    word += "es";
                }

                // all the rest, just add "s"
                else {
                    word += "s";
                }

                if (isUpperCase) {
                    word = word.toUpperCase();
                }
                return word;
            }
        };

        return function(value, arg1, arg2) {
            if (typeof value === "number") {
                var usePlural = (value !== 1);

                // if no extra args, just add "s" (if plural)
                if (arguments.length === 1) {
                    return usePlural ? "s" : "";
                }

                if (usePlural) {
                    arg1 = arg2 || pluralizeWord(arg1);
                }

                return value + " " + arg1;
            } else if (typeof value === "string") {
                var plural = pluralizeWord(value);
                if (typeof arg1 === "string" && arguments.length === 3) {
                    plural = arg1;
                    arg1 = arg2;
                }
                var usePlural = (arguments.length < 2 || (typeof arg1 === "number" && arg1 !== 1));
                return usePlural ? plural : value;
            }
        };
    }