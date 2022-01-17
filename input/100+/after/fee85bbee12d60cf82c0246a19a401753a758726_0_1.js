function(input, options) {
   var match, matches, words, i;

   if (input == void 0) {
      throw new Error("Input must be specified.");
   }

   options = options || {};
   words = input.match(/[A-Z\d]+(?![a-z])|[a-zA-Z][^A-Z\d\-_.]*/g);

   if (words) {
      for (i = 0; i < words.length; i++) {

         if (words[i].match(/^[A-Z\d][A-Z\d]+$/)) {
            continue;
         }
         if (options["case"] === "lower") {
            words[i] = lowerCaseWord(words[i]);
         }
         else if (options["case"] === "sentence" && i != 0) {
            words[i] = lowerCaseWord(words[i]);
         }
         else {
            words[i] = upperCaseWord(words[i]);
         }
      }
      return words.join(" ");
   }
   return input;
}