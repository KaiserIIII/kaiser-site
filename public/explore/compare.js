/* KAISER / Comparison Studio.
   Designed to compare publicly inspectable work, never to invent skill scores or metrics.
   A deterministic, bilingual and deep-linkable view over the same curated project records. */
(function () {
  "use strict";
  const data = window.KAISER_DATA;
  const root = document.getElementById("compare-studio");
  if (!data || !root || !Array.isArray(data.projects)) return;

  const $ = (selector, parent=document) => parent.querySelector(selector);
  const idSet = new Set(data.projects.map(item => item.id));
  const domains = new Map(data.domains.map(item => [item.id,item]));
  const ns = "http://www.w3.org/2000/svg";
  const defaults = ["zhixu","migrationwitness"];
  const text = {
    en: {
      navCompare:"Compare",compareKicker:"03 / COMPARATIVE NOTEBOOK",
      compareTitle:"Different systems. Shared questions.",
      compareSubtitle:"Place two projects side by side. Explore what each one is solving, inspect evidence and follow the connections — without reducing the work to a score.",
      compareMode:"SIDE BY SIDE / 001",compareCopy:"Copy comparison link",
      compareLeftLabel:"FIRST PROJECT",compareRightLabel:"SECOND PROJECT",
      compareTry:"START SOMEWHERE",comparePresetOne:"Knowledge × Reliability",
      comparePresetTwo:"Game × Construction",comparePresetThree:"Networks × Data fidelity",
      compareVisualCaption:"Conceptual connections · Not a benchmark",
      compareShared:"SHARED SUBJECT AREAS",
      compareFocus:"ENGINEERING FOCUS",compareProof:"PUBLIC EVIDENCE",
      compareBoundary:"KNOWN BOUNDARY",compareNotice:"Connections use the four editorial categories of this public project index. No score, result or production readiness is inferred.",
      compareExplanationSome:"Both are grouped under {areas} in this project's curated index. Their implementations and verification remain separate.",
      compareExplanationNone:"These projects don't share a category in this four-part index. Compare their different goals, evidence and limitations instead.",
      compareLinkCopied:"Link copied",compareLinkFailed:"Copy unavailable; use the URL in the address bar",
      compareLinkShare:"Share this pairing",compareSwap:"Swap the compared projects",
      archiveKicker:"04 / THE ARCHIVE",aboutKicker:"05 / A LITTLE ABOUT ME"
    },
    zh: {
      navCompare:"对比",compareKicker:"03 / 项目对照手记",
      compareTitle:"不同的系统，相似的问题。",
      compareSubtitle:"把两个项目放在一起，看看各自解决什么、留下哪些证据，又有哪些交叉之处——不把它们简化成能力评分。",
      compareMode:"并排探索 / 001",compareCopy:"复制对比链接",
      compareLeftLabel:"第一个项目",compareRightLabel:"第二个项目",
      compareTry:"从这里开始",comparePresetOne:"知识系统 × 可靠性",
      comparePresetTwo:"游戏 × 工程造价",comparePresetThree:"网络 × 数据保真",
      compareVisualCaption:"概念联系示意 · 非性能基准测试",
      compareShared:"共同涉及的主题",
      compareFocus:"技术关注点",compareProof:"公开验证材料",
      compareBoundary:"已知适用边界",compareNotice:"联系来自公开项目索引的四个编辑式分类，不推断能力评分、实验结果或生产环境成熟度。",
      compareExplanationSome:"按照本站的项目分类，它们都涉及{areas}；具体实现与验证仍需要分别阅读。",
      compareExplanationNone:"在本站的四类主题中，这两个项目没有共同标签。可以对照不同的目标、证据和局限，而不勉强归为一类。",
      compareLinkCopied:"链接已复制",compareLinkFailed:"暂时无法复制，可使用地址栏链接",
      compareLinkShare:"分享这组项目",compareSwap:"交换对比顺序",
      archiveKicker:"04 / 项目索引",aboutKicker:"05 / 关于我"
    }
  };
  let locale = document.documentElement.lang.startsWith("zh")?"zh":"en";
  let left = defaults[0], right = defaults[1];
  const project = id => data.projects.find(item => item.id===id);
  const local = value => value[locale]||value.en;
  const str = k => text[locale][k]||text.en[k]||k;
  const node = (tag,attributes={},content) => {
    const x=document.createElement(tag);
    Object.entries(attributes).forEach(([k,v])=>x.setAttribute(k,String(v)));
    if(content!==undefined)x.textContent=content;
    return x;
  };
  const svg = (tag,attributes={},content)=>{
    const x=document.createElementNS(ns,tag);
    Object.entries(attributes).forEach(([k,v])=>x.setAttribute(k,String(v)));
    if(content!==undefined)x.textContent=content;
    return x;
  };

  function parsePair(raw) {
    if(!raw)return null;
    const pair=raw.split(",");
    if(pair.length!==2 || pair[0]===pair[1] || !idSet.has(pair[0]) || !idSet.has(pair[1]))return null;
    return pair;
  }
  const fromUrl = parsePair(new URL(location.href).searchParams.get("compare"));
  if(fromUrl){left=fromUrl[0];right=fromUrl[1];}

  function setUrl(method) {
    const next=new URL(location.href);
    next.searchParams.set("compare",left+","+right);
    if(method==="pushState")next.hash="compare";
    history[method](history.state,"",next.pathname+next.search+next.hash);
  }
  function updateCopy() {
    Object.keys(text.en).forEach(k=>{
      document.querySelectorAll('[data-i18n="'+k+'"]').forEach(el=>el.textContent=str(k));
    });
    $("#compare-swap").setAttribute("aria-label",str("compareSwap"));
    $("#compare-swap").setAttribute("title",str("compareSwap"));
    $("#compare-share").setAttribute("aria-label",str("compareLinkShare"));
  }
  function renderOptions() {
    ["left","right"].forEach(side=>{
      const select=$("#compare-"+side),fragment=document.createDocumentFragment();
      data.projects.forEach(item=>fragment.append(node("option",{value:item.id},item.name)));
      select.replaceChildren(fragment);
      select.value=side==="left"?left:right;
    });
  }
  function renderBox(side,id) {
    const item=project(id),content=local(item);
    $("#compare-"+side+"-title").textContent=item.name;
    $("#compare-"+side+"-field").textContent=item.field;
    $("#compare-"+side+"-short").textContent=content.short;
    $("#compare-"+side+"-focus").textContent=content.focus;
    $("#compare-"+side+"-proof").textContent=content.proof;
    $("#compare-"+side+"-limit").textContent=content.note;
    const tech=$("#compare-"+side+"-tech");
    tech.replaceChildren();
    item.tech.slice(0,4).forEach(label=>tech.append(node("span",{},label)));
    const links=$("#compare-"+side+"-links");links.replaceChildren();
    item.links.forEach(link=>links.append(node("a",{
      href:link.url,target:"_blank",rel:"noopener noreferrer"
    },link.title+" ↗")));
  }
  function commonDomains() {
    return data.domains.filter(domain=>project(left).domains.includes(domain.id)&&project(right).domains.includes(domain.id));
  }
  function drawScene(shared){
    const paths=$("#compare-paths"),nodes=$("#compare-nodes");
    paths.replaceChildren();nodes.replaceChildren();
    const a=project(left),b=project(right);
    const leftColor=domains.get(a.domains[0])?.color||"#b77559";
    const rightColor=domains.get(b.domains[0])?.color||"#738b81";
    const segments=Math.max(1,shared.length);
    for(let index=0;index<segments;index++){
      const offset=(index-(segments-1)/2)*29;
      const link=svg("path",{
        d:"M 182 130 C 352 "+(75+offset)+", 645 "+(186-offset)+", 814 130",
        stroke:shared[index]?.color||"#b8afa4",
        "stroke-opacity":shared.length?".65":".5",
        "stroke-width":shared.length?2.3:1.2,
        "stroke-dasharray":shared.length?"none":"5 7",
        fill:"none"
      });
      paths.append(link);
      if(shared[index]){
        nodes.append(svg("circle",{
          cx:500,cy:131+offset*.35,r:9,
          fill:shared[index].color,stroke:"#f8f4ee","stroke-width":3
        }));
      }
    }
    for(const item of [{x:140,color:leftColor,initial:"A",id:a.id},{x:850,color:rightColor,initial:"B",id:b.id}]){
      const g=svg("g",{transform:"translate("+item.x+",130)"});
      g.append(
        svg("circle",{r:78,fill:item.color,"fill-opacity":".09"}),
        svg("circle",{r:57,fill:"#fffdfa",stroke:item.color,"stroke-width":"2"}),
        svg("circle",{r:40,fill:item.color,"fill-opacity":".10"}),
        svg("text",{"text-anchor":"middle",y:12,"font-size":37,"font-family":"Georgia,serif","font-style":"italic",fill:item.color},item.initial)
      );
      nodes.append(g);
    }
    const stamp=svg("text",{
      x:500,y:218,"text-anchor":"middle","font-family":"ui-monospace,monospace",
      "font-size":11,fill:"#65584e","letter-spacing":"1.7"
    },(shared.length?"SHARED TOPICS":"DIFFERENT DOMAINS"));
    nodes.append(stamp);
  }
  function render(){
    renderOptions();
    renderBox("left",left);
    renderBox("right",right);
    const common=commonDomains();
    $("#compare-shared-count").textContent=String(common.length).padStart(2,"0")+" / "+String(data.domains.length).padStart(2,"0");
    const tags=$("#compare-shared-tags");tags.replaceChildren();
    common.forEach(domain=>{
      const chip=node("span",{class:"compare-domain-chip"});
      chip.append(node("span",{class:"compare-chip-dot","aria-hidden":"true"}),node("span",{},domain.label[locale]));
      chip.querySelector(".compare-chip-dot").style.background=domain.color;
      tags.append(chip);
    });
    if(!common.length)tags.append(node("span",{class:"compare-no-overlap"},locale==="zh"?"无共同分类":"No shared category"));
    const names=common.map(domain=>domain.label[locale]).join(locale==="zh"?"、":", ");
    $("#compare-explanation").textContent=str(common.length?"compareExplanationSome":"compareExplanationNone").replace("{areas}",names);
    $("#compare-share-status").textContent="";
    drawScene(common);
    document.querySelectorAll("[data-compare-preset]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.comparePreset===left+","+right)));
  }
  function setPair(nextLeft,nextRight,method="replaceState"){
    if(!idSet.has(nextLeft)||!idSet.has(nextRight)||nextLeft===nextRight)return;
    left=nextLeft;right=nextRight;
    render();
    setUrl(method);
  }
  $("#compare-left").addEventListener("change",event=>{
    const next=event.target.value;
    setPair(next,next===right?left:right);
  });
  $("#compare-right").addEventListener("change",event=>{
    const next=event.target.value;
    setPair(next===left?right:left,next);
  });
  $("#compare-swap").addEventListener("click",()=>setPair(right,left));
  document.querySelectorAll("[data-compare-preset]").forEach(button=>button.addEventListener("click",()=>{
    const pair=parsePair(button.dataset.comparePreset);
    if(pair)setPair(pair[0],pair[1],"pushState");
  }));
  $("#compare-share").addEventListener("click",async()=>{
    const next=new URL(location.href);
    next.searchParams.set("compare",left+","+right);
    next.hash="compare";
    try{
      await navigator.clipboard.writeText(next.href);
      $("#compare-share-status").textContent=str("compareLinkCopied");
    }catch(_){
      $("#compare-share-status").textContent=str("compareLinkFailed");
    }
  });
  addEventListener("kaiser:language",event=>{
    locale=event.detail?.locale==="zh"?"zh":"en";
    updateCopy();
    render();
  });
  addEventListener("popstate",()=>{
    const next=parsePair(new URL(location.href).searchParams.get("compare"));
    if(next){left=next[0];right=next[1];}
    else{left=defaults[0];right=defaults[1];}
    render();
  });
  updateCopy();
  render();
  window.KAISER_COMPARE={setPair};
})();
