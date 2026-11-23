/* Guided Field Notes: a story-led reading mode, not a benchmark or fabricated case study.
   Curated paths use only the publicly documented portfolio records and real source links.
   No analytics, remote runtime, profile scoring or private repositories. */
(function(){
"use strict";
const data=window.KAISER_DATA,dialog=document.getElementById("journey-dialog");
if(!data||!dialog)return;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const en=(en,zh)=>({en,zh});
const paths=[
 {id:"ship",count:"01",title:en("Make it real","把东西做出来"),
  subtitle:en("From an idea to something people can use.","从一个念头，到别人真正能够使用的作品。"),
  lead:en("Three very different products. The common thread is learning what it takes to finish.",
          "三种很不一样的产品，共同之处是：真正做完，意味着要解决很多看不见的问题。"),
  accent:"#b77559",steps:[
   {n:"01",title:en("A game must actually ship","游戏需要真正交付"),tag:en("PRODUCT / RELEASE","产品 / 发布"),
    body:en("CardCraft is more than a card-game prototype: a playable Steam build and public engineering cases let others inspect the result. Multiplayer and save compatibility are part of the work.",
            "CardCraft 不只是一份游戏原型：可体验的 Steam 版本和公开工程案例，让成果能够被别人检查；联机和存档兼容同样是产品的一部分。"),
    project:"cardcraft",action:"case"},
   {n:"02",title:en("A knowledge system needs boundaries","知识系统还需要边界"),tag:en("PLATFORM / EVIDENCE","平台 / 证据"),
    body:en("Zhixu combines retrieval, citations, organizations and workflows. Its dated test record is evidence of a bounded verification run, not a claim of production certification.",
            "知序将检索、引用、组织权限和工作流放在同一个系统中；公开测试记录证明的是特定范围的验证，而非生产环境认证。"),
    project:"zhixu",action:"case"},
   {n:"03",title:en("Numbers should survive scrutiny","数字应该经得起复核"),tag:en("BUILT ENVIRONMENT / MODEL","建筑环境 / 模型"),
    body:en("Construction Cost Analyzer turns quantities, unit rates and assumptions into traceable calculations. It connects my Engineering Management background with software.",
            "Construction Cost Analyzer 把工程量、单价和假设组织成可以追溯的计算，也让我把工程管理与编程知识结合起来。"),
    project:"cost",action:"case"}
  ]},
 {id:"verify",count:"02",title:en("Follow the failure","追踪故障"),
  subtitle:en("Why a green check is not always enough.","为什么显示成功，也未必真的没有问题。"),
  lead:en("I am interested in what happens after a tool says 'success'. Here is the difference between recorded experiments and a browser-side teaching model.",
          "我尤其关心工具显示“成功”之后，系统是否真的正常；也会明确区分真实实验与浏览器中的教学模拟。"),
  accent:"#708aa2",steps:[
   {n:"01",title:en("A migration finished. Access broke.","迁移完成，访问却失效了"),tag:en("REAL DATABASE EXPERIMENT","真实数据库实验"),
    body:en("MigrationWitness documents six pg-osc permission regressions across PostgreSQL 16/17 with six native ALTER controls under recorded conditions. The finding is narrow — and reproducible.",
            "MigrationWitness 记录了 PostgreSQL 16/17 上六次 pg-osc 权限回归，以及六次原生 ALTER 对照。结论有明确版本和实验条件，而不是泛化推断。"),
    project:"migrationwitness",action:"case"},
   {n:"02",title:en("Try breaking the contract","自己试着破坏契约"),tag:en("DETERMINISTIC BROWSER MODEL","确定性浏览器模型"),
    body:en("The Reliability Lab runs a tiny JavaScript model: replace a table, lose toy grants, reapply them, and re-check the expected permissions. This is not a live PostgreSQL run.",
            "可靠性实验室运行一个简化的 JavaScript 模型：模拟替换表、权限丢失、重新授权及独立核查。这不是实际 PostgreSQL 运行。"),
    project:"migrationwitness",action:"lab",mode:"permission"},
   {n:"03",title:en("Test what users cannot see","检查用户看不到的边界"),tag:en("TENANCY / AUTHORIZATION","租户 / 授权"),
    body:en("In knowledge retrieval, relevant documents are not automatically authorized documents. Turn off the toy tenant boundary and see why the order of filtering matters.",
            "知识检索中，相关文档不一定是有权访问的文档。试着关闭模拟租户过滤，就能理解为什么先检查权限很重要。"),
    project:"zhixu",action:"lab",mode:"retrieval"},
   {n:"04",title:en("Keep the limits with the result","让局限与结果一同保留"),tag:en("METHOD / REPRODUCIBILITY","方法 / 可复现"),
    body:en("ReproShift studies historical environments and dependencies without equating a rebuilt environment with a reproduced scientific claim.",
            "ReproShift 研究历史依赖和实验环境，同时明确区分“成功重建软件环境”和“已经复现科学结论”。"),
    project:"reproshift",action:"case"}
  ]},
 {id:"bridge",count:"03",title:en("Connect the disciplines","连接不同学科"),
  subtitle:en("One curiosity, several kinds of engineering.","同一种好奇心，解决不同领域的问题。"),
  lead:en("Games, networks, databases and construction don't share a single toolkit. They do share a concern for evidence, systems and practical constraints.",
          "游戏、网络、数据库和工程造价没有统一的工具箱，但都需要面对证据、系统边界与现实约束。"),
  accent:"#738b81",steps:[
   {n:"01",title:en("Start with the physical world","从现实工程开始"),tag:en("QUANTITIES / COSTS","工程量 / 成本"),
    body:en("Construction estimates bring units, assumptions and cost rounding into view. Small modelling choices can change how a decision is justified.",
            "工程估算需要明确单位、假设与舍入规则；小小的模型选择，也会影响最后如何解释一个决策。"),
    project:"cost",action:"case"},
   {n:"02",title:en("Observe what a network actually says","看网络实际上提供了什么证据"),tag:en("PROTOCOLS / INVESTIGATION","协议 / 调查"),
    body:en("WiFiScope approaches network checks as bounded, local-first observations with explicit scope and evidence retention — not a universal security verdict.",
            "WiFiScope 把网络检查视作有边界的本地观察，重视来源和隐私，而不是给所有网络下一个笼统的安全结论。"),
    project:"wifiscope",action:"case"},
   {n:"03",title:en("Put two methods side by side","把两种工程方法放在一起"),tag:en("INTERACTIVE COMPARISON","交互式对照"),
    body:en("Compare a construction-cost model and network investigation software. Their components differ; the value lies in making assumptions and evidence inspectable.",
            "对照工程成本模型与网络调查软件：实现方式完全不同，但都需要让假设、数据与验证过程能够被别人检查。"),
    project:"cost",action:"compare",pair:["cost","wifiscope"]}
  ]}
];
const byId=new Map(paths.map(p=>[p.id,p])),project=id=>data.projects.find(x=>x.id===id);
const words={
 en:{launch:"Take a guided look",start:"Explore this path",chooser:"CHOOSE A THREAD",chooseIntro:"Not sure where to begin? Follow one of three short stories through actual work and evidence.",
  close:"Close",all:"All paths",next:"Next note",previous:"Previous",finish:"Back to paths",step:"FIELD NOTE",evidence:"OPEN PUBLIC EVIDENCE",
  inspect:"Explore the project",experiment:"Run the teaching model",compare:"Compare these projects",share:"Copy path link",copied:"Link copied",copyFailed:"Copy unavailable",
  disclaimer:"A curated reading route, not a new experiment or a claim about private code.",path:"READING PATH"},
 zh:{launch:"跟着故事逛一圈",start:"开始这条路线",chooser:"选择一条探索路线",chooseIntro:"不知道先看哪个作品？从三条简短的故事出发，顺着真实项目和公开证据慢慢探索。",
  close:"关闭",all:"所有路线",next:"下一页",previous:"上一页",finish:"返回路线",step:"工程手记",evidence:"查看公开材料",
  inspect:"探索项目",experiment:"运行教学模拟",compare:"对比这两个项目",share:"复制路线链接",copied:"链接已复制",copyFailed:"暂时无法复制",
  disclaimer:"这是根据公开项目整理的阅读路线，不代表新实验结果，也不涉及私有源码。",path:"探索路线"}
};
let locale=document.documentElement.lang.startsWith("zh")?"zh":"en",active=null,index=0,opener=null;
const s=k=>words[locale][k]||words.en[k]||k;
const local=object=>object?.[locale]||object?.en||"";
const element=(tag,attributes={},value)=>{
 const node=document.createElement(tag);
 Object.entries(attributes).forEach(([name,val])=>node.setAttribute(name,String(val)));
 if(value!==undefined)node.textContent=value;
 return node;
};
const state=()=>{
 const u=new URL(location.href);
 return {trail:u.searchParams.get("trail"),step:u.searchParams.get("note")};
};
function setUrl(trail,note){
 const u=new URL(location.href);
 if(trail){u.searchParams.set("trail",trail);if(note!==null)u.searchParams.set("note",String(note+1));else u.searchParams.delete("note");}
 else{u.searchParams.delete("trail");u.searchParams.delete("note");}
 history.replaceState(history.state,"",u.pathname+u.search+u.hash);
}
function open(trail=null,note=0,update=true){
 opener=opener&&opener.isConnected?opener:document.activeElement;
 active=byId.has(trail)?trail:null;
 index=active?Math.min(Math.max(Number(note)||0,0),byId.get(active).steps.length-1):0;
 render();
 if(!dialog.open)dialog.showModal();
 if(update)setUrl(active,active?index:null);
 $("#journey-close").focus();
}
function close(update=true){
 if(dialog.open)dialog.close();
 if(update)setUrl(null,null);
 if(opener&&opener.isConnected)opener.focus();
}
function choose(trail){
 if(!byId.has(trail))return;
 active=trail;index=0;render();setUrl(active,index);
 $("#journey-prev").focus();
}
function setStep(next){
 const count=byId.get(active).steps.length;
 index=Math.min(Math.max(next,0),count-1);
 renderStep();setUrl(active,index);
}
function renderChooser(){
 const parent=$("#journey-choices");parent.replaceChildren();
 paths.forEach(path=>{
  const btn=element("button",{type:"button",class:"journey-choice","data-journey-choice":path.id});
  btn.style.setProperty("--choice-accent",path.accent);
  btn.append(
   element("span",{class:"journey-choice-number"},"NOTEBOOK / "+path.count),
   element("strong",{},local(path.title)),
   element("span",{class:"journey-choice-sub"},local(path.subtitle)),
   element("span",{class:"journey-choice-foot"},String(path.steps.length).padStart(2,"0")+" NOTES　↗")
  );
  btn.addEventListener("click",()=>choose(path.id));parent.append(btn);
 });
}
function renderStep(){
 const path=byId.get(active),step=path.steps[index],p=project(step.project);
 dialog.style.setProperty("--journey-accent",path.accent);
 $("#journey-path-kicker").textContent=s("path")+" / "+path.count+" · "+local(path.title);
 $("#journey-step-counter").textContent=String(index+1).padStart(2,"0")+" / "+String(path.steps.length).padStart(2,"0");
 $("#journey-title").textContent=local(step.title);
 $("#journey-body").textContent=local(step.body);
 $("#journey-category").textContent=local(step.tag);
 $("#journey-project").textContent=p?.name||"";
 $("#journey-context").textContent=local(path.lead);
 $("#journey-evidence-label").textContent=s("evidence");
 $("#journey-fine-print").textContent=s("disclaimer");
 const links=$("#journey-evidence-links");links.replaceChildren();
 const evidence=p?.links||[];
 evidence.slice(0,2).forEach(link=>links.append(
   element("a",{href:link.url,rel:"noopener noreferrer",target:"_blank"},link.title+" ↗")
 ));
 const action=$("#journey-action");
 action.textContent=(step.action==="lab"?s("experiment"):step.action==="compare"?s("compare"):s("inspect"))+" ↗";
 action.dataset.action=step.action;
 $("#journey-prev").disabled=index===0;
 $("#journey-next").textContent=index===path.steps.length-1?s("finish")+" ↗":s("next")+" →";
 $("#journey-share").textContent=s("share")+" ↗";
 $("#journey-share-status").textContent="";
 const rail=$("#journey-rail");rail.replaceChildren();
 path.steps.forEach((item,i)=>{
  const button=element("button",{type:"button",class:"journey-rail-stop",
   "aria-pressed":String(i===index),
   "aria-label":(i+1)+" / "+local(item.title)},String(i+1).padStart(2,"0"));
  button.style.setProperty("--journey-accent",path.accent);
  button.addEventListener("click",()=>setStep(i));
  rail.append(button);
 });
 $("#journey-reading-progress").style.width=((index+1)/path.steps.length*100)+"%";
 const motif=$("#journey-motif");
 motif.replaceChildren();
 for(let i=0;i<path.steps.length;i++){
  const span=element("span",{class:"journey-motif-bar","data-reached":String(i<=index)});
  span.style.height=(24+((i+2)%3)*27)+"%";
  motif.append(span);
 }
}
function render(){
 locale=document.documentElement.lang.startsWith("zh")?"zh":"en";
 $("#journey-chooser-label").textContent=s("chooser");
 $("#journey-chooser-lead").textContent=s("chooseIntro");
 $("#journey-close").textContent=s("close")+" ×";
 $("#journey-all").textContent="← "+s("all");
 $("#journey-prev").textContent="← "+s("previous");
 $("#journey-chooser").hidden=Boolean(active);
 $("#journey-reader").hidden=!active;
 renderChooser();
 if(active)renderStep();
}
function execute(){
 const step=byId.get(active).steps[index];
 const kind=step.action,id=step.project;
 close();
 if(kind==="case"&&window.KAISER_CASEBOOK?.open){
  window.KAISER_CASEBOOK.open(id,{opener:$("#journey-launch")});
 }else if(kind==="lab"){
  window.KAISER_LAB?.selectMode(step.mode);
  document.getElementById("lab")?.scrollIntoView({behavior:"auto",block:"start"});
 }else if(kind==="compare"){
  window.KAISER_COMPARE?.setPair(step.pair[0],step.pair[1],"pushState");
  document.getElementById("compare")?.scrollIntoView({behavior:"auto",block:"start"});
 }
}
$("#journey-launch").addEventListener("click",()=>open());
$("#journey-close").addEventListener("click",()=>close());
$("#journey-all").addEventListener("click",()=>open());
$("#journey-prev").addEventListener("click",()=>setStep(index-1));
$("#journey-next").addEventListener("click",()=>{
 if(index===byId.get(active).steps.length-1)open();
 else setStep(index+1);
});
$("#journey-action").addEventListener("click",execute);
$("#journey-share").addEventListener("click",async()=>{
 const url=new URL(location.href);
 url.searchParams.set("trail",active);url.searchParams.set("note",String(index+1));
 try{await navigator.clipboard.writeText(url.href);$("#journey-share-status").textContent=s("copied");}
 catch(_){$("#journey-share-status").textContent=s("copyFailed");}
});
dialog.addEventListener("cancel",event=>{event.preventDefault();close();});
dialog.addEventListener("click",event=>{if(event.target===dialog)close();});
dialog.addEventListener("keydown",event=>{
 if(!active||event.altKey||event.metaKey||event.ctrlKey)return;
 if(event.key==="ArrowRight"){event.preventDefault();setStep(index+1);}
 if(event.key==="ArrowLeft"){event.preventDefault();setStep(index-1);}
});
addEventListener("kaiser:language",()=>{
 locale=document.documentElement.lang.startsWith("zh")?"zh":"en";
 render();
});
addEventListener("popstate",()=>{
 const requested=state();
 if(byId.has(requested.trail))open(requested.trail,Number(requested.step||1)-1,false);
 else if(dialog.open)close(false);
});
const initial=state();
if(byId.has(initial.trail))open(initial.trail,Number(initial.step||1)-1,false);
window.KAISER_JOURNEY={open};
})();