
const util = require('./index.js');

const ENUM = {BUILD: 0, FINAL: 1};

class Busybox extends util.Build {

	constructor() {
		super();
		this.dockerfile.push(new util.Dockerfile()); // example of multi layer
		this.author = 'dave';
	}

	build() {
		return super.build().then(() => {
			this.dockerfile[ENUM.BUILD]
				.run('echo "add a run command" > /tmp/build');
			this.dockerfile[ENUM.FINAL]
				.copy('echo --from=0 /tmp/build /tmp/build')
				.cmd('["sh"]');
		});
	}

}

let a = new Busybox();

a.toFile().then(() => {
	return a.run();
}).then(() => {
	console.log('done');
});
