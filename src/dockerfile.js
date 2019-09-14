
const ENUM = {JOIN: ' && \\\n\t'};

class Dockerfile {

	constructor() {
		this._workdir = '';
		this._entrypoint = '';
		this._commands = [];
		this._env = [];
		this._arg = [];
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

	push(key, arg) {
		this._commands.push(`${key} ${arg}`);
		return this;
	}

	run(a) {
		return this.push('RUN', Array.isArray(a) ? a.filter((b) => b.toString()).join(ENUM.JOIN) : a);
	}

	copy(c) {
		return this.push('COPY', c);
	}

	arg(e) {
		if (typeof e === 'object') {
			for (let i in e) {
				this._arg.push(e[i]);
			}
		} else {
			this._arg.push(e);
		}
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
			this._arg.map((a) => `ARG ${a}`).join('\n'),
			this._env.map((a) => `ENV ${a}`).join('\n'),
			this._commands.join('\n'),
			(this._workdir) ? `WORKDIR ${this._workdir}` : '',
			(this._entrypoint) ? `ENTRYPOINT ${this._entrypoint}` : ''
		].filter((a) => a);
		return flat.join('\n');
	}

}

module.exports = Dockerfile;
