
declare namespace docker {

	declare class Dockerfile {
		public constructor();

		public from(alias: string): Dockerfile;

		public workdir(alias: string): Dockerfile;

		public run(alias: string | string[]): Dockerfile;

		public copy(alias: string): Dockerfile;

		public env(alias: any): Dockerfile;

		public cmd(alias: string): Dockerfile;

		public entrypoint(alias: string): Dockerfile;

		public toString(alias: string): string;

	}

	declare class Build {

		public dockerfile: Dockerfile[];
		public author: string;
		public dockerName: string;
		public dockerPath: string;
		public path: string;
		public name: string;
		public version: number | string;
		public cache: boolean;

		public constructor();

		public package(): any;

		public info(): any;

		public build(): Promise<any>;

		public toString(): string;

		public toFile(): Promise<any>;

		public run(): Promise<any>;

	}

}

export as namespace docker;
export = docker;