
var 
	path = require('path'), 
	fs = require('fs'), 
	ResultSet = require('./resultset');


var types = { };
var base = __dirname + '/validators';

function validate(input, callback) {
	var results = new ResultSet(callback);
	this.validate(input, results);
}

fs.readdirSync(base).forEach(function(file){
	if (path.extname(file) !== ".js")
		return;
	var component = require(base + "/" + file);

	types[path.basename(file, ".js")] = component;
});

exports.create = function(type, options) {
	if (!types[type])
		throw "Unknown type "+type+"!";
	if (typeof types[type] !== "function")
		throw "Can't instantiate "+type+"!";
	var obj = new types[type](options);
	return obj;
}

exports.validate = function(v, input, callback) {
	validate.call(v, input, callback);
}