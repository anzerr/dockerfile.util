
### `Intro`
util to script dockerfile creation

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/dockerfile.util.git
npm install --save @anzerr/dockerfile.util
```

### `Example`
``` javascript
const util = require('dockerfile.util');

class Busybox extends util.Build {

	constructor() {
		super();
		this.author = 'dave';
	}

	build() {
		return super.build().then(() => {
			this.dockerfile[0]
				.run('echo "add a run command"')
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
```