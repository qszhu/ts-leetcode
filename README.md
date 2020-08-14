### Features
* Works on `leetcode-cn.com`
* `TypeScript` project template
* `Local` test data
* Stores `multiple solutions` to a single question

### Install ts-leetcode cli

```bash
$ npm i -g ts-leetcode
```

### Prepare project

* Create project from template https://github.com/qszhu/leetcode-ts-template

* Run command

```bash
$ npm i
$ mv .tslcrc.example .tslcrc
```

* Put LeetCode session cookie in `.tslcrc`

### Steps for solving a problem

1. Create a solution for the problem. Provide the problem slug (last path segment of the url) as argument. (For example, `invert-binary-tree`)

```bash
$ tslc init invert-binary-tree
```

2. Edit test cases in `questions/invert-binary-tree/input`.

3. Edit solution in `questions/invert-binary-tree/solution.ts`.

4. Build soltuion.

```bash
$ tslc build
```

5. Run tests.

```bash
$ tslc test
```

6. Submit.

```bash
$ tslc submit
```

### Options in `.tslcrc`

* `leetcodeSession`: session cookie after login
* `mode`: [webpack mode](https://webpack.js.org/configuration/mode/)

### Notes

* `tslc init` can be run multiple times to create new solutions for a same question.
  * new solutions will be named as `solution2.ts`, `solution3.ts`, etc.
  * `solution.ts` is a symlink to the latest added solution.
  * use `tslc select n [questionSlug]` to set solution_n as the current solution, which could then be tested and submited.
* if `questionSlug` is not provided for the current command, last `questionSlug` used in previous commands will be used.
