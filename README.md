背景和开发过程见此[博文](https://qszhu.github.io/2020/08/16/leetcode-with-typescript.html)

## LeetCode TypeScript 解题工具

### 特性
* 针对`leetcode-cn.com`开发
* 提供`TypeScript`工程模版，支持自定义
* 使用本地测试数据
* 支持同一个问题的多个解答，可随时切换

### 运行需求

* Node.js v10+
* Google Chrome
* 仅在Mac OSX下测试过

### 安装

```bash
$ npm i -g ts-leetcode
```

### 初始化工程

* 由[leetcode-ts-template](https://github.com/qszhu/leetcode-ts-template)模版创建工程并clone到本地

* 在工程根目录运行以下命令：

```bash
$ npm i
$ mv .tslcrc.example .tslcrc
```

* 根据需要调整`.tslcrc`中`browserPath`的值为Google Chrome浏览器路径

* 登录（用户名和密码会被直接发送到leetcode网站，不会被保存到本地或其他地方）：

```bash
$ tslc login
✔ Username: · xxxxxxxx
✔ Password: · ********
Logging in, this may take some time...
Success!
```

### 解题步骤

1. 创建解答目录

```bash
$ tslc init invert-binary-tree
```

需提供题目的短标题作为参数。例如题目的url为`https://leetcode-cn.com/problems/invert-binary-tree/`，则题目的短标题为url路径的最后一部分`invert-binary-tree`

若第一次运行，此命令会创建如下目录结构：

```
questions/invert-binary-tree
├── input
├── solution.ts -> solution1.ts
├── solution1.ts
└── tsconfig.json
```

2. 编辑`input`中的测试数据

3. 编辑`solution.ts`中的代码

4. 编译

```bash
$ tslc build
Hash: f5834e34f10e512f08a5
Version: webpack 4.44.1
Time: 1235ms
Built at: 2020-08-15 11:46:53 AM
      Asset      Size  Chunks             Chunk Names
solution.js  7.03 KiB       0  [emitted]  main
Entrypoint main = solution.js
[0] ./questions/invert-binary-tree/solution1.ts 868 bytes {0} [built]
```

5. 测试

```bash
$ tslc test
STARTED
STARTED
SUCCESS
```

6. 提交

```bash
$ tslc submit
STARTED
Accepted
Runtime: 84 ms, 32.27%
Memory: 40 MB, 5.12%
```

### 配置`.tslcrc`

* `browserPath`: Google Chrome浏览器路径
* `mode`: [webpack mode](https://webpack.js.org/configuration/mode/)

### 备注

* `tslc init`可以被多次运行，每次运行会新增一个解答文件
  * 新文件按照`solution2.ts`, `solution3.ts`的顺序命名
  * `solution.ts`是指向最新解答文件的软链接，是后续构建测试和提交的输入文件
  * `tslc select <n> [questionSlug]`会将软链接指向`solution<n>.ts`
* 如果未向命令行提供题目短标题，则会使用最近一次命令中使用过的短标题
