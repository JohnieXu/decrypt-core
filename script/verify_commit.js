const msgPath = process.env.HUSKY_GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(`
      不合法的 commit 消息格式。
      请查看 git commit 提交规范：https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum
  `);

  process.exit(1);
}
