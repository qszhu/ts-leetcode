### Steps for solving a problem

0. Put LeetCode session cookie in `.env`

1. Create a solution for the problem. Provide problem slug (last path segment of url) as argument.

```bash
$ npm run init invert-binary-tree
```

2. Edit test cases in `questions/invert-binary-tree/input`.

3. Edit solution in `questions/invert-binary-tree/solution.ts`.

4. Run tests.

```bash
$ npm run test
```

5. Submit.

```bash
$ npm run submit
```

### Options in `.env`

* `LEETCODE_SESSION`: session cookie after login
* `QUESTIONS_ROOT_DIR=questions`: root dir for question solutions
* `MINIFY=false`: minify solutions with `terser`
  * minify options: `minify.json`
* `OBFUSCATE=false`: obfuscate solutions with `javascript-obfuscator`
  * obfuscate options: `javascript-obfuscator.json` 

### Notes

* `npm run init` can be run multiple times to create new solutions to a same questions.
  * new solutions will be named as `solution2.ts`, `solution3.ts`, etc.
  * `solution.ts` is a symlink to the latest added solution.
  * use `npm run select n` to set solution n to current solution, which should be tested and submited.
* `npm run` commands will use the same problem slug of the prev command if its argument is omitted.
