var assert = require('assert');
var doyok = require('../doyok.js');

var json = [
   {
   	   id: 1, name: 'Jonathan', age: 22
   },
   {
   	   id: 2, name: 'Kevin', age: 20
   },
   {
       id: 2, name: 'Kevin', age: 20
   },
   {
       id: 3, name: 'Kevin', age: 10
   },
   {
       id: 4, name: 'Endah', age: 22
   }
];

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('findAllTest', function() {
	describe('with condition', function() {

		describe('and condition', function() {
			it('should return list of json by its and condition', function() {
				var condition = {
				  where: {
				    name: 'Kevin',
				    age: 20
				  }
				};
				var expectedResult = [
					{
				   	 	id: 2, name: 'Kevin', age: 20
				   	},
				   	{
				        id: 2, name: 'Kevin', age: 20
				   	}
				];
				doyok.findAll(condition, json).then(function(result) {
				    assert.equal(result, expectedResult);                                              
				});
			});
		});

		describe('or condition', function() {
			it('should return list of json by its or condition', function() {
				var condition = {
					where: {
						name: 'Kevin',
						or: [
							{
								id: 3
							}
						]
					}
				};
				var expectedResult = [
					{
				   	    id: 2, name: 'Kevin', age: 20
				    },
				    {
				        id: 2, name: 'Kevin', age: 20
				    },
				    {
				        id: 3, name: 'Kevin', age: 10
				    }
				];
				doyok.findAll(condition, json).then(function(result) {
				    assert.equal(result, expectedResult);                                              
				});
			});
		});
	});
});