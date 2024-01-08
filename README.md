# gen-env-dts
Easily generate `env.d.ts` files for `.env` files

## Output (Support custom template)
```ts
// ./env.d.ts
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			AK: string
			SK: string
		}
	}
}

export {}
```

## Install

npm
```bash
npm install --save-dev gen-env-dts
```
yarn
```bash
yarn add --dev gen-env-dts
```
pnpm
```bash
pnpm add --save-dev gen-env-dts
```

## Usage

scripts
```json
// package.json
{
  "scripts": {
    "env-dts": "gen-env-dts"
  }
}
```
```bash
npm run env-dts
```

npx
```bash
npx gen-env-dts
```

## Options
### `--input` (or `-i`)
Input file path, default: `.env`
```bash
npx gen-env-dts -i ./path/to/env/file
```
Multiple input files
```bash
npx gen-env-dts -i ./path/to/env/file1 -i ./path/to/env/file2 -o ./path/to/output/file -o ./path/to/output/file2
```
>NOTE: If multiple input files are set, you need to use `--output` option to specify the output files path.

### `--output` (or `-o`)
Output file path, default: `./env.d.ts`
```bash
npx gen-env-dts -o ./path/to/output/file
```

### `--template` (or `-t`)
Custom template file path, default: `./template.d.ts`
```bash
npx gen-env-dts -t ./path/to/template/file
```

default:
```ts
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
```

your custom template:
```ts
// ./my-template.d.ts
export interface MyEnv {
	// DON'T CHANGE NEXT LINE, this will be replaced by the env variables
	TEMPLATE_REPLACE 
}
```
```bash
npx gen-env-dts -t ./my-template.d.ts
```