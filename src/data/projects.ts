export type ProjectStatus = 'active' | 'selected' | 'exploratory' | 'coursework';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  details: string;
  role: string;
  status: ProjectStatus;
  stack: string[];
  links: ProjectLink[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'personal-agent-knowledge-base',
    title: 'Personal Agent Knowledge Base',
    eyebrow: 'LOCAL INTELLIGENCE / 01',
    summary: '一个本地优先的个人知识库，把文档、混合检索和带来源问答组织成可持续使用的工作台。',
    details: '围绕多知识库、文档解析、向量与关键词混合检索、引用追踪和本地运行设计；公开页面只介绍架构，不暴露私有资料。',
    role: 'Architecture · Full-stack implementation',
    status: 'active',
    stack: ['FastAPI', 'SQLAlchemy', 'ChromaDB', 'BM25', 'RAG'],
    links: [],
    featured: true,
  },
  {
    slug: 'qldevicecheck',
    title: 'QLDeviceCheck',
    eyebrow: 'FIELD SYSTEMS / 02',
    summary: '配置驱动的通用设备检测工具，连接串口、网络检测和 Web 管理界面。',
    details: '将设备检查流程拆成可配置的检测节点，强调现场可诊断性、可重复运行和清晰的 Web 操作反馈。',
    role: 'Device tooling · Python · Web UI',
    status: 'selected',
    stack: ['Python', 'Linux', 'Serial', 'TCP', 'Web UI'],
    links: [],
    featured: true,
  },
  {
    slug: 'construction-cost-analyzer',
    title: 'Construction Cost Analyzer',
    eyebrow: 'ENGINEERING DATA / 03',
    summary: '把工程成本数据整理成可探索的分析流程，连接工程管理语境与数据工具。',
    details: '当前作为探索性作品集项目，重点是数据清洗、分析视图和英文报告的可复现表达，不把探索性结果包装成最终结论。',
    role: 'Data exploration · Engineering context',
    status: 'exploratory',
    stack: ['Python', 'Data Analysis', 'Visualization', 'Engineering'],
    links: [],
    featured: true,
  },
  {
    slug: 'cardcraft',
    title: 'CardCraft',
    eyebrow: 'GAME SYSTEMS / 04',
    summary: '一款卡牌构筑与肉鸽玩法的 Godot 项目，把规则、反馈和美术表达组合成可玩的系统。',
    details: '持续迭代中的游戏原型，关注卡牌组合、事件节奏、界面反馈和从系统设计到可玩构建的完整链路。',
    role: 'Game systems · Prototype development',
    status: 'active',
    stack: ['Godot', 'GDScript', 'Game Design', 'UI'],
    links: [],
    featured: true,
  },
  {
    slug: 'drone-inspection',
    title: 'Drone Inspection System',
    eyebrow: 'COURSE SYSTEMS / 05',
    summary: '课程项目方向的无人机巡检系统，将工程现场问题转译为可操作的软件流程。',
    details: '以课程项目为边界展示，不夸大为已部署产品；重点呈现需求拆解、数据流和工程场景理解。',
    role: 'Course project · System modeling',
    status: 'coursework',
    stack: ['System Design', 'Inspection', 'Data Flow'],
    links: [],
    featured: false,
  },
];
