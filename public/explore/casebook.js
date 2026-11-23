/* Source-linked interactive system blueprints. No external runtime or private code. */
(function(){
"use strict";
const data=window.KAISER_DATA,blueprints=window.KAISER_BLUEPRINTS,dialog=document.getElementById("casebook-dialog");
if(!data||!blueprints||!dialog)return;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const ns="http://www.w3.org/2000/svg",valid=new Set(data.projects.map(p=>p.id));
const words={
en:{label:"SYSTEM BLUEPRINT / INTERACTIVE CASE",close:"Close",share:"Copy a link",copied:"Link copied",failed:"Copy unavailable",stages:"EXPLORE THE PROCESS",question:"THE QUESTION",decision:"ENGINEERING DECISION",overview:"A CLOSER LOOK / PUBLIC WORK",lead:"A concise source-linked engineering overview.",caption:"Editorial overview of public work, not a captured runtime trace.",evidence:"OPEN THE EVIDENCE",stepA:"The problem",stepB:"Technical focus",stepC:"Inspectable output",qA:"Why does this exist?",qB:"What matters in the implementation?",qC:"What can be verified?"},
zh:{label:"系统剖面 / 交互工程案例",close:"关闭",share:"复制链接",copied:"链接已复制",failed:"无法复制",stages:"逐步探索系统流程",question:"值得回答的问题",decision:"工程决策",overview:"深入一点 / 公开项目",lead:"根据公开资料整理的工程概览。",caption:"公开材料的概念整理，并非实时运行调用链。",evidence:"查看可核验的成果",stepA:"要解决的问题",stepB:"技术重点",stepC:"公开成果",qA:"为什么做这个？",qB:"实现时最关键的是什么？",qC:"哪些成果可以检查？"}
};
let active=null,step=0,locale=document.documentElement.lang.startsWith("zh")?"zh":"en",selected="zhixu",opener=null;
const txt=k=>words[locale][k]||words.en[k],project=id=>data.projects.find(p=>p.id===id),language=p=>p[locale]||p.en;
function create(tag,attrs={},content){
const el=document.createElement(tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));
if(content!==undefined)el.textContent=content;return el;
}
function svg(tag,attrs={},content){
const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));
if(content!==undefined)el.textContent=content;return el;
}
function blueprint(id){
if(blueprints[id])return blueprints[id][locale]||blueprints[id].en;
const p=project(id),a=language(p);
return {eyebrow:txt("overview"),lead:txt("lead"),caption:txt("caption"),evidenceTitle:txt("evidence"),stages:[
{title:txt("stepA"),sub:a.tag,detail:a.short,question:txt("qA")},
{title:txt("stepB"),sub:p.tech.slice(0,2).join(" / "),detail:a.focus,question:txt("qB")},
{title:txt("stepC"),sub:"SOURCE",detail:a.proof,question:txt("qC")}
]};
}
const accent=()=>blueprints[active]?.color||"#b77559";
function updateCurrent(){
const model=blueprint(active),item=model.stages[step];
$("#casebook-step-count").textContent=String(step+1).padStart(2,"0")+" / "+String(model.stages.length).padStart(2,"0");
$("#casebook-question").textContent=item.question;
$("#casebook-stage-name").textContent=item.title;
$("#casebook-detail").textContent=item.detail;
$$("[data-blueprint-step]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.blueprintStep)===step)));
$$(".casebook-svg-node").forEach(g=>{
 const current=Number(g.dataset.stageIndex)===step;
 const circles=g.querySelectorAll("circle");
 circles[0].setAttribute("fill-opacity",current?".15":".04");
 circles[1].setAttribute("stroke",current?accent():"#cab9aa");
 circles[1].setAttribute("stroke-width",current?"3":"1.5");
 g.setAttribute("aria-pressed",String(current));
});
$$(".casebook-connection").forEach(l=>{
 const i=Number(l.dataset.connection),near=(i===step||i===step-1);
 l.setAttribute("stroke-opacity",near?".85":".2");
 l.classList.toggle("is-current",near&&!matchMedia("(prefers-reduced-motion: reduce)").matches);
});
}
function choose(index){
 const n=blueprint(active).stages.length;
 step=(index+n)%n;updateCurrent();
}
function draw(){
 const lines=$("#casebook-lines"),nodes=$("#casebook-nodes"),flow=blueprint(active);
 lines.replaceChildren();nodes.replaceChildren();
 const n=flow.stages.length,gap=836/Math.max(1,n-1);
 const points=flow.stages.map((_,i)=>({x:112+i*gap,y:130+(i%2?-11:11)}));
 for(let i=0;i<n-1;i++){
 const a=points[i],b=points[i+1],mid=(a.x+b.x)/2;
 lines.append(svg("path",{class:"casebook-connection","data-connection":i,d:"M"+(a.x+48)+" "+a.y+" C"+mid+" "+a.y+", "+mid+" "+b.y+", "+(b.x-48)+" "+b.y,fill:"none",stroke:accent(),"stroke-width":2.3}));
 }
 points.forEach((p,i)=>{
 const stage=flow.stages[i],g=svg("g",{class:"casebook-svg-node","data-stage-index":i,role:"button",tabindex:0,"aria-label":(i+1)+": "+stage.title,"aria-pressed":String(i===step),transform:"translate("+p.x+" "+p.y+")"});
 g.append(svg("circle",{r:56,fill:accent(),"fill-opacity":".04"}),svg("circle",{r:37,fill:"#fffdfa",stroke:"#cab9aa","stroke-width":"1.5"}),svg("text",{"text-anchor":"middle",y:8,"font-family":"Georgia,serif","font-size":23,fill:accent()},String(i+1).padStart(2,"0")),svg("text",{"text-anchor":"middle",y:72,"font-size":14,"font-weight":"600",fill:"#51463d"},stage.title));
 g.addEventListener("click",()=>choose(i));
 g.addEventListener("keydown",e=>{
 if(e.key==="Enter"||e.key===" "){e.preventDefault();choose(i);}
 if(e.key==="ArrowLeft"||e.key==="ArrowRight"){
 e.preventDefault();choose(i+(e.key==="ArrowRight"?1:-1));
 const target=nodes.querySelector('[data-stage-index="'+step+'"]');if(target)target.focus();
 }});
 nodes.append(g);
 });
}
function render(){
const p=project(active),m=blueprint(active);
$("#casebook-kicker").textContent=m.eyebrow;
$("#casebook-title").textContent=p.name;
$("#casebook-lead").textContent=m.lead;
$("#casebook-disclaimer").textContent=m.caption;
$("#casebook-evidence-title").textContent=m.evidenceTitle;
$("#casebook-share-status").textContent="";
const localized={blueprintLabel:"label",closeBlueprint:"close",shareBlueprint:"share",blueprintSteps:"stages",blueprintQuestion:"question",blueprintDecision:"decision"};
Object.entries(localized).forEach(([k,v])=>$$('[data-i18n="'+k+'"]',dialog).forEach(x=>x.textContent=txt(v)));
const list=$("#casebook-stage-buttons");list.replaceChildren();
m.stages.forEach((s,i)=>{
const b=create("button",{type:"button",class:"casebook-stage-pill","data-blueprint-step":i});
b.append(create("span",{class:"casebook-pill-index"},String(i+1).padStart(2,"0")),create("span",{},s.sub));
b.addEventListener("click",()=>choose(i));list.append(b);
});
const links=$("#casebook-links");links.replaceChildren();
p.links.forEach(l=>links.append(create("a",{href:l.url,target:"_blank",rel:"noopener noreferrer"},l.title+" ↗")));
document.documentElement.style.setProperty("--casebook-accent",accent());
draw();updateCurrent();
}
function url(id,method){
const next=new URL(location.href);
if(id)next.searchParams.set("case",id);else next.searchParams.delete("case");
history[method](history.state,"",next.pathname+next.search+next.hash);
}
function open(id,options={}){
if(!valid.has(id))return;
opener=options.opener||document.activeElement;
if(active!==id)step=0;
active=id;locale=document.documentElement.lang.startsWith("zh")?"zh":"en";
render();if(!dialog.open)dialog.showModal();
if(options.updateUrl!==false)url(id,"pushState");
$("#casebook-close").focus();
}
function close(options={}){
if(dialog.open)dialog.close();
if(options.updateUrl!==false)url(null,"replaceState");
if(options.restoreFocus!==false&&opener?.isConnected)opener.focus();
}
$("#casebook-close").addEventListener("click",()=>close());
dialog.addEventListener("cancel",e=>{e.preventDefault();close();});
dialog.addEventListener("click",e=>{if(e.target===dialog)close();});
$("#casebook-share").addEventListener("click",async()=>{
const target=new URL(location.href);target.searchParams.set("case",active);
try{await navigator.clipboard.writeText(target.href);$("#casebook-share-status").textContent=txt("copied");}
catch(_){$("#casebook-share-status").textContent=txt("failed");}
});
document.addEventListener("click",e=>{
const b=e.target.closest("[data-open-case]");
if(b){e.preventDefault();open(b.dataset.openCase,{opener:b});}
});
$("#casebook-from-inspector").addEventListener("click",()=>open(selected,{opener:$("#casebook-from-inspector")}));
window.addEventListener("kaiser:project-selection",e=>{if(valid.has(e.detail?.id))selected=e.detail.id;});
window.addEventListener("kaiser:language",e=>{locale=e.detail?.locale==="zh"?"zh":"en";if(dialog.open)render();});
window.addEventListener("popstate",()=>{
const id=new URL(location.href).searchParams.get("case");
if(valid.has(id))open(id,{updateUrl:false});
else if(dialog.open)close({updateUrl:false,restoreFocus:false});
});
const deep=new URL(location.href).searchParams.get("case");
if(valid.has(deep))open(deep,{updateUrl:false});
window.KAISER_CASEBOOK={open};
})();
