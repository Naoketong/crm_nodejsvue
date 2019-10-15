const Base = require('./Base.js');
class User extends Base {
	constructor(props = 'user') {
		super(props)
	}
}

module.exports = new User();
