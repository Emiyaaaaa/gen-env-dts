export function getArg(option: string[]) {
	const index = process.argv.findIndex((arg) => option.includes(arg))
	if (index !== -1) {
		const nextArg = process.argv[index + 1]
		if (nextArg && !nextArg.startsWith("-")) {
			return nextArg
		}
	}
}

export function getArgs(option: string[]) {
	const result = process.argv
		.map((arg, index) => {
			if (option.includes(arg)) {
				const nextArg = process.argv[index + 1]
				if (nextArg && !nextArg.startsWith("-")) {
					return nextArg
				}
			}
		})
		.filter(Boolean)

	if (result.length) {
		return result
	}
}
