
function Result(status, step) {
	this.status = status;
	this.step = step;
	this.acknowledged = false;
}

Result.prototype.acknowledge = function() {
	this.acknowledged = true;
}

Result.prototype.isOk = function() {
	return this.status === "ok" || this.status === "info" || (this.status === "warn" && this.acknowledged);
}

Result.prototype.isWarning = function() {
	return this.status === "warn" && !this.acknowledged;
}

Result.prototype.isFail = function() {
	return this.status === "fail";
}

function ResultSet(callback) {
	this.callback = callback;
}

ResultSet.prototype = [ ];

ResultSet.prototype.isOk = function() {
	return this.every(function(e){ return e.isOk(); });
}

ResultSet.prototype.isWarning = function() {
	return this.every(function(e){ return e.isWarning(); });
}

ResultSet.prototype.isFail = function() {
	return this.some(function(e){ return e.isFail(); });
}

ResultSet.prototype.ok = function(step) {
	step = step || "*";
	var r = new Result("ok", step);
	this.push(r);
	this[step] = r;
	return this;
}

ResultSet.prototype.fail = function(step) {
	step = step || "*";
	var r = new Result("fail", step);
	this.push(r);
	this[step] = r;
	return this;
}

ResultSet.prototype.warn = function(step) {
	step = step || "*";
	var r = new Result("warn", step);
	this.push(r);
	this[step] = r;
	return this;
}

ResultSet.prototype.info = function(step) {
	step = step || "*";
	var r = new Result("info", step);
	this.push(r);
	this[step] = r;
	return this;
}

ResultSet.prototype.done = function() {
	this.callback(this);
	return true;
}



module.exports = ResultSet;