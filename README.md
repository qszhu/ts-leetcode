### TypeScript Env for Online Judge

#### Init problem
```bash
$ npm run init leetcode

✔ What's the name of the problem? · swap-nodes-in-pairs
✔ What's the name of the function? · swapPairs

Loaded templates: _templates
       added: src/swap-nodes-in-pairs/solution.spec.ts
       added: src/swap-nodes-in-pairs/solution.ts
       added: src/swap-nodes-in-pairs/tsconfig.json
```

#### Run tests
```bash
$ npm start src/swap-nodes-in-pairs

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/swap-nodes-in-pairs/**/*
[nodemon] watching extensions: ts

  solution
    ✓ should pass edge tests
    ✓ should pass tests


  2 passing (5ms)

[nodemon] clean exit - waiting for changes before restart
```

* Watches for changes in `src/<path>`, compiles ts and runs tests
  * `solution.ts`: typescript solution file
  * `solution.spec.ts`: test file
  * `solution.js`: submit as javascript

#### Options

in `.env`

* `MINIFY`: minify with terser (config: `minify.json`)
* `OBFUSCATE`: obfuscate with javascript-obfuscator (config: `javascript-obfuscator.json`)
