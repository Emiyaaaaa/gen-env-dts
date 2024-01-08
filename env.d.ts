declare global {
	namespace NodeJS {
		interface ProcessEnv {
			AK: string
			SK: string
		}
	}
}

export {}
