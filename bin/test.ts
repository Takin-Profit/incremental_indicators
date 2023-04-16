import { expect } from "@japa/expect"
import { pathToFileURL } from "node:url"
import { apiClient } from "@japa/api-client"
import { specReporter } from "@japa/spec-reporter"
import { runFailedTests } from "@japa/run-failed-tests"
import { configure, processCliArgs, run } from "@japa/runner"

/*
|--------------------------------------------------------------------------
| Configure tests
|--------------------------------------------------------------------------
|
| The configure method accepts the configuration to configure the Japa
| tests runner.
|
| The first method call "processCliArgs" process the command line arguments
| and turns them into a config object. Using this method is not mandatory.
|
| Please consult japa.dev/runner-config for the config docs.
*/
configure({
  ...processCliArgs(process.argv.slice(2)),
  // eslint-disable-next-line unicorn/no-useless-spread
  ...{
    files: ["tests/**/*.spec.ts"],
    plugins: [expect(), runFailedTests(), apiClient("http://localhost:3333")],
    reporters: [specReporter()],
    importer: filePath => import(pathToFileURL(filePath).href),
  },
})

/*
|--------------------------------------------------------------------------
| Run tests
|--------------------------------------------------------------------------
|
| The following "run" method is required to execute all the tests.
|
*/
await run()
