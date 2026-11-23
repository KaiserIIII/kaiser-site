/* Atelier Reliability Lab — native controls around a pure, deterministic model.
   All outputs derive from synthetic fixtures; nothing executes SQL or calls a model. */
(function(){
 "use strict";
 const engine=window.KAISER_LAB_ENGINE;
 const root=document.getElementById("lab-workbench");
 if(!engine||!root)return;
 const $=(s,parent=document)=>parent.querySelector(s);
 const $$=(s,parent=document)=>Array.from(parent.querySelectorAll(s));
 const copy={
  en:{
   navLab:"Lab",labKicker:"02 / A SMALL EXPERIMENT",labTitle:"Don't just read the evidence. Test an idea.",
   labSubtitle:"Two deterministic models of engineering failure modes. Change inputs, run a check and inspect exactly what happened.",
   labBrand:"THE RELIABILITY LAB / 001",labLocal:"LOCAL BROWSER MODEL · NO SERVER",
   labTabPermission:"Migration contract",labTabRetrieval:"Tenant boundary",
   labPermissionTitle:"Can a migration finish while access fails?",
   labPermissionIntro:"Start with role grants. Change the migration mechanism, then check its outcome against an independent contract.",
   labRole:"APPLICATION ROLE",labStrategy:"MIGRATION MECHANISM",
   labNative:"Native ALTER · keep original table",labSwap:"Toy shadow-table swap · replace table",
   labReapply:"Reapply explicit grants after the swap",
   labRetrievalTitle:"Who is allowed to retrieve the evidence?",
   labRetrievalIntro:"Search six invented documents across two invented organizations. Watch what happens when the tenant boundary is disabled.",
   labTenant:"ACTIVE ORGANIZATION",labQuery:"SEARCH QUERY · EDITABLE",
   labScoped:"Enforce tenant scope before ranking",
   labRun:"Run the check",labReset:"Reset",
   labBoundary:"These are deliberately simplified teaching models, not actual PostgreSQL, pg-osc, Chroma or deployed RAG executions. Every document is synthetic.",
   labOutputTitle:"INDEPENDENT VERIFICATION",labObserved:"OBSERVED IN MODEL",
   labInvariants:"INVARIANTS & OBSERVATIONS",labTrace:"REPLAYABLE EXECUTION TRACE",
   labEvidence:"READ THE PUBLIC ENGINEERING EVIDENCE",labCopy:"Copy scenario record",
   labelPass:"CONTRACT PRESERVED",labelFail:"CONTRACT BROKEN",
   permissionPass:"All expected operations are granted to the selected role.",
   permissionFail:"At least one explicit grant is missing from the replacement.",
   retrievalPass:"No other tenant's synthetic documents were returned.",
   retrievalFail:"At least one foreign-tenant document was returned.",
   noHit:"NO MATCH",noHitNote:"No synthetic document matched these words.",
   yes:"PRESENT",no:"MISSING",hit:"MATCH",leak:"FOREIGN TENANT",score:"TOKEN MATCHES",
   traceSetup:"SETUP",traceAction:"ACTION",traceVerify:"CHECK",
   copied:"Scenario JSON copied",copyError:"Clipboard unavailable. Select and copy from your browser.",
   permissionEvidence:"MigrationWitness · real experiment",retrievalEvidence:"Zhixu · verification notes",
   mapKicker:"03 / AN EXPERIMENT",compareKicker:"04 / COMPARATIVE NOTEBOOK",archiveKicker:"05 / THE ARCHIVE",aboutKicker:"06 / A LITTLE ABOUT ME"
  },
  zh:{
   navLab:"实验室",labKicker:"02 / 可以亲自操作的小实验",labTitle:"别只看实验结果，自己动手验证。",
   labSubtitle:"两个可重复的工程故障模型。修改条件、执行检查，观察不同选择如何改变结果。",
   labBrand:"可靠性实验室 / 001",labLocal:"浏览器本地模型 · 无需服务器",
   labTabPermission:"迁移权限契约",labTabRetrieval:"租户检索边界",
   labPermissionTitle:"迁移成功，权限也一定正常吗？",
   labPermissionIntro:"从角色授权出发，修改迁移机制，再用独立权限契约验证结果。",
   labRole:"应用角色",labStrategy:"迁移机制",
   labNative:"原生 ALTER · 保留原表",labSwap:"模拟影子表替换 · 换掉原表",
   labReapply:"替换之后重新授予显式权限",
   labRetrievalTitle:"哪些人有权检索到这份证据？",
   labRetrievalIntro:"在两个虚构组织、六份虚构文档中检索，观察关闭租户隔离后会发生什么。",
   labTenant:"当前组织",labQuery:"检索词 · 可以修改",
   labScoped:"排序之前先检查租户范围",
   labRun:"执行验证",labReset:"重置",
   labBoundary:"这是刻意简化的教学模拟，并非真实 PostgreSQL、pg-osc、Chroma 或部署中的 RAG 系统。所有文档均为虚构数据。",
   labOutputTitle:"独立检查结果",labObserved:"模拟中的观测结果",
   labInvariants:"契约检查与观测",labTrace:"可复核的执行过程",
   labEvidence:"查看真实项目的公开证据",labCopy:"复制本次实验记录",
   labelPass:"契约未被破坏",labelFail:"契约遭到破坏",
   permissionPass:"所选角色具备全部预期操作权限。",
   permissionFail:"替换表缺少至少一项预期显式权限。",
   retrievalPass:"没有返回其他租户的模拟文档。",
   retrievalFail:"返回了至少一份其他租户的模拟文档。",
   noHit:"没有匹配",noHitNote:"这些关键词没有命中任何模拟文档。",
   yes:"已授权",no:"缺失",hit:"匹配",leak:"跨租户",score:"词项命中数",
   traceSetup:"准备",traceAction:"执行",traceVerify:"核查",
   copied:"实验 JSON 已复制",copyError:"暂时无法访问剪贴板，请使用浏览器复制。",
   permissionEvidence:"MigrationWitness · 真实实验记录",retrievalEvidence:"Zhixu · 验证记录",
   mapKicker:"03 / 技术关系",compareKicker:"04 / 项目对照手记",archiveKicker:"05 / 项目索引",aboutKicker:"06 / 关于我"
  }
 };
 const URL_MODELS=new Set(["permission","retrieval"]);
 const links={
  permission:"https://github.com/KaiserIIII/migrationwitness/blob/main/PG_OSC_197_RESULTS.md",
  retrieval:"https://github.com/KaiserIIII/zhixu/blob/main/docs/verification.md"
 };
 let locale=document.documentElement.lang.startsWith("zh")?"zh":"en";
 const urlMode=new URL(location.href).searchParams.get("lab");
 let active=URL_MODELS.has(urlMode)?urlMode:"permission",last=null,runCount=0;
 const txt=k=>copy[locale][k]||copy.en[k]||k;
 const elem=(name,attrs={},text)=>{
  const el=document.createElement(name);
  Object.entries(attrs).forEach(([key,val])=>el.setAttribute(key,String(val)));
  if(text!==undefined)el.textContent=text;
  return el;
 };
 function localize(){
  $$("[data-i18n]",root).forEach(item=>{
   if(copy[locale][item.dataset.i18n])item.textContent=txt(item.dataset.i18n);
  });
  for(const key of ["navLab","labKicker","labTitle","labSubtitle","mapKicker","compareKicker","archiveKicker","aboutKicker"]){
   $$('[data-i18n="'+key+'"]').forEach(el=>{if(copy[locale][key])el.textContent=txt(key);});
  }
  $("#lab-evidence-link").textContent=active==="permission"?txt("permissionEvidence")+" ↗":txt("retrievalEvidence")+" ↗";
 }
 function selectMode(next,updateUrl=true){
  if(!URL_MODELS.has(next))return;
  active=next;
  $$("[data-lab]").forEach(button=>{
   const selected=button.dataset.lab===active;
   button.setAttribute("aria-selected",String(selected));
   button.tabIndex=selected?0:-1;
  });
  for(const mode of URL_MODELS)$("#lab-panel-"+mode).hidden=mode!==active;
  if(updateUrl){
   const nextUrl=new URL(location.href);
   nextUrl.searchParams.set("lab",active);
   nextUrl.hash="lab";
   history.replaceState(history.state,"",nextUrl.pathname+nextUrl.search+nextUrl.hash);
  }
  run();
  localize();
 }
 function permissionInputs(){
  return {role:$("#lab-role").value,strategy:$("#lab-strategy").value,
   reapply:$("#lab-reapply").checked};
 }
 function retrievalInputs(){
  return {tenant:$("#lab-tenant").value,query:$("#lab-query").value,
   scoped:$("#lab-scoped").checked};
 }
 function renderChecks(result){
  const box=$("#lab-checks");
  box.replaceChildren();
  if(result.kind==="permission"){
   result.checks.forEach(check=>{
    const item=elem("div",{class:"lab-check-row"});
    item.append(
     elem("span",{class:"lab-check-name"},check.operation),
     elem("span",{class:"lab-check-status","data-check":check.operation,
      "data-good":String(check.ok)},(check.ok?"✓ ":"× ")+txt(check.ok?"yes":"no"))
    );
    box.append(item);
   });
   $("#lab-check-counter").textContent=
    String(result.checks.filter(x=>x.ok).length).padStart(2,"0")+" / "+
    String(result.checks.length).padStart(2,"0");
  }else{
   result.hits.forEach(hit=>{
    const item=elem("div",{class:"lab-check-row lab-hit-row"});
    const name=elem("span",{class:"lab-check-name"},hit.id+" · "+hit.title);
    name.append(elem("small",{},hit.tenant+" / "+txt("score")+": "+hit.score));
    item.append(name,elem("span",{class:"lab-check-status","data-good":String(!hit.unauthorized)},
      (hit.unauthorized?"× ":"✓ ")+txt(hit.unauthorized?"leak":"hit")));
    box.append(item);
   });
   if(!result.hits.length)box.append(elem("p",{class:"lab-no-matches"},txt("noHitNote")));
   $("#lab-check-counter").textContent=
    String(result.hits.filter(x=>!x.unauthorized).length).padStart(2,"0")+" / "+
    String(result.hits.length).padStart(2,"0");
  }
 }
 function renderTrace(result){
  const list=$("#lab-trace");list.replaceChildren();
  result.trace.forEach((event,index)=>{
   const li=elem("li");
   li.append(elem("span",{class:"lab-trace-number"},String(index+1).padStart(2,"0")));
   const group=elem("span",{class:"lab-trace-content"});
   group.append(elem("small",{},txt("trace"+event.kind[0].toUpperCase()+event.kind.slice(1))),
     elem("span",{},event[locale]));
   li.append(group);list.append(li);
  });
 }
 function renderResult(result){
  last=result;runCount++;
  const success=result.pass,hasHits=result.kind!=="retrieval"||result.hits.length>0;
  const status=$("#lab-verdict");
  status.dataset.status=success?"pass":"fail";
  const label=success?(hasHits?txt("labelPass"):txt("noHit")):txt("labelFail");
  const message=result.kind==="permission"
   ?txt(success?"permissionPass":"permissionFail")
   :!hasHits?txt("noHitNote"):txt(success?"retrievalPass":"retrievalFail");
  $("#lab-verdict-label").textContent=label;
  $("#lab-verdict-desc").textContent=message;
  $(".lab-verdict-icon").textContent=success?"✓":"×";
  $("#lab-scenario-id").textContent="SCENARIO / "+String(runCount).padStart(3,"0");
  $("#lab-evidence-link").href=links[active];
  $("#lab-evidence-link").textContent=txt(active==="permission"?"permissionEvidence":"retrievalEvidence")+" ↗";
  renderChecks(result);renderTrace(result);
  $("#lab-copy-status").textContent="";
 }
 function run(){
  const result=active==="permission"
   ?engine.permission(permissionInputs())
   :engine.retrieval(retrievalInputs());
  renderResult(result);
 }
 function syncReapply(){
  const inactive=$("#lab-strategy").value!=="swap";
  $("#lab-reapply").disabled=inactive;
  if(inactive)$("#lab-reapply").checked=false;
  $("#lab-reapply").closest(".lab-checkbox").classList.toggle("is-disabled",inactive);
 }
 $("#lab-form-permission").addEventListener("submit",event=>{event.preventDefault();syncReapply();run();});
 $("#lab-form-retrieval").addEventListener("submit",event=>{event.preventDefault();run();});
 $("#lab-strategy").addEventListener("change",syncReapply);
 $("#lab-reset-permission").addEventListener("click",()=>{
  $("#lab-role").value="app_writer";$("#lab-strategy").value="native";
  $("#lab-reapply").checked=false;syncReapply();run();
 });
 $("#lab-reset-retrieval").addEventListener("click",()=>{
  $("#lab-tenant").value="alpha";$("#lab-query").value="release version roadmap";
  $("#lab-scoped").checked=true;run();
 });
 $$("[data-lab]").forEach(tab=>{
  tab.addEventListener("click",()=>selectMode(tab.dataset.lab));
  tab.addEventListener("keydown",event=>{
   if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
   event.preventDefault();
   const buttons=$$("[data-lab]");
   const index=buttons.indexOf(tab);
   const next=event.key==="Home"?0:event.key==="End"?buttons.length-1:
    (index+(event.key==="ArrowRight"?1:-1)+buttons.length)%buttons.length;
   buttons[next].focus();selectMode(buttons[next].dataset.lab);
  });
 });
 $("#lab-copy").addEventListener("click",async()=>{
  const record=JSON.stringify({simulation:true,model:"KAISER Atelier V8",
    fixture:"synthetic",timestamp:null,result:last},null,2);
  try{
   await navigator.clipboard.writeText(record);
   $("#lab-copy-status").textContent=txt("copied");
  }catch(_){$("#lab-copy-status").textContent=txt("copyError");}
 });
 addEventListener("kaiser:language",event=>{
  locale=event.detail?.locale==="zh"?"zh":"en";localize();
  // A rerender updates explanatory text; the synthetic model result is unchanged.
  if(last){renderChecks(last);renderTrace(last);
   $("#lab-verdict-label").textContent=last.pass?txt("labelPass"):txt("labelFail");
   $("#lab-verdict-desc").textContent=last.kind==="permission"?
    txt(last.pass?"permissionPass":"permissionFail"):
    txt(last.pass?"retrievalPass":"retrievalFail");
  }
 });
 addEventListener("popstate",()=>{
  const mode=new URL(location.href).searchParams.get("lab");
  if(URL_MODELS.has(mode)&&mode!==active)selectMode(mode,false);
 });
 syncReapply();selectMode(active,false);
 window.KAISER_LAB={run,selectMode};
})();
