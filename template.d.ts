// ./template.d.ts
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// DON'T CHANGE NEXT LINE, this will be replaced by the env variables
			TEMPLATE_REPLACE
		}
	}
}

export {}
