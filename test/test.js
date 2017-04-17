var assert = require('assert');
var doyok = require('../doyok.js');
var utilities = require('../utilities.js');

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

describe('findAllTest', function() {
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
				var result = doyok.findAllNotUsePromise(condition, json);
				assert.equal(true, utilities.equals(expectedResult, result));
			});
	});

	describe('or condition', function() {
			it('should return list of json by its or condition', function() {
				var condition = {
					where: {
						or: [
							{
								id: 3
							}
						]
					}
				};
				var expectedResult = [
				    {
				        id: 3, name: 'Kevin', age: 10
				    }
				];
				var result = doyok.findAllNotUsePromise(condition, json);
				assert.equal(true, utilities.equals(expectedResult, result));
			});
	});

	describe('or and condition', function () {
			it('should return list of json by its and, or condition', function() {
				var condition = {
					where: {
						name: 'Kevin',
						or: [
							{
								name: 'Endah'
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
				    },
				    {
				        id: 4, name: 'Endah', age: 22
				    }
				];

				var result = doyok.findAllNotUsePromise(condition, json);
				assert.equal(true, utilities.equals(expectedResult, result));


				var condition = {
					where: {
						name: 'Kevin',
						or: [
							{
								name: 'Endah', age: 22, id: 1
							}
						]
					}
				};

				var expectedResult = [ 
					{ id: 2, name: 'Kevin', age: 20 },
				    { id: 2, name: 'Kevin', age: 20 },
				    { id: 3, name: 'Kevin', age: 10 }
				];

				var result = doyok.findAllNotUsePromise(condition, json);
				assert.equal(true, utilities.equals(expectedResult, result));
			});
	});

	describe('limit condition', function () {
			it('should return list of json based on the number of limit that defined in condition', function() {
				describe('single limit condition', function () {
					var condition = {
						limit: 2
					};

					var expectedResult = [
						{
					   	    id: 1, name: 'Jonathan', age: 22
					    },
					    {
					   	    id: 2, name: 'Kevin', age: 20
					    }
					];

					var result = doyok.findAllNotUsePromise(condition, json);
					assert.equal(true, utilities.equals(expectedResult, result));
				});

				describe('limit combine with and condition', function () {
					var condition = {
						where : {
							name: 'Kevin'
						},
						limit: 2
					};

					var expectedResult = [
						{
   	   						id: 2, name: 'Kevin', age: 20
   						},
   						{
       						id: 2, name: 'Kevin', age: 20
   						}
					];

					var result = doyok.findAllNotUsePromise(condition, json);
					assert.equal(true, utilities.equals(expectedResult, result));
				});

				describe('limit combined with or condition', function () {
					var condition = {
						where : {
							name: 'Kevin',
							or: [
								{
									name: 'Jonathan'
								}
							]
						}, 
						limit: 2
					};

					var expectedResult = [
						{
   	   						id: 1, name: 'Jonathan', age: 22
   						},
   						{
   	   						id: 2, name: 'Kevin', age: 20
   						}
					];

					var result = doyok.findAllNotUsePromise(condition, json);
					assert.equal(true, utilities.equals(expectedResult, result));
				});

			});
	});

	describe('offset condition', function () {
			it('should return list of json starting from the offset that defined in condition', function() {

				
				describe('single offset', function() {
						var condition = {
							offset: 2
						};

						var expectedResult = [
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

						var result = doyok.findAllNotUsePromise(condition, json);
						assert.equal(true, utilities.equals(expectedResult, result));
					
				});
				

				describe('offset combined with and condition', function() {
					
						var condition = {
							where: {
								name: 'Kevin'
							},
							offset: 2
						};

						var expectedResult = [
							{
	       						id: 3, name: 'Kevin', age: 10
	   						}
						];

						var result = doyok.findAllNotUsePromise(condition, json);
						assert.equal(true, utilities.equals(expectedResult, result));
					
				})

				describe('offset combined with or condition', function() {
					
						var condition = {
							where: {
								name: 'Kevin',
								or: [
									{
										name: 'Endah'
									}
								]
							},
							offset: 2
						};

						var expectedResult = [
							{
	       						id: 3, name: 'Kevin', age: 10
	   						},
	   						{
	       						id: 4, name: 'Endah', age: 22
	   						}
						];

						var result = doyok.findAllNotUsePromise(condition, json);
						assert.equal(true, utilities.equals(expectedResult, result));
					
				});

				describe('offset combined with limit condition', function() {
					
						var condition = {
							offset: 2,
							limit: 2
						};

						var expectedResult = [
							{
	       						id: 2, name: 'Kevin', age: 20
	   						},
	   						{
	       						id: 3, name: 'Kevin', age: 10
	   						}
						];

						var result = doyok.findAllNotUsePromise(condition, json);
						assert.equal(true, utilities.equals(expectedResult, result));
					
				});

				describe('offset combined with all condition', function() {
					
						var condition = {
							offset: 2,
							limit: 2,
							where: {
								name: 'Kevin',
								or: [
									{
										name: 'Endah', age: 22
									}
								]
							}
						};


						var expectedResult = [
							{
						        id: 3, name: 'Kevin', age: 10
						    },
						    {
						        id: 4, name: 'Endah', age: 22
						    }
						];

						var result = doyok.findAllNotUsePromise(condition, json);
						assert.equal(true, utilities.equals(expectedResult, result));
					
				});
			})
	});

	describe('order condition', function() {
			it('should return ordered json', function() {
				
				describe('single order condition', function() {
					var condition = {
						order: {
							name: 1
						}
					};

					var expectedResult = [
						{
					        id: 4, name: 'Endah', age: 22
					    },
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
					    }
					];

					var result = doyok.findAllNotUsePromise(condition, json);
					assert.equal(true, utilities.equals(expectedResult, result));
				});

				describe('order condition combined with and condition', function() {
					var condition = {
						order: {
							name: 1
						},
						where: {
							age: 22
						}
					};

					var expectedResult = [
						{
					        id: 4, name: 'Endah', age: 22
					    },
					    {
					   	    id: 1, name: 'Jonathan', age: 22
					    }
					];

					var result = doyok.findAllNotUsePromise(condition, json);
					assert.equal(true, utilities.equals(expectedResult, result));
				});

				describe('order condition combined with or condition', function() {
					var condition = {
						order: {
							name:-1
						},
						where: {
							or: [
								{
									age: 22
								}
							]
						}
					};

					var expectedResult = [
					    {
					   	    id: 1, name: 'Jonathan', age: 22
					    },
					    {
					        id: 4, name: 'Endah', age: 22
					    }
					];

					var result = doyok.findAllNotUsePromise(condition, json);
					assert.equal(true, utilities.equals(expectedResult, result));

				});

				describe('order condition combined with limit condition', function() {
					var condition = {
						order: {
							name: 1
						},
						limit: 1
					};

					var expectedResult = [
						{
							id: 4, name: 'Endah', age: 22
						}
					];

					var result = doyok.findAllNotUsePromise(condition, json);
					assert.equal(true, utilities.equals(expectedResult, result));
				});

				describe('order condition combined with offset condition', function() {
					var condition = {
						order: {
							name : -1	
						},
						offset: 2
					};

					var expectedResult = [
						{
       						id: 3, name: 'Kevin', age: 10
   						},
   						{
   	   						id: 1, name: 'Jonathan', age: 22
   						},
   						{
       						id: 4, name: 'Endah', age: 22
   						}
					];

					var result = doyok.findAllNotUsePromise(condition, json);
					assert.equal(true, utilities.equals(expectedResult, result));
				});

				describe('order condition with more than one parameter', function() {
					var condition = {
						order: {
							name: 1,
							age: 1
						}
					};

					var expectedResult = [
							{
       							id: 4, name: 'Endah', age: 22
   							},
   							{
   	   							id: 1, name: 'Jonathan', age: 22
   							},
   							{
   	   							id: 3, name: 'Kevin', age: 10
   							},
   							{
       							id: 2, name: 'Kevin', age: 20
   							},
   							{
       							id: 2, name: 'Kevin', age: 20
   							}
					];

					var result = doyok.findAllNotUsePromise(condition, json);
					assert.equal(true, utilities.equals(expectedResult, result));
				});

				describe('order condition with all condition', function() {
					var condition = {
						order: {
							name: 1,
							age: -1
						},
						where: {
							name: 'Kevin',
							or: [
								{
									age: 22
								}
							]
						},
						offset: 1,
						limit: 3
					};

					var expectedResult = [
						{
   	   						id: 1, name: 'Jonathan', age: 22
   						},
   						{
   	   						id: 2, name: 'Kevin', age: 20
   						},
   						{
       						id: 2, name: 'Kevin', age: 20
   						}
					];

					var result = doyok.findAllNotUsePromise(condition, json);
					assert.equal(true, utilities.equals(expectedResult, result));
				});
			});
	});
});


