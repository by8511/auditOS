import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const file = path.resolve('artifacts/auditOS/prototype/auditos-v0-5.html');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const consoleIssues = [];
page.on('console', msg => {
  if (['error', 'warning'].includes(msg.type())) consoleIssues.push(`${msg.type()}: ${msg.text()}`);
});
page.on('pageerror', err => consoleIssues.push(`pageerror: ${err.message}`));
await page.goto(pathToFileURL(file).href);
await page.waitForLoadState('domcontentloaded');

await page.getByRole('button', { name: /Overview 概览/ }).waitFor();
await page.getByText('项目承接 / Engagement').waitFor();
await page.getByText('审计计划 / Planning').waitFor();
await page.getByText('函证与外部证据 / Confirmation').waitFor();
await page.getByText('归档与签发 / Archive').waitFor();

await page.getByRole('button', { name: /Requests 请求/ }).click();
await page.locator('#pbc-accordion').getByRole('button', { name: /01 公司基本资料 \/ Corporate/ }).waitFor();
await page.locator('#pbc-accordion').getByRole('button', { name: /04 收入 \/ Revenue/ }).click();
const revenueSection = page.locator('#pbc-accordion .category-section').filter({ hasText: '04 收入 / Revenue' });
await revenueSection.getByText('审计重点').waitFor();
await revenueSection.locator('.category-items li').filter({ hasText: '收入确认政策' }).waitFor();
await revenueSection.locator('.category-panel').getByText('资料项').waitFor();
await revenueSection.locator('.category-panel').getByText('已建请求').waitFor();
const oldPbcTableCount = await page.locator('#request-table').count();
if (oldPbcTableCount) throw new Error('PBC request table should be folded into category panels, not repeated globally');
await page.locator('#pbc-accordion').getByRole('button', { name: /16 其他 \/ Others/ }).waitFor();
await page.getByRole('button', { name: '模拟客户上传' }).click();
await page.getByText('REV-EV-004 · 待 AI 解析').waitFor();

await page.getByRole('button', { name: '导入资料' }).click();
await page.getByRole('dialog').getByText('导入资料 / Import Evidence').waitFor();
await page.getByRole('dialog').getByText('按 PBC 分类上传').waitFor();
await page.getByLabel('PBC 分类').selectOption('revenue');
await page.locator('#category-target').getByText('04 收入 / Revenue').waitFor();
await page.getByRole('button', { name: '关闭' }).click();

await page.getByRole('button', { name: '发送催收' }).click();
await page.getByRole('dialog').getByText('发送催收 / Send Reminder').waitFor();
await page.getByRole('button', { name: '关闭' }).click();

await page.getByRole('button', { name: '生成经理复核包' }).click();
await page.getByRole('dialog').getByText('经理复核包 / Review Package').waitFor();
await page.getByRole('button', { name: '关闭' }).click();

await page.getByRole('button', { name: /Evidence 证据链/ }).click();
await page.locator('#evidence-flow .node').filter({ hasText: 'REV-EV-004' }).click();
await page.getByText('缺失，阻塞底稿').waitFor();

await page.getByRole('button', { name: /Risks 风险/ }).click();
await page.locator('#risk-list .risk-card').filter({ hasText: '疑似重复付款' }).click();
await page.locator('#risk-detail').getByText('CASH-R-002').waitFor();

await page.getByRole('button', { name: /AI Copilot/ }).click();
await page.getByRole('button', { name: '询问' }).click();
await page.getByText('经理复核前，不应形成最终收入确认结论').waitFor();

await page.getByRole('button', { name: /Account 用户中心/ }).click();
await page.getByLabel('邮箱').fill('manager@audit-os.test');
await page.getByLabel('密码').fill('audit-os-demo');
await page.getByRole('button', { name: '登录', exact: true }).click();
await page.getByRole('heading', { name: '陈经理 · 项目经理' }).waitFor();
await page.getByRole('button', { name: '注册新事务所账号' }).click();
await page.getByText('创建事务所工作区').waitFor();

const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
await browser.close();

if (consoleIssues.length) throw new Error(`Console issues:\n${consoleIssues.join('\n')}`);
if (overflow) throw new Error('Mobile horizontal overflow detected');
console.log('Audit OS Playwright smoke passed');
