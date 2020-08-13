### Install ts-leetcode cli

```bash
$ npm i -g ts-leetcode
```

### Prepare project

* Create project from template https://github.com/qszhu/leetcode-ts-template

* Run command

```bash
$ npm i
$ cp .env.example .env
```

* Put LeetCode session cookie in `.env`

### Steps for solving a problem

1. Create a solution for the problem. Provide the problem slug (last path segment of the url) as argument. (For example, `invert-binary-tree`)

```bash
$ tslc init invert-binary-tree
```

2. Edit test cases in `questions/invert-binary-tree/input`.

3. Edit solution in `questions/invert-binary-tree/solution.ts`.

4. Build soltuion.

```bash
$ tslc build invert-binary-tree
```

5. Run tests.

```bash
$ tslc test invert-binary-tree
```

6. Submit.

```bash
$ tslc submit invert-binary-tree
```

### Options in `.env`

* `LEETCODE_SESSION`: session cookie after login
* `MODE`: [webpack mode](https://webpack.js.org/configuration/mode/)

### Notes

* `tslc init` can be run multiple times to create new solutions for a same question.
  * new solutions will be named as `solution2.ts`, `solution3.ts`, etc.
  * `solution.ts` is a symlink to the latest added solution.
  * use `tslc select <questionSlug> n` to set solution_n as the current solution, which could then be tested and submited.
