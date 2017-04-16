# Doyok
Retrieves values from JSON for data binding. Using commands like sequelize.

## Installation

`npm install doyok`

Will install the latest version of doyok (currently 1.0).

## Features

- Data binding
- Promises

## Example Usage


var doyok = require('doyok');

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


### Find

var condition = {
  where: {
    name: 'Kevin',
    or: [
      {
        name: 'Sitta', age: 22
      },
      {
        id: 4, name: 'Endah'
      },
      {
        age: 22
      }
    ]
  },
  limit: 10,
  offset: 0, 
  order: {
    name: 1,
    age: 1
  }
};


doyok.findAll(condition, json).then(function(result) {
   console.log(result);                                                   
});


### Delete

var condition = {
  where: {
    name: 'Kevin',
    or: [
      {
        name: 'Sitta', age: 22
      },
      {
        id: 4, name: 'Endah'
      },
      {
        age: 22
      }
    ]
  }
};

doyok.deleteAll(condition, json).then(function(result) {
   console.log(result);                                                   
});


### Update

var setter = {
	age: 30	
};

var condition = {
  where: {
    name: 'Kevin',
    or: [
      {
        name: 'Sitta', age: 22
      },
      {
        id: 4, name: 'Endah'
      },
      {
        age: 22
      }
    ]
  }
};

doyok.updateAll(condition, json).then(function(result) {
   console.log(result);                                                   
});
