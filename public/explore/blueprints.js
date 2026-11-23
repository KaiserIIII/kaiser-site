/* Carefully scoped engineering-story diagrams, derived from linked public project evidence.
   The nodes explain system concepts; they are not captured runtime traces or unearned metrics. */
window.KAISER_BLUEPRINTS = Object.freeze({
  cardcraft: {
    color:"#b77559",
    en:{
      eyebrow:"GAME SYSTEMS / PRODUCT DELIVERY",
      lead:"A playable game is only one layer. Multiplayer, content and persistence have to survive real users.",
      stages:[
        {title:"Player action",sub:"Intent & input",detail:"Start with actions that are meaningful to the local player. The design needs to keep UI state and authoritative game-state decisions separate.",question:"What is presentation, and what is the game rule?"},
        {title:"Session lifecycle",sub:"Steam / P2P",detail:"Lobby membership, join/leave transitions and peer messages form an explicit lifecycle. Network events should not silently bypass local state invariants.",question:"What happens when a peer reconnects or leaves?"},
        {title:"Gameplay state",sub:"State & validation",detail:"Incoming actions are validated against turn and game state before changing the shared simulation. Consistency matters more than optimistic visuals.",question:"Can a stale message change the game?"},
        {title:"Save & content",sub:"Persistence / UGC",detail:"Saved progress and Workshop items bring schema evolution, packaging, content checks and version compatibility into the product.",question:"What survives an update?"},
        {title:"Playable release",sub:"Shipping",detail:"The public Steam demo and engineering cases are inspectable outputs. They show delivery without pretending private game source is public.",question:"Can somebody actually try it?"}
      ],
      caption:"Conceptual path through the public engineering cases. Not a wire-level session trace.",
      evidenceTitle:"OPEN THE REAL EVIDENCE"
    },
    zh:{
      eyebrow:"游戏系统 / 产品交付",
      lead:"游戏能玩只是其中一层，联机、用户内容和存档还得经受真实使用。",
      stages:[
        {title:"玩家操作",sub:"输入与意图",detail:"从玩家行为出发，将界面状态与游戏规则决策区分开，避免展示逻辑直接修改核心状态。",question:"哪些是界面表现，哪些是游戏规则？"},
        {title:"房间生命周期",sub:"Steam / P2P",detail:"加入、退出、重连和消息传递构成明确的状态生命周期，网络事件不能悄悄绕过游戏状态约束。",question:"玩家断线或退出时会怎样？"},
        {title:"游戏状态",sub:"状态与校验",detail:"接收到的动作需经过回合和状态校验，再更新共享模拟；一致性比表面的即时反馈更重要。",question:"旧消息会破坏当前游戏状态吗？"},
        {title:"存档与内容",sub:"持久化 / 模组",detail:"存档、创意工坊内容、数据版本和发布资源共同构成维护问题，需考虑升级后的兼容性。",question:"更新后哪些东西能保留下来？"},
        {title:"可玩版本",sub:"真实交付",detail:"公开 Steam Demo 和工程案例是可以检查的成果，但这并不表示游戏完整源码已经公开。",question:"其他人真的能够体验它吗？"}
      ],
      caption:"根据公开工程案例整理的概念流程图，不是实时抓取的联机调用链。",
      evidenceTitle:"查看真实证据"
    }
  },
  zhixu:{
    color:"#738b81",
    en:{
      eyebrow:"KNOWLEDGE INFRASTRUCTURE / RAG",
      lead:"The difficult part of a knowledge workspace is not chat UI. It is data boundaries, retrieval and trust.",
      stages:[
        {title:"Document",sub:"Ingestion",detail:"Documents enter a versioned knowledge workflow. Parsing, ingestion state and metadata shape what can later be retrieved.",question:"Where did this content come from?"},
        {title:"Tenant scope",sub:"Isolation",detail:"Retrieval must respect tenant and authorization boundaries before any answer is assembled.",question:"Who is allowed to retrieve this?"},
        {title:"Hybrid search",sub:"BM25 / Vector",detail:"Lexical and vector retrieval serve different evidence needs. The system preserves document references across retrieval stages.",question:"What makes this evidence relevant?"},
        {title:"Answer",sub:"Provenance",detail:"Generated responses need source references that users can inspect rather than an unsupported claim of correctness.",question:"Can I see the underlying document?"},
        {title:"Verification",sub:"Tests & limits",detail:"Dated checks report 120 backend and 33 frontend tests. That is evidence of a test run, not a deployment certification.",question:"What was actually tested?"}
      ],
      caption:"Architecture sketch grounded in the public source and verification notes.",
      evidenceTitle:"SOURCE & VERIFICATION"
    },
    zh:{
      eyebrow:"知识基础设施 / RAG",
      lead:"知识系统难点不在聊天界面，而是数据边界、检索与可信依据。",
      stages:[
        {title:"文档",sub:"导入与解析",detail:"文档进入带版本信息的知识工作流；解析状态、导入过程和元数据决定后续能否有效检索。",question:"这段内容从哪里来？"},
        {title:"租户边界",sub:"权限隔离",detail:"每次检索都应遵循租户和授权边界，再进入答案生成阶段。",question:"谁被允许访问这份材料？"},
        {title:"混合检索",sub:"BM25 / 向量",detail:"词法和语义检索适用于不同的证据需求，系统需要保留来源引用关系。",question:"为什么这段资料相关？"},
        {title:"回答",sub:"来源溯源",detail:"生成的回答应附带可检查的来源，而不只是宣称自己正确。",question:"能看到真正的原始文档吗？"},
        {title:"验证",sub:"测试与边界",detail:"记录了特定日期的后端 120 项、前端 33 项测试；这不是部署或产品认证。",question:"具体测试到了哪一步？"}
      ],
      caption:"根据公开源码和验证记录整理的架构示意图。",
      evidenceTitle:"源码与验证记录"
    }
  },
  wifiscope:{
    color:"#708aa2",
    en:{
      eyebrow:"NETWORK FORENSICS / LOCAL-FIRST",
      lead:"Turn observations from a network into bounded, inspectable and privacy-aware evidence.",
      stages:[
        {title:"Target scope",sub:"Authorized",detail:"Specify the assessment boundary before probing. Network activity is kept scoped and rate-conscious.",question:"Is this network in the permitted scope?"},
        {title:"Protocol checks",sub:"TCP / TLS / HTTP",detail:"Gather bounded protocol observations and record what was checked rather than equating missing data with safety.",question:"What was actually measured?"},
        {title:"Evidence",sub:"PCAP / Zeek",detail:"Interpret capture formats and flow records to connect observations with protocol context and provenance.",question:"Can this observation be traced?"},
        {title:"Case storage",sub:"SQLite / Privacy",detail:"Local case evidence supports repeatability and privacy-aware reporting, including pseudonymization choices.",question:"What information should be retained?"},
        {title:"Release",sub:"Windows",detail:"A portable Windows release and cross-platform tests make the work usable, while physical-network variability remains.",question:"Can another person run it?"}
      ],
      caption:"Analytical workflow, not a live scan, and not a claim of physical-network certification.",
      evidenceTitle:"CODE & RELEASE"
    },
    zh:{
      eyebrow:"网络调查 / 本地优先",
      lead:"让网络观察变成范围明确、可追溯且尊重隐私的技术证据。",
      stages:[
        {title:"目标边界",sub:"授权范围",detail:"探测前明确授权范围，并控制检查速率，避免无边界的网络活动。",question:"这个网络在允许检查的范围内吗？"},
        {title:"协议检查",sub:"TCP / TLS / HTTP",detail:"记录有边界的协议观测；缺少信息不应自动等同于安全。",question:"实际测量了什么？"},
        {title:"证据",sub:"PCAP / Zeek",detail:"将抓包格式、流记录和协议上下文联系起来，保留观察来源。",question:"这项发现能追溯吗？"},
        {title:"案件存储",sub:"SQLite / 隐私",detail:"在本地保存可复核证据，关注匿名化和个人信息保留范围。",question:"哪些信息应该被保存？"},
        {title:"发布版本",sub:"Windows",detail:"Windows 便携版和跨平台测试让工具可被使用，但真实网络环境仍需额外验证。",question:"其他人能实际运行它吗？"}
      ],
      caption:"分析工作流示意，并非正在运行的网络扫描，也不是现场认证。",
      evidenceTitle:"代码与发布版本"
    }
  },
  migrationwitness:{
    color:"#9886a1",
    en:{
      eyebrow:"POSTGRESQL / CONTRACT TESTING",
      lead:"A successful migration process is not proof that an application still works.",
      stages:[
        {title:"Baseline",sub:"Privileges",detail:"Record the privileges required by application roles before performing the change. Define the invariant independently.",question:"What must remain true after migration?"},
        {title:"Migration",sub:"pg-osc",detail:"Execute the migration in a disposable PostgreSQL environment, keeping tool success distinct from application correctness.",question:"Did the process exit cleanly?"},
        {title:"Contract check",sub:"Independent SQL",detail:"Query the actual SELECT, INSERT and UPDATE privileges after the operation. Compare against the baseline contract.",question:"Did the expected grants survive?"},
        {title:"Control",sub:"Native ALTER",detail:"Run native ALTER controls against matching PostgreSQL versions to isolate behavior from the database itself.",question:"Is this specific to the migration method?"},
        {title:"Finding",sub:"Recorded result",detail:"The public record documents a privilege regression on PostgreSQL 16/17 for the studied pg-osc version and conditions.",question:"What is supported — and what is not?"}
      ],
      caption:"Grounded in dated cross-version experiments. Do not generalize to all PostgreSQL migrations.",
      evidenceTitle:"EXPERIMENT RECORD"
    },
    zh:{
      eyebrow:"POSTGRESQL / 契约测试",
      lead:"迁移进程显示成功，不代表应用仍然具有正常运行的权限。",
      stages:[
        {title:"基线",sub:"权限契约",detail:"操作前记录应用角色需要的授权，并独立定义迁移后必须保持的不变量。",question:"迁移后哪些条件必须仍然成立？"},
        {title:"迁移",sub:"pg-osc",detail:"在隔离的 PostgreSQL 实例里执行迁移，将工具退出状态与应用正确性分开判断。",question:"进程是否正常结束？"},
        {title:"契约验证",sub:"独立 SQL",detail:"重新检查 SELECT、INSERT、UPDATE 权限，并与迁移前定义的契约比较。",question:"预期授权是否保留？"},
        {title:"对照实验",sub:"原生 ALTER",detail:"在相同 PostgreSQL 版本上使用原生 ALTER 作为对照，识别问题是否与迁移方法有关。",question:"这是工具特定行为吗？"},
        {title:"实验发现",sub:"记录结果",detail:"公开记录支持研究版本的 pg-osc 在 PostgreSQL 16/17 特定条件下出现权限回归。",question:"可以得出什么结论，不能得出什么？"}
      ],
      caption:"基于有日期的跨版本实验，不应推广为所有 PostgreSQL 迁移的共同问题。",
      evidenceTitle:"实验记录"
    }
  },
  cost:{
    color:"#a68c64",
    en:{
      eyebrow:"CONSTRUCTION / COMPUTATIONAL MODELLING",
      lead:"Move from engineering quantities to an explainable financial model.",
      stages:[
        {title:"Quantities",sub:"Measurement",detail:"Define and enter measured work items with dimensional units and scope.",question:"Where did the quantity originate?"},
        {title:"Rates",sub:"Unit prices",detail:"Separate rate assumptions from measurement so a price change does not alter the measured basis.",question:"Which assumptions shaped this estimate?"},
        {title:"Calculation",sub:"Decimal",detail:"Use controlled precision and explicit rounding rules for cost computation.",question:"Are the numbers reproducible?"},
        {title:"Analysis",sub:"Appraisal",detail:"Combine rate and quantity data into bills and development appraisal views.",question:"What changes the project economics?"},
        {title:"Output",sub:"Traceable reports",detail:"Export interpretable results with methods and assumptions visible to a reader.",question:"Can someone audit this result?"}
      ],
      caption:"A domain-model illustration, not a claim of universal quantity-surveying standards compliance.",
      evidenceTitle:"MODEL & METHODOLOGY"
    },
    zh:{
      eyebrow:"工程造价 / 计算建模",
      lead:"从工程量走向可以解释、可以审查的成本计算模型。",
      stages:[
        {title:"工程量",sub:"计量",detail:"定义各项工作内容、计量单位和范围，保留工程量数据来源。",question:"工程量从哪里来？"},
        {title:"费率",sub:"单价",detail:"将单价假设与计量值分离，避免价格变化影响工程量基础。",question:"哪些假设影响了估算？"},
        {title:"计算",sub:"Decimal",detail:"使用明确的数值精度和舍入规则，让计算能够重复得到同样结果。",question:"计算结果能否被复现？"},
        {title:"分析",sub:"开发评价",detail:"将工程量与价格组织为清单、成本和开发可行性分析。",question:"哪些因素改变项目经济性？"},
        {title:"输出",sub:"可追溯报告",detail:"导出包含方法和假设的易读结果，便于他人审查。",question:"别人能复核这份结果吗？"}
      ],
      caption:"领域模型示意，不代表符合所有地区的工程计量规范。",
      evidenceTitle:"模型与方法"
    }
  },
  reproshift:{
    color:"#7b8695",
    en:{
      eyebrow:"EXPERIMENTS / DEPENDENCY REPRODUCTION",
      lead:"The environment is part of the experiment — but never the entirety of the finding.",
      stages:[
        {title:"Historical target",sub:"Version matrix",detail:"Pick a historical software context with a documented dependency environment.",question:"Which version combination is being studied?"},
        {title:"Reconstruction",sub:"Dependencies",detail:"Rebuild environments under controlled version assumptions, recording what can and cannot be installed.",question:"Can the environment be reconstructed?"},
        {title:"Execution",sub:"Protocol",detail:"Run repeatable checks with explicit procedures and comparable observations.",question:"Are the runs comparable?"},
        {title:"Evidence ledger",sub:"Results",detail:"Store versioned outcomes and explain failures rather than erasing inconvenient runs.",question:"Is there enough evidence to reproduce this?"},
        {title:"Interpretation",sub:"Scope & limits",detail:"Separate environment reproducibility from any stronger claim about scientific result reproducibility.",question:"What does this experiment actually establish?"}
      ],
      caption:"Methodological map of the public research artifact, not a scientific publication claim.",
      evidenceTitle:"SOURCE & EXPERIMENTS"
    },
    zh:{
      eyebrow:"实验 / 依赖环境复现",
      lead:"软件环境是实验的一部分，但环境重建不等于科研结论被复现。",
      stages:[
        {title:"历史目标",sub:"版本矩阵",detail:"选定有具体版本记录的历史软件上下文和依赖条件。",question:"研究的是哪组版本？"},
        {title:"环境重建",sub:"依赖",detail:"按明确的版本假设重新搭建环境，并记录无法安装的情况。",question:"环境能被重建吗？"},
        {title:"执行实验",sub:"协议",detail:"依据可重复的实验步骤运行检查，保存可比较的观测结果。",question:"不同实验结果能直接比较吗？"},
        {title:"证据账本",sub:"结果",detail:"保留版本化结果并解释失败，不删除不符合预期的运行记录。",question:"证据足以支撑他人复现吗？"},
        {title:"结论边界",sub:"解释",detail:"明确区分环境可复现与科学结论可复现两种不同主张。",question:"实验实际证明了什么？"}
      ],
      caption:"对公开研究工件的方法示意，并非已发表论文的声明。",
      evidenceTitle:"源码与实验"
    }
  }
});
