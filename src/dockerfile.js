
const ENUM = {JOIN: ' && \\\n\t'};

class Dockerfile {

	constructor() {
		this._workdir = '';
		this._entrypoint = '';
		this._commands = [];
		this._env = [];
		this._from = 'alpine:3.9';
	}

	from(f) {
		this._from = f;
		return this;
	}

	workdir(w) {
		this._workdir = w;
		return this;
	}

	run(a) {
		this._commands.push(`RUN ${Array.isArray(a) ? a.join(ENUM.JOIN) : a}`);
		return this;
	}

	copy(c) {
		this._commands.push(`COPY ${c}`);
		return this;
	}

	env(e) {
		if (typeof e === 'object') {
			for (let i in e) {
				this._env.push(`${i}=${e[i]}`);
			}
		} else {
			this._env.push(e);
		}
		return this;
	}

	cmd(c) {
		return this.entrypoint(c);
	}

	entrypoint(c) {
		this._entrypoint = c;
		return this;
	}

	toString() {
		let flat = [
			`FROM ${this._from}`,
			this._env.map((a) => `ENV ${a}`).join('\n'),
			this._commands.join('\n'),
			(this._workdir) ? `WORKDIR ${this._workdir}` : '',
			(this._entrypoint) ? `ENTRYPOINT ${this._entrypoint}` : ''
		].filter((a) => a);
		return flat.join('\n');
	}

}

module.exports = Dockerfile;