describe('deleteAllTest', function() {
	describe('and condition', function() {
		it('should return list of json by its and condition', function() {
			var sampleData = [
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

			var condition = {
				where: {
					name: 'Kevin'
				}
			};

			var expectedResult = [
				{
			   	   id: 1, name: 'Jonathan', age: 22
			   	},
			   	{
			       id: 4, name: 'Endah', age: 22
			   	}
			];

			var result = doyok.deleteAllNotUsePromise(condition, sampleData);
			assert.equal(true, utilities.equals(expectedResult, result));
		});
	});

	describe('or condition', function() {
		it('should return list of json by its or condition', function() {
			var sampleData = [
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

			var condition = {
				where: {
					name: 'Kevin',
					or: [
						{
							name: 'Endah'
						}
					]
				}
			};

			var expectedResult = [
				{
			   	   id: 1, name: 'Jonathan', age: 22
			   	}
			];

			var result = doyok.deleteAllNotUsePromise(condition, sampleData);
			assert.equal(true, utilities.equals(expectedResult, result));
		});
	});

	describe('or and condition', function() {
		it('should return list of json by it aor, and condition', function() {
			var sampleData = [
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

			var condition = {
				where: {
					name: 'Kevin',
					or: [
						{
							name: 'Endah', age: 40
						},
						{
							name: 'Endah', id: 4
						},
						{
							name: 'Endah'
						}
					]
				}
			};

			var expectedResult = [
				{
			   	   id: 1, name: 'Jonathan', age: 22
			   	}
			];

			var result = doyok.deleteAllNotUsePromise(condition, sampleData);
			assert.equal(true, utilities.equals(expectedResult, result));
		});
	});
});

describe('updateAllTest', function() {
	describe('and condition', function() {
		it('should return list of json by its and condition', function() {
			var sampleData = [
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

			var condition = {
				where: {
					name: 'Kevin'
				}
			};

			var setterData = {
				name: 'Mark'
			};

			var expectedResult = [
				{
			   	   id: 1, name: 'Jonathan', age: 22
			   	},
			   	{
			   	   id: 2, name: 'Mark', age: 20
			   	},
			   	{
			       id: 2, name: 'Mark', age: 20
			   	},
			   	{
			       id: 3, name: 'Mark', age: 10
			   	},
			   	{
			       id: 4, name: 'Endah', age: 22
			   	}
			];

			var result = doyok.updateAllNotUsePromise(setterData, condition, sampleData);
			assert.equal(true, utilities.equals(expectedResult, result));
		});
	});

	describe('or condition', function() {
		it('should return list of json by its or condition', function() {
			var sampleData = [
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

			var condition = {
				where: {
					or: [
						{
							name: 'Kevin'
						}
					]
				}
			};

			var setterData = {
				name: 'Mark'
			};

			var expectedResult = [
				{
			   	   id: 1, name: 'Jonathan', age: 22
			   	},
			   	{
			   	   id: 2, name: 'Mark', age: 20
			   	},
			   	{
			       id: 2, name: 'Mark', age: 20
			   	},
			   	{
			       id: 3, name: 'Mark', age: 10
			   	},
			   	{
			       id: 4, name: 'Endah', age: 22
			   	}
			];

			var result = doyok.updateAllNotUsePromise(setterData, condition, sampleData);
			assert.equal(true, utilities.equals(expectedResult, result));
		});
	});

	describe('and or condition', function() {
		it('should return list of json by its and, or condition', function() {
			var sampleData = [
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

			var condition = {
				where: {
					name: 'Endah',
					or: [
						{
							name: 'Kevin', age: 100
						}
					]
				}
			};

			var setterData = {
				name: 'Mark'
			};

			var expectedResult = [
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
			       id: 4, name: 'Mark', age: 22
			   	}
			];

			var result = doyok.updateAllNotUsePromise(setterData, condition, sampleData);
			assert.equal(true, utilities.equals(expectedResult, result));
		});
	});
});