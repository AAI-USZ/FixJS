function() {

			var repositories = this.repositories,

			    i = 0,

			    j = repositories.length,

			    repository,

			    settings;



			if ( Aloha.settings && Aloha.settings.repositories ) {

				settings = Aloha.settings.repositories;

			} else {

				settings = {};

			}



			for ( ; i < j; ++i ) {

				repository = repositories[ i ];



				if ( !repository.settings ) {

					repository.settings = {};

				}



				if ( settings[ repository.repositoryId ] ) {

					jQuery.extend(

						repository.settings,

						settings[ repository.repositoryId ]

					);

				}



				repository.init();

			}

		}