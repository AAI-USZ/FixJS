function() {

			var repositories = this.repositories,

			    i = 0,

			    j = repositories.length,

			    repository;



			if ( Aloha.settings && Aloha.settings.repositories ) {

				this.settings = Aloha.settings.repositories;

			}

			

			// use the configured repository manger query timeout or 5 sec

			this.settings.timeout = this.settings.timeout || 5000;

			

			for ( ; i < j; ++i ) {

				repository = repositories[ i ];



				if ( !repository.settings ) {

					repository.settings = {};

				}



				if ( this.settings[ repository.repositoryId ] ) {

					jQuery.extend(

						repository.settings,

						this.settings[ repository.repositoryId ]

					);

				}



				repository.init();

			}

		}