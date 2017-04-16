var q = require('q');
(function() {

  // Baseline setup
  // ---------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;


    // Create a safe reference to the Underscore object for use below.
  	var doyok = function(obj) {
    	if (obj instanceof doyok) return obj;
    	if (!(this instanceof doyok)) return new doyok(obj);
    	this._wrapped = obj;
  	};

  	// Collection Functions
  	// --------------------

  	// The cornerstone, an `each` implementation, aka `forEach`.
  	// Handles objects with the built-in `forEach`, arrays, and raw objects.
  	// Delegates to **ECMAScript 5**'s native `forEach` if available.
  	var each = doyok.each = doyok.forEach = function(obj, iterator, context) {
    	if (obj == null) return;
    	if (nativeForEach && obj.forEach === nativeForEach) {
      		obj.forEach(iterator, context);
    	} else if (obj.length === +obj.length) {
      		for (var i = 0, length = obj.length; i < length; i++) {
        		if (iterator.call(context, obj[i], i, obj) === breaker) return;
      		}
    	} else {
      		var keys = _.keys(obj);
      		for (var i = 0, length = keys.length; i < length; i++) {
        		if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      		}
    	}
  	};

  	// Export the Underscore object for **Node.js**, with
  	// backwards-compatibility for the old `require()` API. If we're in
  	// the browser, add `_` as a global object via a string identifier,
  	// for Closure Compiler "advanced" mode.
  	if (typeof exports !== 'undefined') {
    	if (typeof module !== 'undefined' && module.exports) {
      	exports = module.exports = doyok;
    	}
    	exports.doyok = doyok;
  	} else {
    	root.doyok = doyok;
  	}

  	// Current version.
  	doyok.VERSION = '1.0.0';

	doyok.removeNullPropertyOfObject = function(json){
		for (var key in json) {
		    if(json[key] == null || json[key] == "" || json[key] == "null"){
		      delete json[key];
		    }
		}

		return json;
	};

	doyok.isValueExistOnObject = function(json, val){
		for(var key in json){
			return json[key] == val;
		}
	};

	// Perform a deep comparison to check if two objects are equal.
	doyok.isEqual = function(a, b) {
	    return eq(a, b, [], []);
	};

	// Is a given array, string, or object empty?
	// An "empty" object has no enumerable own-properties.
 	function isEmpty(obj) {
	    if (obj == null) return true;
	    if (doyok.isArray(obj)) return obj.length === 0;
	    for (var key in obj) if (doyok.has(obj, key)) return false;
	    return true;
	};

	// Is a given value a DOM element?
	doyok.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	};

	// Is a given value an array?
	// Delegates to ECMA5's native Array.isArray
	doyok.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) == '[object Array]';
	};

	// Is a given variable an object?
	doyok.isObject = function(obj) {
	    return obj === Object(obj);
	};

	// Is a given object a finite number?
  	doyok.isFinite = function(obj) {
    	return isFinite(obj) && !isNaN(parseFloat(obj));
  	};

  	// Is the given value `NaN`? (NaN is the only number which does not equal itself).
  	doyok.isNaN = function(obj) {
    	return _.isNumber(obj) && obj != +obj;
  	};

  	// Is a given value a boolean?
  	doyok.isBoolean = function(obj) {
    	return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  	};

  	// Is a given value equal to null?
  	doyok.isNull = function(obj) {
    	return obj === null;
  	};

  	// Is a given variable undefined?
  	doyok.isUndefined = function(obj) {
    	return obj === void 0;
  	};

  	// Shortcut function for checking if an object has a given property directly
  	// on itself (in other words, not on a prototype).
  	doyok.has = function(obj, key) {
    	return doyok.hasOwnProperty.call(obj, key);
  	};

  	// Return a sorted list of the function names available on the object.
	// Aliased as `methods`
	doyok.functions = doyok.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	};

	function sortObjectByKeyAsc(json){
		return Object.keys(json).sort();
	};

	function sortObjectByKeyDesc(json){
		return Object.keys(json).sort().reverse();
	};

	function sortObjectByValueAsc(json){
		for(var i in json){
		   for(var j in json){
		      if(json[i] < json[j]){
		          var temp = json[i];
		          json[i] = json[j];
		          json[j] = temp;
		          break;
		      }
		   }
		}

		return json;
	};

	function sortObjectByValueDesc(json){
		for(var i in json){
		   for(var j in json){
		      if(json[i] > json[j]){
		          var temp = json[i];
		          json[i] = json[j];
		          json[j] = temp;
		          break;
		      }
		   }
		}

		return json;
	};

	function sortByKey(array, key) {
	    return array.sort(function(a, b) {
	        var x = a[key]; var y = b[key];
	        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	    });
	};

	function sortByKeys(array, keys){
	     return array.sort(function(a, b) {
	        var result = 0;
	        for(var key in keys){
	           if(a[key] < b[key]){
	               result = (keys[key] == 1) ? -1 : 1;
	               break;
	           } else if (a[key] > b[key]){
	               result = (keys[key] == 1) ? 1 : -1;
	               break;
	           } else if (a[key] == b[key]){
	              result = 0;
	           }
	        }
	        return result;
	     });
	};

	function or(json, conditions){
		for(var idx in conditions){
			var matched = false;
			for(var key in conditions[idx]){
				if(conditions[idx][key] == json[key]){
					matched = true;
				} else {
					matched = false;
					break;
				}
			}
			if (matched) return true;
		}

		return false;
	};

	function findByCondition(json, conditions) {
		var result = [];
		for(var i = 0;i < json.length; i++){ 
		   var matched = false;
	       for(var key in conditions){
	       		if (key == 'or'){
	       			if(or(json[i], conditions['or'])){
	       				matched = true;
	       				break;
	       			}
	       		} else {
	       			matched = (json[i].hasOwnProperty(key) && json[i][key] ==  conditions[key]) ? true : false
	       		}
	       }
	       if(matched) result.push(json[i]);
	       
		}

		return result;
	};

	function deleteByCondition(json, conditions){
		for(var i = 0;i < json.length; i++){
			var matched = false;
	       	for(var key in conditions){ 
				if (key == 'or'){
	       			if(or(json[i], conditions['or'])){
	       				matched = true;
	       				break;
	       			}
	       		} else {
	       			matched = (json[i].hasOwnProperty(key) && json[i][key] ==  conditions[key]) ? true : false
	       		}
			}
			if(matched) delete json[key];
		}

		return json;

	};

	function updateByCondition(json, conditions, setter){
		for(var i = 0;i < json.length; i++){
			var matched = false;
			for(var key in conditions){
				if (key == 'or'){
	       			if(or(json[i], conditions['or'])){
	       				matched = true;
	       				break;
	       			}
	       		} else {
	       			matched = (json[i].hasOwnProperty(key) && json[i][key] ==  conditions[key]) ? true : false
	       		}
			}
			if(matched){
				for(var key in setter){
					json[i][key] = setter[key];
				}
			}
		}

		return json;
	};

	// Return a list 
	doyok.findAll = function(params, object){
		var qdef = q.defer();
		var json = object;

		var whereConditions = {};

		if(params.hasOwnProperty('where')){
	        for(var key in params.where){
				whereConditions[key] = params.where[key];
			}
		}
		
		json = (!isEmpty(whereConditions)) ? findByCondition(json, whereConditions) : json

		json = (params.hasOwnProperty('order')) ? sortByKeys(json, params['order']) : json

		json = (params.hasOwnProperty('limit') && !params.hasOwnProperty('offset')) ? json.slice(0, params['limit']) : 
		       (!params.hasOwnProperty('limit') && params.hasOwnProperty('offset')) ? json.slice(params['offset'], json.length) :
		       (params.hasOwnProperty('limit') && params.hasOwnProperty('offset')) ? json.slice(params['offset'], params['limit']) : json

		qdef.resolve(json);

		return (qdef.promise);
	};

	// Return a list 
	function findAllNotUsePromise(params, object){
		var json = object;

		var whereConditions = {};

		if(params.hasOwnProperty('where')){
	        for(var key in params.where){
				whereConditions[key] = params.where[key];
			}
		}
		
		json = (!isEmpty(whereConditions)) ? findByCondition(json, whereConditions) : json

		json = (params.hasOwnProperty('order')) ? sortByKeys(json, params['order']) : json

		json = (params.hasOwnProperty('limit') && !params.hasOwnProperty('offset')) ? json.slice(0, params['limit']) : 
		       (!params.hasOwnProperty('limit') && params.hasOwnProperty('offset')) ? json.slice(params['offset'], json.length) :
		       (params.hasOwnProperty('limit') && params.hasOwnProperty('offset')) ? json.slice(params['offset'], params['offset'] + params['limit']) : json

		return json;
	};
	exports.findAllNotUsePromise = findAllNotUsePromise;

	doyok.deleteAll = function(params, object){
		var qdef = q.defer();
		var json = object;

		var whereConditions = {};

		if(params.hasOwnProperty('where')){
			for(var key in params.where){
				whereConditions[key] = params.where[key];
			}
		}

		if(!isEmpty(whereConditions)) json = deleteByCondition(json, whereConditions);

		qdef.resolve(json);

		return (qdef.promise);
	};

	doyok.updateAll = function(setter, params, object){
		var qdef = q.defer();
		var json = object;

		var whereConditions = {};

		if(params.hasOwnProperty('where')){
			for(var key in params.where){
				whereConditions[key] = params.where[key];
			}
		}

		if(!isEmpty(whereConditions)) json = updateByCondition(json, whereConditions, setter);

		qdef.resolve(json);

		return (qdef.promise);
	};

	// Extend a given object with all the properties in passed-in object(s).
  	doyok.extend = function(obj) {
    	each(slice.call(arguments, 1), function(source) {
      		if (source) {
        		for (var prop in source) {
          			obj[prop] = source[prop];
        		}
      		}
    	});
    	return obj;
  	};

	// Add all accessor Array functions to the wrapper.
  	each(['concat', 'join', 'slice'], function(name) {
    	var method = ArrayProto[name];
    	doyok.prototype[name] = function() {
      		return result.call(this, method.apply(this.doyokwrapped, arguments));
    	};
  	});

  	doyok.extend(doyok.prototype, {

    	// Start chaining a wrapped Underscore object.
    	chain: function() {
      		this.doyokchain = true;
      		return this;
    	},

    	// Extracts the result from a wrapped and chained object.
    	value: function() {
      		return this.doyokwrapped;
    	}

  	});


}).call(this);