function (self) {
			var item = declaration[key];

			var Repository = item['repository'] || EntityRepository;
			var repository = self.create(Repository, key, item);

			repository.Entity = item['entity'] || Entity;
			if (typeof repository.Entity !== 'function') {
				throw new Error('Invalid entity constructor for the repository \'' + key + '\'');
			}

			return repository;
		}