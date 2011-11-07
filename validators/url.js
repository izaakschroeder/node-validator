
var http = require('http'), URL = require('url');

function Validator(options) {
	options = options || { };
	this.checkExistence = options.checkExistence || false;
}

Validator.prototype.validate = function(input, result) {
	if (!Validator.expression.test(input))
		result.fail("syntax");
	else
		result.ok("syntax");
	
	if (this.checkExistence) {
		var url = URL.parse(input);
		http.request({
			host: url.hostname,
			port: url.port,
			method: "HEAD",
			path: (url.pathname || "/") + (url.search || "")
		}, function(response){
			if (response.statusCode >= 200 && response.statusCode < 400)
				result.ok("existence");
			else
				result.fail("existence");
			result.done();
		}).end();
	}
	else {
		result.done();
	}

}

Validator.expression = /^((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

module.exports = Validator;
