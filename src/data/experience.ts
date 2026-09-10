export type ExperienceKind = 'education' | 'internship' | 'community' | 'award';

export interface ExperienceItem {
  id: string;
  date: string;
  title: string;
  organization: string;
  description: string;
  kind: ExperienceKind;
  status: 'active' | 'selected';
}

export const experience: ExperienceItem[] = [
  {
    id: 'engineering-computing',
    date: '2024 — NOW',
    title: 'Engineering Management × Computing',
    organization: 'Northeast Forestry University',
    description: '在工程管理主修中持续叠加计算机科学训练，关注数字建造、软件和数据系统的连接。',
    kind: 'education',
    status: 'active',
  },
  {
    id: 'qldevicecheck',
    date: '2026',
    title: 'Device Inspection Tooling',
    organization: 'QLDeviceCheck',
    description: '参与配置驱动的设备检测工具开发，覆盖串口、网络检测和 Web 管理界面。',
    kind: 'internship',
    status: 'selected',
  },
  {
    id: 'career-office',
    date: '2025 — 2026',
    title: 'Campus Career Operations',
    organization: '就业合作处学生助理',
    description: '协助企业进校、招聘活动支持、问卷发放和学生协调，把复杂的现场流程变成可执行的节点。',
    kind: 'community',
    status: 'selected',
  },
  {
    id: 'bim-award',
    date: '2026',
    title: 'BIM Design Innovation Competition',
    organization: '广联达杯 · G 模块本科组',
    description: '团队获得常规赛道本科组三等奖。',
    kind: 'award',
    status: 'selected',
  },
];
