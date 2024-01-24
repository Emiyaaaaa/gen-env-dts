# gen-env-dts
Easily generate `env.d.ts` files for `.env` files

### Output (Support custom template)
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

![image](https://github.com/Emiyaaaaa/gen-env-dts/assets/37606228/1b26c33c-621a-46c2-a648-a5305f6a4b41)

## Usage 1
```bash
npx gen-env-dts
```

## Usage 2

```bash
# npm
npm install --save-dev gen-env-dts

#yarn
yarn add --dev gen-env-dts

#pnpm
pnpm add --save-dev gen-env-dts
```

./package.json
```json
{
  "scripts": {
    "env-dts": "gen-env-dts"
  }
}
```
```bash
npm run env-dts
```

## Options
- `--input` (or `-i`)
- `--output` (or `-o`)
- `--template` (or `-t`)



### `--input` (or `-i`)
Input file path, default: `.env`
```bash
npx gen-env-dts -i ./path/to/env/file
```
Multiple input files
```bash
npx gen-env-dts -i ./path/to/env/file1 -i ./path/to/env/file2 -o ./path/to/output/file1 -o ./path/to/output/file2
```
>NOTE: If multiple input files are set, you need to use `--output` option to specify all of output files path.

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
