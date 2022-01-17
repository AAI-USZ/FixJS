function() {
			var zoo = new Zoo({
				animals: [ 'lion-1', 'zebra-1' ]
			});

			equal( zoo.get( 'animals' ).livesIn, zoo );
			equal( zoo.get( 'animals' ).zoo, undefined );

			var Barn = Backbone.RelationalModel.extend({
				relations: [{
						type: Backbone.HasMany,
						key: 'animals',
						relatedModel: 'Animal',
						collectionType: 'AnimalCollection',
						collectionKey: 'barn',
						reverseRelation: {
							key: 'livesIn',
							includeInJSON: 'id'
						}
					}]
			});
			var barn = new Barn({
				animals: [ 'chicken-1', 'cow-1' ]
			});

			equal( barn.get( 'animals' ).livesIn, undefined );
			equal( barn.get( 'animals' ).barn, barn );

			var BarnNoKey = Backbone.RelationalModel.extend({
				relations: [{
						type: Backbone.HasMany,
						key: 'animals',
						relatedModel: 'Animal',
						collectionType: 'AnimalCollection',
						collectionKey: false,
						reverseRelation: {
							key: 'livesIn',
							includeInJSON: 'id'
						}
					}]
			});
			var barnNoKey = new BarnNoKey({
				animals: [ 'chicken-1', 'cow-1' ]
			});

			equal( barnNoKey.get( 'animals' ).livesIn, undefined );
			equal( barnNoKey.get( 'animals' ).barn, undefined );
		}