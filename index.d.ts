
declare namespace docker {

	declare class Build {
		public constructor();

		public package(): any;

		public info(): any;

		public build(): Promise<any>;

		public toString(): string;

		public toFile(): Promise<any>;

		public run(): Promise<any>;

	}

	declare class Dockerfile {
		public constructor();

		public from(alias: string): Dockerfile;

		public workdir(alias: string): Dockerfile;

		public run(alias: string): Dockerfile;

		public copy(alias: string): Dockerfile;

		public env(alias: string): Dockerfile;

		public cmd(alias: string): Dockerfile;

		public entrypoint(alias: string): Dockerfile;

		public toString(alias: string): string;

	}

}

export as namespace docker;
export = docker;