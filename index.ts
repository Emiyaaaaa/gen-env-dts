#!/usr/bin/env node
import fs from "fs"
import dotenv from "dotenv"
import { getArg, getArgs } from "./utils/getArgs"

const inputArgs = getArgs(["--input", "-input", "--i", "-i"])
const outputArgs = getArgs(["--output", "-output", "--o", "-o"])
const templateArg = getArg(["--template", "-template", "--t", "-t"])

const envPaths = inputArgs ?? [".env"]
const outputPaths = outputArgs ?? ["env.d.ts"]
const template =
	templateArg ??
	`${process.argv[1]!.replace(".bin", "").replace(
		/node_modules\/gen-env-dts\/.*?/g,
		"node_modules/gen-env-dts",
	)}/template.d.ts`
const templateString = fs.readFileSync(template, "utf-8")

for (const index in envPaths) {
	// .env file path
	const envPath = envPaths[index]!

	// ['VAR1', 'VAR2', ...]
	const envKeys = Object.keys(dotenv.config({ path: envPath })?.parsed ?? {})

	// generate env.d.ts string
	const dtsString = templateString.replace(
		/(\s*?)TEMPLATE_REPLACE/,
		envKeys.map((k) => `$1${k}: string`).join(""),
	)

	// get output file path
	const outputPath =
		outputPaths[index] ??
		(() => {
			const output = envPath.startsWith(".") ? envPath.slice(1) : envPath
			return `${output}.d.ts`
		})()

	// write env.d.ts file
	fs.writeFileSync(outputPath, dtsString)
}
