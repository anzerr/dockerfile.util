
const path = require('path'),
	Dockerfile = require('./dockerfile.js'),
	util = require('./util.js'),
	fs = require('fs.promisify');

class Build {

	constructor() {
		this.dockerfile = [
			new Dockerfile()
		];
		this.author = '';
		this.dockerName = 'Dockerfile';
		this.dockerPath = '.';
		this.path = '.';
		this.name = '';
		this.version = 0;
		this.cache = false;
	}

	package() {
		return fs.readFile(path.join(this.path, 'package.json')).then((res) => {
			return JSON.parse(res.toString());
		});
	}

	info() {
		return this.package().then((json) => {
			let name = (json.name.match(/\/(.*?)$/) || json.name.match(/(.*?)$/))[1].replace(/[^a-zA-A0-9\-_]/g, '-');
			return {version: json.version, name: name};
		});
	}

	build() {
		return Promise.resolve();
	}

	toString() {
		return this.build().then(() => {
			let o = [];
			for (let i in this.dockerfile) {
				o.push(this.dockerfile[i].toString());
			}
			return o.join('\n\n');
		});
	}

	toFile() {
		return this.toString().then((res) => {
			return fs.writeFile(path.join(this.path, this.dockerName), res);
		});
	}

	run() {
		return this.toFile().then(() => this.info()).then((res) => {
			let author = (this.author === '' || this.author.match(/\/$/)) ? this.author : this.author + '/',
				version = this.version || res.version,
				name = this.name || res.name;
			return util.exec(`docker build ${!this.cache ? '--no-cache' : ''} -t ${author}${name}:${version} -f ${this.dockerName} ${this.dockerPath}`, {cwd: this.path});
		});
	}

}

module.exports = Build;
