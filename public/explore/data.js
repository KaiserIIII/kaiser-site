/* Portfolio content: curated public work only. No private sources or invented skill scores. */
window.KAISER_DATA = Object.freeze({
  owner: { name: "Yue Yu", zhName: "于越", github: "https://github.com/KaiserIIII", email: "hello@kaiseriii.me" },
  domains: [
    { id:"systems", color:"#b77559", label:{en:"Systems",zh:"系统设计"} },
    { id:"data", color:"#738b81", label:{en:"Data & protocols",zh:"数据与协议"} },
    { id:"verification", color:"#708aa2", label:{en:"Verification",zh:"验证与可靠性"} },
    { id:"research", color:"#9886a1", label:{en:"Research",zh:"实验与研究"} }
  ],
  projects: [
    {
      id:"cardcraft", name:"CardCraft", field:"01", group:"product", domains:["systems","verification"],
      tech:["Godot","GDScript","Steamworks"],
      en:{tag:"GAME / PRODUCT",short:"A card game where networking, persistence and Workshop content are part of the engineering.",story:"Beyond a playable card game: online state, Steam P2P, mod packages, save compatibility and a repeatable release process.",focus:"Multiplayer state, Steam integration and shipping a real game.",proof:"Playable Steam demo + open engineering case notes.",note:"The game source is private; its public case studies and Steam build are the inspectable evidence."},
      zh:{tag:"游戏 / 产品",short:"卡牌游戏，也是一套包含联机、存档和创意工坊的完整工程实践。",story:"不只是能玩的卡牌游戏，还涉及 Steam P2P、联机状态、模组内容、存档兼容及发布流程。",focus:"多人联机状态、Steam 集成与游戏交付。",proof:"可玩的 Steam Demo + 公开的工程技术案例。",note:"游戏完整源码为私有；公开技术案例与 Steam Demo 可供核验。"},
      links:[{title:"Steam demo",url:"https://store.steampowered.com/app/4338300/"},{title:"Engineering cases",url:"https://github.com/KaiserIIII/cardcraft-engineering-portfolio"}]
    },
    {
      id:"zhixu", name:"Zhixu / 知序", field:"02", group:"systems", domains:["systems","data","verification"],
      tech:["Python","FastAPI","RAG","SQLAlchemy"],
      en:{tag:"KNOWLEDGE / PLATFORM",short:"A self-hosted knowledge system with tenant boundaries, evidence-linked retrieval and workflows.",story:"The hard part is not a chatbot window: it is authorization boundaries, document ingestion, hybrid retrieval, citation provenance and versioned workflows.",focus:"Backend architecture, data isolation, async workflows and source-grounded retrieval.",proof:"Documented run: 120 backend tests + 33 frontend tests (2026-10-08).",note:"The documented tests use bounded fixtures; production-scale integration remains separate work."},
      zh:{tag:"知识 / 平台",short:"自托管知识系统，覆盖多租户隔离、检索引用和可视化工作流。",story:"真正困难的不是聊天窗口，而是权限边界、文档导入、混合检索、引用溯源与工作流版本管理。",focus:"后端架构、数据隔离、异步流程及证据型检索。",proof:"2026-10-08 验证记录：后端 120 项 + 前端 33 项测试。",note:"测试基于受控环境；不等同于已完成生产规模验收。"},
      links:[{title:"Source",url:"https://github.com/KaiserIIII/zhixu"},{title:"Verification",url:"https://github.com/KaiserIIII/zhixu/blob/main/docs/verification.md"}]
    },
    {
      id:"wifiscope", name:"WiFiScope", field:"03", group:"product", domains:["data","verification","systems"],
      tech:["Python","Tkinter","TCP / TLS","PCAP"],
      en:{tag:"NETWORK / DESKTOP",short:"A local-first network workstation with bounded checks and privacy-aware evidence handling.",story:"Network discovery, scoped TCP/TLS inspection, PCAP interpretation and SQLite case evidence — built to keep observations traceable.",focus:"Network I/O limits, evidence provenance, privacy and Windows packaging.",proof:"Portable Windows release and cross-platform CI records.",note:"Tests do not claim universal coverage of physical networks."},
      zh:{tag:"网络 / 桌面",short:"本地优先的网络工作台，强调有边界的检查与隐私友好的证据处理。",story:"网络发现、有边界的 TCP/TLS 检查、PCAP 解析以及 SQLite 案件证据，关注可追溯性。",focus:"网络 I/O 边界、证据来源、隐私保护和 Windows 打包。",proof:"Windows 便携版本及跨平台 CI 记录。",note:"自动测试不能替代所有实际网络环境验收。"},
      links:[{title:"Repository",url:"https://github.com/KaiserIIII/WiFiScope"},{title:"Windows release",url:"https://github.com/KaiserIIII/WiFiScope/releases/latest"}]
    },
    {
      id:"migrationwitness", name:"MigrationWitness", field:"04", group:"research", domains:["data","verification","research"],
      tech:["PostgreSQL","Python","Contract tests"],
      en:{tag:"DATABASE / REPRODUCTION",short:"A database migration can report success while silently breaking an application contract.",story:"Reproduces privilege loss after a real pg-osc migration on PostgreSQL 16/17, then checks application behavior with independent SQL invariants.",focus:"Fault reproduction, database permissions and independent oracles.",proof:"Recorded PostgreSQL 16/17 experiments and native ALTER controls.",note:"A specific tool and regression, not a blanket claim about every migration system."},
      zh:{tag:"数据库 / 实验复现",short:"数据库迁移即便显示成功，也可能悄悄破坏应用权限契约。",story:"在 PostgreSQL 16/17 上复现真实 pg-osc 迁移的权限问题，并以独立 SQL 不变量核验应用行为。",focus:"故障复现、数据库权限及独立验证逻辑。",proof:"PostgreSQL 16/17 实验记录及原生 ALTER 对照组。",note:"这是具体工具与问题的复现，不代表所有迁移方案都有相同缺陷。"},
      links:[{title:"Source",url:"https://github.com/KaiserIIII/migrationwitness"},{title:"Experiment record",url:"https://github.com/KaiserIIII/migrationwitness/blob/main/CROSS_VERSION_RESULTS.md"}]
    },
    {
      id:"cost", name:"Construction Cost Analyzer", field:"05", group:"systems", domains:["systems","data"],
      tech:["Python","Decimal","BOQ","Cost modelling"],
      en:{tag:"CONSTRUCTION / COMPUTING",short:"A bridge between engineering management and reproducible, auditable calculations.",story:"Quantity takeoff, unit-rate estimating, bills of quantities and development appraisal within a consistent calculation model.",focus:"Domain modelling, numerical precision and traceable assumptions.",proof:"Open calculation engine, methodology notes and browser/CLI outputs.",note:"Educational and analytical workflows; not a claim of universal regulatory compliance."},
      zh:{tag:"工程 / 计算",short:"把工程管理知识转化为可复核、可追溯的造价计算系统。",story:"将工程量计算、单价分析、工程量清单和开发评价整合到一致的计算模型。",focus:"领域建模、数值精度及计算假设。",proof:"公开的计算引擎、方法说明及浏览器 / CLI 输出。",note:"面向学习与分析，不代表全面符合所有地区造价规范。"},
      links:[{title:"Source",url:"https://github.com/KaiserIIII/construction-cost-analyzer"},{title:"Methods",url:"https://github.com/KaiserIIII/construction-cost-analyzer/blob/main/docs/course-methods.md"}]
    },
    {
      id:"reproshift", name:"ReproShift", field:"06", group:"research", domains:["research","verification"],
      tech:["Python","Reproducibility","Environments"],
      en:{tag:"RESEARCH / REPRODUCIBILITY",short:"Exploring what historical software environments do to reproducibility.",story:"A versioned study of dependency compatibility, environment reconstruction and the boundaries of experimental reproduction.",focus:"Controlled experiments, dependency forensics and evidence retention.",proof:"Published versioned research artifact and protocols.",note:"Reproducing an environment is not the same as reproducing a scientific claim."},
      zh:{tag:"研究 / 可复现",short:"研究历史软件依赖环境与实验可复现性之间的关系。",story:"以版本化实验研究依赖兼容、环境重建，以及实验复现范围的真实边界。",focus:"受控实验、依赖诊断及证据保留。",proof:"公开的版本化研究工件与实验方案。",note:"复现运行环境不等于已复现科学结论。"},
      links:[{title:"Artifact",url:"https://github.com/KaiserIIII/reproshift-artifact"}]
    },
    {
      id:"qldevice", name:"QLDeviceCheck", field:"07", group:"systems", domains:["systems","data","verification"],
      tech:["Python","Modbus","SQLite"],
      en:{tag:"INDUSTRIAL / INSPECTION",short:"An inspection workflow for industrial devices, configuration snapshots and retests.",story:"Connects protocol-level observations to field acceptance: bounded checks, durable results and repeatability.",focus:"Protocol adapters, stateful acceptance and failure-focused retesting.",proof:"Repository, demo instructions and validation notes.",note:"Hardware-specific checks depend on the field environment."},
      zh:{tag:"工业 / 验收",short:"面向工业设备的巡检、配置快照和复测工作台。",story:"把工业协议观察与现场验收连接起来，包括有边界的检查、持久化结果和失败项复测。",focus:"协议适配、验收状态及针对失败项的复测。",proof:"公开仓库、演示说明和验证记录。",note:"硬件层面的验证依赖实际现场环境。"},
      links:[{title:"Source",url:"https://github.com/KaiserIIII/QLDeviceCheck_Generic_WebUI_Linux"},{title:"Demo notes",url:"https://github.com/KaiserIIII/QLDeviceCheck_Generic_WebUI_Linux/blob/main/docs/DEMO.md"}]
    },
    {
      id:"importproof", name:"ImportProof", field:"08", group:"systems", domains:["data","verification"],
      tech:["Python","CSV / XLSX","LibreOffice"],
      en:{tag:"DATA / FIDELITY",short:"Asking what actually survives when spreadsheets and text tables are imported or exported.",story:"A data-fidelity comparison tool which preserves evidence and explicitly reports uncertainty when equivalence cannot be established.",focus:"Formats, value semantics, conversion uncertainty and truthful results.",proof:"Real LibreOffice conversion records and test coverage.",note:"Some XLSX comparisons remain intentionally inconclusive."},
      zh:{tag:"数据 / 保真",short:"研究表格导入和导出时，哪些信息真正得到了保留。",story:"通过数据保真对比保留转换证据；当无法确认等价时，明确报告不确定性。",focus:"文件格式、数值语义、转换误差与诚实的判断。",proof:"真实 LibreOffice 转换记录及测试。",note:"部分 XLSX 比较会有意返回无法确认。"},
      links:[{title:"Source",url:"https://github.com/KaiserIIII/importproof"},{title:"Acceptance",url:"https://github.com/KaiserIIII/importproof/blob/main/PUBLICATION_READINESS.md"}]
    },
    {
      id:"tta", name:"Return-to-Source", field:"09", group:"research", domains:["research","verification"],
      tech:["PyTorch","Test-time adaptation","Experiments"],
      en:{tag:"ML / EXPERIMENT",short:"Empirical investigation of test-time adaptation, including results that did not support the hypothesis.",story:"A test-time adaptation study that retains negative mechanism findings and conditional evaluation rather than smoothing them away.",focus:"Experimental controls, negative results and a reproducible artifact.",proof:"Public experimental source and manuscript draft.",note:"A research artifact, not a peer-reviewed publication."},
      zh:{tag:"机器学习 / 实验",short:"测试时自适应研究，包括不支持原假设的实验结果。",story:"保留负面机制结果与条件性评估，不为叙事美观而隐藏实验失败。",focus:"实验对照、负面结果及可复现工件。",proof:"公开实验源码与论文草稿。",note:"这是研究工件，并非已发表的同行评审论文。"},
      links:[{title:"Research source",url:"https://github.com/KaiserIIII/return-to-source-hysteresis"}]
    },
    {
      id:"paperskill", name:"CS Nature Paper Skill", field:"10", group:"research", domains:["research","systems"],
      tech:["Python","Research workflow","Agents"],
      en:{tag:"AI / SCIENTIFIC WORKFLOW",short:"A research workflow built around evidence trails, review gates and inspectable decisions.",story:"Orchestrates research processes, protocol checkpoints and evidence accounting with explicit boundaries about scientific validation.",focus:"Automation design, provenance and reviewable research workflows.",proof:"Open workflow source, tests and documented readiness limits.",note:"A research assistant workflow; not a shortcut to an accepted paper."},
      zh:{tag:"AI / 科研流程",short:"围绕证据链、审查关卡和可检查决策设计的科研工作流。",story:"组织科研流程、实验协议与证据账本，并明确区分软件通过测试和科学结论经过验证。",focus:"自动化设计、来源溯源及可审核科研流程。",proof:"公开工作流代码、测试和适用范围说明。",note:"这是科研辅助流程，不代表自动获得论文录用。"},
      links:[{title:"Source",url:"https://github.com/KaiserIIII/cs-nature-paper-skill"}]
    }
  ],
  text: {
    en: {
      skip:"Skip to content",navWork:"Work",navMap:"Connections",navAbout:"About",navReach:"Get in touch",search:"Search",menu:"Menu",
      eyebrow:"A PERSONAL ENGINEERING NOTEBOOK   /   EST. IN CURIOSITY",
      heroA:"I like making things.",heroB:"And understanding them.",heroLead:"I'm Yue Yu (于越), an Engineering Management undergraduate at Northeast Forestry University, minoring in Computer Science & Technology.",
      heroSecond:"Software, games, engineering tools and the occasional research rabbit hole.",discover:"Explore the work",viewGithub:"Find me on GitHub",
      scroll:"SCROLL TO EXPLORE",edition:"SELECTED WORK · 2026",
      proofKicker:"THINGS THAT EXIST OUTSIDE THIS PAGE",proofTitle:"From an idea to something real.",
      proof1:"A playable game",proof1Description:"CardCraft on Steam",proof2:"A tested system",proof2Description:"Zhixu · 120 backend + 33 frontend tests",proof3:"A reproduced failure",proof3Description:"PostgreSQL 16/17 migration study",
      workKicker:"01 / SELECTED WORK",workTitle:"A few things I've built.",workSubtitle:"Different kinds of problems. The same habit of making them tangible.",
      exploreProject:"Explore case",allProjects:"All projects",product:"Products",systems:"Systems",research:"Research",
      mapKicker:"02 / AN EXPERIMENT",mapTitle:"Follow the connections.",mapSubtitle:"Drag a project, change the lens, or select a node. Different fields often share the same engineering questions.",
      connections:"Connections",mapDrag:"DRAG TO REARRANGE",all:"All",mapHint:"Select or drag a node · use arrow keys to explore",reset:"Reset layout",show:"Inspect project",
      inspectorDefault:"Select a project to see its details.",focus:"THE QUESTION",decision:"WHAT I WORKED ON",evidence:"EVIDENCE YOU CAN OPEN",limitations:"WHAT IT DOESN'T CLAIM",
      next:"Next project",prev:"Previous project",openSource:"Open the project",provenance:"Public project links only. Scope matters.",
      archiveKicker:"03 / THE ARCHIVE",archiveTitle:"More than the highlights.",archiveSubtitle:"A compact index of projects, experiments and open questions.",
      searchPlaceholder:"Find a project, language, or topic",noMatches:"No projects match. Try a broader term.",count:"PROJECTS IN VIEW",
      aboutKicker:"04 / A LITTLE ABOUT ME",aboutTitle:"Between disciplines.",aboutA:"Engineering management taught me to care about constraints, quantities and real environments. Computer science gave me new ways to turn those problems into systems.",
      aboutB:"I learn by shipping tools, studying failures and preserving the evidence — even when it contradicts the original idea.",
      aboutLabel1:"STUDY",aboutVal1:"Northeast Forestry University",aboutLabel2:"FOCUS",aboutVal2:"Systems · Data · Applied Research",
      contactTitle:"Have a question, an idea, or something interesting?",contactCopy:"I'm always happy to talk about software, engineering and unusual technical problems.",
      contactButton:"Say hello",sourceButton:"Browse GitHub",footerNote:"Built with curiosity, not a template.",commandTitle:"Jump to a project",commandHint:"Type a project or a technology",commandHelp:"↑ ↓ Navigate · Enter Open · Esc Close",
      shortcut:"Press ⌘K / Ctrl K to search",opening:"OPEN IN NEW TAB",copied:"Email copied",
      themeLabel:"Light, always.",menuClose:"Close",tagDemo:"STEAM / PLAYABLE",tagTests:"DATED VERIFICATION",tagPG:"REAL POSTGRESQL",
      metaDescription:"Yue Yu / 于越 — software, game systems, construction computing and reproducible research. Interactive portfolio.",
      mapProject:"Project",mapDomain:"Domain",mapStatus:"Interactive SVG with animated connections",resetDone:"Layout restored"
    },
    zh: {
      skip:"跳转到正文",navWork:"作品",navMap:"关系图",navAbout:"关于",navReach:"联系我",search:"搜索",menu:"菜单",
      eyebrow:"个人技术手记   /   从好奇心出发",
      heroA:"喜欢做点东西。",heroB:"也想弄清它们。",heroLead:"我是于越，东北林业大学工程管理本科生，辅修计算机科学与技术。",
      heroSecond:"做软件、游戏、工程工具，也会时不时钻进一个研究问题里。",
      discover:"看看我的作品",viewGithub:"访问 GitHub",
      scroll:"继续向下探索",edition:"精选作品 · 2026",
      proofKicker:"从屏幕走进现实的成果",proofTitle:"从一个想法，到真正做出来。",
      proof1:"一款能玩的游戏",proof1Description:"CardCraft · Steam 可玩 Demo",proof2:"一套经过测试的系统",proof2Description:"Zhixu · 后端 120 + 前端 33 项测试",proof3:"一次真实的问题复现",proof3Description:"PostgreSQL 16/17 迁移实验",
      workKicker:"01 / 精选作品",workTitle:"一些做出来的东西。",workSubtitle:"不同的问题，一样喜欢把想法落地。",
      exploreProject:"展开案例",allProjects:"全部项目",product:"产品",systems:"系统",research:"研究",
      mapKicker:"02 / 一个小实验",mapTitle:"看看它们如何联系。",mapSubtitle:"拖拽项目、切换方向或者点选节点。不同领域常常在解决类似的工程问题。",
      connections:"联系",mapDrag:"拖动节点试试",all:"全部",mapHint:"点击或拖动节点 · 方向键切换项目",reset:"恢复布局",show:"查看项目",
      inspectorDefault:"选择一个项目，看看里面有什么。",focus:"核心问题",decision:"做过什么",evidence:"可打开的证据",limitations:"适用边界",
      next:"下一个项目",prev:"上一个项目",openSource:"打开项目",provenance:"仅链接公开项目，结果应结合其边界阅读。",
      archiveKicker:"03 / 项目索引",archiveTitle:"不只有这些作品。",archiveSubtitle:"还有更多工具、实验和未解的问题。",
      searchPlaceholder:"搜索项目、语言或主题",noMatches:"没找到匹配项目，可以换个关键词。",count:"当前项目数",
      aboutKicker:"04 / 关于我",aboutTitle:"在学科之间探索。",aboutA:"工程管理让我在意现实约束、工程数量与实际环境；计算机科学则提供了把问题转化为系统的新方法。",
      aboutB:"我喜欢做出能使用的工具、研究系统的失败原因，并保存实验依据——即使结果和最初想的不一样。",
      aboutLabel1:"学校",aboutVal1:"东北林业大学",aboutLabel2:"方向",aboutVal2:"软件系统 · 数据 · 应用研究",
      contactTitle:"有想法、问题，或者有趣的技术话题？",contactCopy:"欢迎来聊聊软件、工程，以及一些不太寻常的技术问题。",
      contactButton:"联系我",sourceButton:"浏览 GitHub",footerNote:"从好奇心出发，认真做出来。",commandTitle:"快速找到项目",commandHint:"输入项目名或技术关键词",commandHelp:"↑ ↓ 选择 · Enter 打开 · Esc 关闭",
      shortcut:"按 ⌘K / Ctrl K 搜索",opening:"在新标签页打开",copied:"邮箱已复制",
      themeLabel:"暖白色，刚刚好。",menuClose:"关闭",tagDemo:"STEAM / 可玩版本",tagTests:"公开测试记录",tagPG:"真实 POSTGRESQL 实验",
      metaDescription:"于越的个人作品集：软件、游戏系统、工程计算与可复现实验。支持交互探索与中英双语。",
      mapProject:"项目",mapDomain:"方向",mapStatus:"带动态连线的交互式 SVG",resetDone:"布局已恢复"
    }
  }
});
