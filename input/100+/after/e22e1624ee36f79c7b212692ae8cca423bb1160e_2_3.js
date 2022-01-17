function() {
        try {
          current_version = localStorage.version;
          localStorage.version = JSON.stringify(version);
          if (current_version && version === JSON.parse(current_version)) {
            loaded_data = JSON.parse(localStorage.data);
            all_books = JSON.parse(localStorage.all_books);
            all_tags = JSON.parse(localStorage.all_tags);
            all_people = JSON.parse(localStorage.all_people);
            all_subjects = JSON.parse(localStorage.all_subjects);
            return process_data();
          } else {
            console.log("wrong version " + current_version + " != " + version);
            return load_data();
          }
        } catch (error) {
          console.log("failed to load data from storage: " + error);
          return load_data();
        }
      }