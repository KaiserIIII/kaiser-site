/* KAISER / Atelier — no framework, no tracking, no external runtime.
   Single source of truth: ./data.js; the interface uses textContent for curated copy. */
(function () {
  "use strict";

  const data = window.KAISER_DATA;
  if (!data || !Array.isArray(data.projects) || !data.text) {
    return; // Progressive enhancement: the static page remains readable.
  }
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const body = document.body;
  body.classList.add("js");

  let locale = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
  try {
    const stored = localStorage.getItem("kaiser-language");
    if (stored === "zh" || stored === "en") locale = stored;
  } catch (_) { /* Storage is optional. */ }
  let archiveFilter = "all";
  let archiveQuery = "";
  let mapFilter = "all";
  let selectedId = "zhixu";
  let commandSelection = 0;
  let commandHits = [];
  let graphVisible = true;
  let heroVisible = true;
  const namespace = "http://www.w3.org/2000/svg";

  function translate(key) { return (data.text[locale] && data.text[locale][key]) || data.text.en[key] || key; }
  function projectText(project) { return project[locale] || project.en; }
  function projectById(id) { return data.projects.find(p => p.id === id); }
  function linkFor(project) { return project.links[0].url; }
  function element(tag, attributes = {}, text) {
    const node = document.createElement(tag);
    for (const key of Object.keys(attributes)) node.setAttribute(key, String(attributes[key]));
    if (text !== undefined) node.textContent = String(text);
    return node;
  }
  function svgNode(tag, attrs = {}, text) {
    const node = document.createElementNS(namespace, tag);
    for (const key of Object.keys(attrs)) node.setAttribute(key, String(attrs[key]));
    if (text !== undefined) node.textContent = String(text);
    return node;
  }
  function announce(message) {
    const status = $("#sr-status");
    if (status) status.textContent = message;
  }

  function setLanguage(next) {
    if (next !== "en" && next !== "zh") return;
    locale = next;
    try { localStorage.setItem("kaiser-language", locale); } catch (_) { /* Optional preference */ }
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    $$("[data-i18n]").forEach(node => {
      const value = translate(node.dataset.i18n);
      if (value) node.textContent = value;
    });
    $$("[data-i18n-placeholder]").forEach(node => {
      const value = translate(node.dataset.i18nPlaceholder);
      if (value) node.setAttribute("placeholder", value);
    });
    $$("[data-lang]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.lang === locale)));
    $$("#map-filters button[data-map-filter]").forEach(button => {
      const id = button.dataset.mapFilter;
      if (id !== "all") {
        const domain = data.domains.find(item => item.id === id);
        if (domain) button.textContent = domain.label[locale];
      }
    });
    $$("[data-feature-desc]").forEach(node => {
      const project = projectById(node.dataset.featureDesc);
      if (project) node.textContent = projectText(project).short;
    });
    const meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", translate("metaDescription"));
    document.title = locale === "zh" ? "于越 / Yue Yu — 从好奇心出发" : "Yue Yu / 于越 — Made with curiosity";
    updateInspector();
    updateGraph();
    renderArchive();
    if ($("#command-dialog").open) renderCommandResults();
    window.dispatchEvent(new CustomEvent("kaiser:language",{detail:{locale}}));
  }
  $$("[data-lang]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.lang)));

  // Non-essential animations are disabled when the visitor requests reduced motion.
  const revealTargets = $$(".reveal, .intro-reveal");
  const reveals = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        reveals.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -16px 0px" }) : null;
  revealTargets.forEach(target => {
    if (!reveals || prefersReduced.matches) target.classList.add("is-visible");
    else reveals.observe(target);
  });

  // Intentional small scroll progress indicator: no scroll-linked DOM layout calculations.
  let scrollPending = false;
  function updateScroll() {
    const limit = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    $("#scroll-progress").style.transform = "scaleX(" + Math.min(1, Math.max(0, scrollY / limit)) + ")";
    scrollPending = false;
  }
  addEventListener("scroll", () => {
    if (!scrollPending) {
      scrollPending = true;
      requestAnimationFrame(updateScroll);
    }
  }, { passive:true });
  updateScroll();

  const navObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      $$(".desktop-nav a").forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id));
    });
  }, { rootMargin:"-35% 0px -50% 0px", threshold:0 }) : null;
  if (navObserver) ["work", "connections", "compare", "about", "contact"].forEach(id => {
    const target = $("#" + id);
    if (target) navObserver.observe(target);
  });

  // Hero: one pointer-responsive generative artwork, no enormous background video.
  const heroArt = $("#hero-art");
  const plotPoint = $("#hero-plot-point");
  if (heroArt) {
    heroArt.addEventListener("pointermove", event => {
      if (prefersReduced.matches) return;
      const b = heroArt.getBoundingClientRect();
      const x = (event.clientX - b.left - b.width/2) / Math.max(1,b.width);
      const y = (event.clientY - b.top - b.height/2) / Math.max(1,b.height);
      heroArt.style.setProperty("--pointer-x", (x*15).toFixed(1) + "px");
      heroArt.style.setProperty("--pointer-y", (y*15).toFixed(1) + "px");
    }, { passive:true });
    heroArt.addEventListener("pointerleave", () => {
      heroArt.style.setProperty("--pointer-x", "0px");
      heroArt.style.setProperty("--pointer-y", "0px");
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; }, { threshold:0 }).observe(heroArt);
    }
  }
  function cubicCoordinates(points, t) {
    const u = 1-t;
    return {
      x:u*u*u*points[0][0] + 3*u*u*t*points[1][0] + 3*u*t*t*points[2][0] + t*t*t*points[3][0],
      y:u*u*u*points[0][1] + 3*u*u*t*points[1][1] + 3*u*t*t*points[2][1] + t*t*t*points[3][1]
    };
  }

  // Data-driven SVG graph. A domain/project relation is an explicit edge,
  // not a statistical claim or an invented association strength.
  const graph = $("#relationship-graph");
  const linkLayer = $("#graph-links");
  const nodeLayer = $("#graph-nodes");
  const particleLayer = $("#graph-particles");
  const domainPositions = new Map(data.domains.map((domain, index) => [domain.id, { x: 155, y: 113 + index*146 }]));
  const initialPositions = new Map(data.projects.map((project, index) => [project.id, { x: 737, y: 68 + index*59 }]));
  const positions = new Map(Array.from(initialPositions.entries()).map(([id,p]) => [id, {...p}]));
  const edges = [];
  const graphGroups = new Map();
  const domainGroups = new Map();
  const mobileNodes = new Map();

  function graphCurve(edge) {
    const a = domainPositions.get(edge.domain.id);
    const b = positions.get(edge.project.id);
    const start = a.x + 38, end = b.x - 119;
    const dx = end-start;
    return {
      path:"M"+start+" "+a.y+" C"+(start+dx*.44)+" "+a.y+", "+(start+dx*.61)+" "+b.y+", "+end+" "+b.y,
      points:[[start,a.y],[start+dx*.44,a.y],[start+dx*.61,b.y],[end,b.y]]
    };
  }
  function visibleProject(project) {
    return mapFilter === "all" || project.domains.includes(mapFilter);
  }
  function makeGraph() {
    // One DOM construction pass; animation only updates SVG attributes.
    data.domains.forEach(domain => {
      const p = domainPositions.get(domain.id);
      const group = svgNode("g", {
        class:"graph-domain",role:"button",tabindex:0,
        "aria-label":"Focus: "+domain.label.en,transform:"translate("+p.x+" "+p.y+")"
      });
      const disk = svgNode("circle", {r:33, fill:domain.color, "fill-opacity":".11"});
      const ring = svgNode("circle", {r:19, fill:"#fffdfa",stroke:domain.color,"stroke-width":"1.7"});
      const core = svgNode("circle", {r:5,fill:domain.color});
      const text = svgNode("text", {class:"domain-title",y:51,fill:"#61574d","font-size":"15","font-weight":"650","text-anchor":"middle"},domain.label.en);
      group.append(disk,ring,core,text);
      group.addEventListener("click",()=>setMapFilter(domain.id));
      group.addEventListener("keydown",event=>{
        if(event.key==="Enter"||event.key===" "){event.preventDefault();setMapFilter(domain.id);}
      });
      nodeLayer.append(group);
      domainGroups.set(domain.id,{group,text});
    });
    data.projects.forEach((project,index)=>{
      project.domains.forEach(id=>{
        const domain = data.domains.find(d=>d.id===id);
        const path = svgNode("path",{fill:"none",stroke:domain.color,"stroke-width":"1.2","stroke-opacity":".17","vector-effect":"non-scaling-stroke"});
        const particle=svgNode("circle",{r:3,fill:domain.color,opacity:0});
        linkLayer.append(path);
        particleLayer.append(particle);
        edges.push({domain,project,path,particle,points:[]});
      });
      const pos=positions.get(project.id);
      const group=svgNode("g",{class:"graph-project",role:"button",tabindex:0,"aria-label":"Inspect "+project.name,transform:"translate("+pos.x+" "+pos.y+")"});
      const plate=svgNode("rect",{class:"project-plate",x:-116,y:-24,width:232,height:49,rx:10,fill:"#fffdfa",stroke:"#ded5ca","stroke-width":"1"});
      const number=svgNode("text",{x:-100,y:-3,fill:"#b77559","font-size":"10","font-family":"monospace","font-weight":"700"},project.field);
      let short=project.name;
      if(project.id==="cost")short="Cost Analyzer";
      if(project.id==="paperskill")short="Paper Skill";
      if(project.id==="migrationwitness")short="MigrationWitness";
      if(project.id==="qldevice")short="QLDeviceCheck";
      if(project.id==="tta")short="Return-to-Source";
      if(project.id==="zhixu")short="Zhixu";
      const title=svgNode("text",{x:-75,y:7,fill:"#302d29","font-size":short.length>16?"14":"16","font-weight":"650"},short);
      const pin=svgNode("circle",{cx:94,cy:1,r:3,fill:"#c8bcaf"});
      group.append(plate,number,title,pin);
      const choose=()=>selectProject(project.id,{scroll:false});
      group.addEventListener("click",event=>{if(group.dataset.dragged==="1"){group.dataset.dragged="0";return;}choose();});
      group.addEventListener("keydown",event=>{
        if(event.key==="Enter"||event.key===" "){event.preventDefault();choose();}
        if(event.key==="ArrowRight"||event.key==="ArrowLeft"){
          event.preventDefault();
          const visible=data.projects.filter(visibleProject);
          const current=visible.findIndex(item=>item.id===project.id);
          const move=event.key==="ArrowRight"?1:-1;
          const next=visible[(current+move+visible.length)%visible.length];
          selectProject(next.id,{scroll:false});
          graphGroups.get(next.id).group.focus();
        }
      });
      let gesture=null;
      group.addEventListener("pointerdown",event=>{
        if(!visibleProject(project)||event.button>0)return;
        gesture={pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,moved:false};
        group.setPointerCapture(event.pointerId);
      });
      group.addEventListener("pointermove",event=>{
        if(!gesture||gesture.pointerId!==event.pointerId)return;
        const length=Math.hypot(event.clientX-gesture.startX,event.clientY-gesture.startY);
        if(length>5)gesture.moved=true;
        if(!gesture.moved)return;
        const matrix=graph.getScreenCTM();
        if(!matrix)return;
        const point=graph.createSVGPoint();
        point.x=event.clientX;point.y=event.clientY;
        const next=point.matrixTransform(matrix.inverse());
        const p=positions.get(project.id);
        p.x=Math.min(792,Math.max(612,next.x));
        p.y=Math.min(634,Math.max(38,next.y));
        group.setAttribute("transform","translate("+p.x+" "+p.y+")");
        updateEdges();
      });
      group.addEventListener("pointerup",event=>{
        if(!gesture||gesture.pointerId!==event.pointerId)return;
        if(gesture.moved){group.dataset.dragged="1";selectProject(project.id,{scroll:false});}
        else group.dataset.dragged="0";
        gesture=null;
      });
      group.addEventListener("pointercancel",()=>{gesture=null;});
      nodeLayer.append(group);
      graphGroups.set(project.id,{group,plate,title,pin,index});
    });
    if("IntersectionObserver" in window) {
      new IntersectionObserver(entries=>{graphVisible=entries[0].isIntersecting;},{threshold:0}).observe(graph);
    }
    buildMobileIndex();
    updateGraph();
  }
  function updateEdges() {
    edges.forEach(edge=>{
      const curve=graphCurve(edge);
      edge.path.setAttribute("d",curve.path);
      edge.points=curve.points;
      const selected=edge.project.id===selectedId;
      const visible=visibleProject(edge.project);
      edge.path.setAttribute("stroke-opacity",visible?(selected?".83":".13"):"0");
      edge.path.setAttribute("stroke-width",selected?"2.3":"1.1");
      edge.particle.setAttribute("opacity",(visible&&selected&&!prefersReduced.matches)?"0.9":"0");
    });
  }
  function buildMobileIndex(){
    const container=$("#mobile-project-index");
    if(!container)return;
    const fragment=document.createDocumentFragment();
    data.projects.forEach(project=>{
      const domain=data.domains.find(d=>d.id===project.domains[0]);
      const button=element("button",{
        type:"button",class:"mobile-project-entry",
        "aria-controls":"graph-inspector","aria-pressed":"false",
        "aria-label":"Inspect "+project.name
      });
      const meta=element("span",{class:"mobile-project-entry-top"});
      const dot=element("span",{class:"mobile-project-entry-dot","aria-hidden":"true"});
      dot.style.background=domain?.color||"#b77559";
      meta.append(dot,element("span",{},project.field+" / "+project.group.toUpperCase()));
      button.append(meta,element("span",{class:"mobile-project-entry-name"},project.name));
      button.addEventListener("click",()=>{
        selectProject(project.id,{scroll:false});
        if(window.matchMedia("(max-width: 660px)").matches){
          $("#graph-inspector").scrollIntoView({
            behavior:prefersReduced.matches?"instant":"smooth",
            block:"start"
          });
        }
      });
      fragment.append(button);
      mobileNodes.set(project.id,button);
    });
    container.replaceChildren(fragment);
  }
  function updateMobileIndex(){
    mobileNodes.forEach((button,id)=>{
      const project=projectById(id);
      button.hidden=!visibleProject(project);
      button.setAttribute("aria-pressed",String(id===selectedId));
    });
  }
  function updateGraph() {
    domainGroups.forEach(({group,text},id)=>{
      const domain=data.domains.find(d=>d.id===id);
      text.textContent=domain.label[locale];
      group.setAttribute("aria-label",domain.label[locale]);
      group.setAttribute("opacity",mapFilter==="all"||mapFilter===id?"1":".38");
    });
    graphGroups.forEach(({group,plate,pin},id)=>{
      const project=projectById(id);
      const visible=visibleProject(project);
      const selected=id===selectedId;
      group.setAttribute("opacity",visible?"1":".16");
      group.setAttribute("tabindex",visible?"0":"-1");
      group.style.pointerEvents=visible?"auto":"none";
      plate.setAttribute("fill",selected?"#f6eae0":"#fffdfa");
      plate.setAttribute("stroke",selected?"#b77559":"#ded5ca");
      plate.setAttribute("stroke-width",selected?"2":"1");
      pin.setAttribute("r",selected?"5":"3");
      pin.setAttribute("fill",selected?"#b77559":"#c8bcaf");
      group.setAttribute("aria-pressed",String(selected));
    });
    $$("[data-map-filter]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.mapFilter===mapFilter)));
    updateMobileIndex();
    updateEdges();
  }
  function updateInspector() {
    const project=projectById(selectedId);
    if(!project)return;
    const words=projectText(project);
    $("#inspector-index").textContent="PROJECT / "+project.field;
    $("#inspector-tag").textContent=words.tag;
    $("#inspector-title").textContent=project.name;
    $("#inspector-story").textContent=words.story;
    $("#inspector-focus").textContent=words.focus;
    $("#inspector-limit").textContent=words.note;
    const list=$("#inspector-evidence");
    list.replaceChildren();
    project.links.forEach(link=>{
      const anchor=element("a",{href:link.url,target:"_blank",rel:"noopener noreferrer"},link.title);
      list.append(anchor);
    });
    $("#inspector-source").href=linkFor(project);
  }
  function selectProject(id,options={}){
    if(!projectById(id))return;
    selectedId=id;
    window.dispatchEvent(new CustomEvent("kaiser:project-selection",{detail:{id}}));
    if(!visibleProject(projectById(id)))mapFilter="all";
    updateInspector();
    updateGraph();
    if(options.scroll) {
      $("#connections").scrollIntoView({behavior:prefersReduced.matches?"instant":"smooth",block:"start"});
    }
    announce(projectById(id).name);
  }
  function setMapFilter(id){
    if(id!=="all"&&!data.domains.some(d=>d.id===id))return;
    mapFilter=id;
    if(!visibleProject(projectById(selectedId))){
      const first=data.projects.find(visibleProject);
      if(first)selectedId=first.id;
    }
    updateInspector();
    updateGraph();
  }
  function navigateProject(delta){
    const pool=data.projects.filter(visibleProject);
    const index=pool.findIndex(p=>p.id===selectedId);
    if(!pool.length)return;
    const next=pool[(Math.max(0,index)+delta+pool.length)%pool.length];
    selectProject(next.id);
  }
  $("#project-prev").addEventListener("click",()=>navigateProject(-1));
  $("#project-next").addEventListener("click",()=>navigateProject(1));
  $$("#map-filters button[data-map-filter]").forEach(button=>{
    button.addEventListener("click",()=>setMapFilter(button.dataset.mapFilter));
  });
  $("#map-reset").addEventListener("click",()=>{
    for(const [id,p] of initialPositions) {
      positions.set(id,{...p});
      graphGroups.get(id).group.setAttribute("transform","translate("+p.x+" "+p.y+")");
    }
    mapFilter="all";
    updateGraph();
    announce(translate("resetDone"));
  });
  graph.addEventListener("keydown",event=>{
    if(event.target!==graph)return;
    if(event.key==="ArrowRight"||event.key==="ArrowDown"){event.preventDefault();navigateProject(1);}
    if(event.key==="ArrowLeft"||event.key==="ArrowUp"){event.preventDefault();navigateProject(-1);}
  });

  // Loop is attached to one requestAnimationFrame, with no layout reads on each frame.
  let animationFrame=0;
  function animate(time){
    if(!prefersReduced.matches&&!document.hidden){
      if(heroVisible&&plotPoint){
        const t=(time*.00012)%1;
        const p=cubicCoordinates([[102,185],[210,150],[395,430],[530,425]],t);
        plotPoint.setAttribute("transform","translate("+p.x.toFixed(2)+" "+p.y.toFixed(2)+")");
      }
      if(graphVisible){
        edges.forEach((edge,i)=>{
          if(edge.particle.getAttribute("opacity")==="0"||!edge.points.length)return;
          const t=(time*.00013+i*.157)%1;
          const p=cubicCoordinates(edge.points,t);
          edge.particle.setAttribute("cx",p.x.toFixed(2));
          edge.particle.setAttribute("cy",p.y.toFixed(2));
        });
      }
    }
    animationFrame=requestAnimationFrame(animate);
  }
  function syncAnimation(){
    const shouldRun=!prefersReduced.matches&&!document.hidden;
    if(!shouldRun && animationFrame){
      cancelAnimationFrame(animationFrame);
      animationFrame=0;
    } else if(shouldRun && !animationFrame) {
      animationFrame=requestAnimationFrame(animate);
    }
  }
  document.addEventListener("visibilitychange",syncAnimation);
  if(prefersReduced.addEventListener)prefersReduced.addEventListener("change",syncAnimation);
  syncAnimation();

  // Archive: search is local, case-insensitive and operates on both languages.
  function projectMatch(project,query){
    if(!query)return true;
    const haystack=[
      project.name,project.id,project.tech.join(" "),project.group,
      project.domains.join(" "),
      project.en.tag,project.en.short,project.en.story,
      project.zh.tag,project.zh.short,project.zh.story
    ].join(" ").toLocaleLowerCase();
    return haystack.includes(query);
  }
  function renderArchive(){
    const filtered=data.projects.filter(project=>
      (archiveFilter==="all"||project.group===archiveFilter)&&projectMatch(project,archiveQuery)
    );
    const root=$("#archive-list");
    const fragment=document.createDocumentFragment();
    filtered.forEach(project=>{
      const words=projectText(project);
      const row=element("article",{class:"archive-row"});
      const index=element("span",{class:"archive-row-index"},project.field);
      const head=element("div",{class:"archive-row-name"});
      const title=element("a",{href:linkFor(project),target:"_blank",rel:"noopener noreferrer"},project.name);
      title.style.textDecoration="none";
      const tag=element("small",{},words.tag);
      head.append(title,tag);
      const desc=element("p",{class:"archive-row-description"},words.short);
      const tags=element("div",{class:"archive-tech"});
      project.tech.slice(0,3).forEach(value=>tags.append(element("span",{},value)));
      const action=element("button",{type:"button","aria-label":translate("show")+": "+project.name,title:translate("show")+": "+project.name},"→");
      action.addEventListener("click",()=>{
        if(window.KAISER_CASEBOOK && typeof window.KAISER_CASEBOOK.open==="function"){
          window.KAISER_CASEBOOK.open(project.id,{opener:action});
        }else selectProject(project.id,{scroll:true});
      });
      row.append(index,head,desc,tags,action);
      fragment.append(row);
    });
    root.replaceChildren(fragment);
    $("#archive-count").textContent=String(filtered.length).padStart(2,"0");
    $("#archive-empty").hidden=filtered.length!==0;
    $$("[data-archive-filter]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.archiveFilter===archiveFilter)));
  }
  $("#archive-query").addEventListener("input",event=>{
    archiveQuery=event.target.value.trim().toLocaleLowerCase();
    renderArchive();
  });
  $$("[data-archive-filter]").forEach(button=>button.addEventListener("click",()=>{
    archiveFilter=button.dataset.archiveFilter;
    renderArchive();
  }));
  // Featured case buttons are handled by the source-linked casebook dialog.

  // Command palette: accessible native dialog, keyboard navigation and typed lookup.
  const dialog=$("#command-dialog"), commandInput=$("#command-input");
  function lookup(query){
    const q=query.trim().toLocaleLowerCase();
    return data.projects.filter(project=>projectMatch(project,q)).slice(0,10);
  }
  function renderCommandResults(){
    commandHits=lookup(commandInput.value);
    commandSelection=Math.min(commandSelection,Math.max(0,commandHits.length-1));
    const root=$("#command-results");
    const fragment=document.createDocumentFragment();
    commandHits.forEach((project,index)=>{
      const item=element("button",{type:"button",class:"command-result",role:"option","aria-selected":String(index===commandSelection)});
      item.append(
        element("span",{class:"command-result-number"},project.field),
        element("span",{class:"command-result-text"}),
        element("span",{class:"command-result-arrow"},"↗")
      );
      const body=$(".command-result-text",item);
      body.append(element("strong",{},project.name),element("small",{},projectText(project).tag+" · "+project.tech.slice(0,2).join(" / ")));
      item.addEventListener("mouseenter",()=>{commandSelection=index;highlightCommandSelection();});
      item.addEventListener("click",()=>{closeCommand();selectProject(project.id,{scroll:true});});
      fragment.append(item);
    });
    root.replaceChildren(fragment);
  }
  function highlightCommandSelection(){
    $$(".command-result",$("#command-results")).forEach((item,i)=>item.setAttribute("aria-selected",String(i===commandSelection)));
  }
  function openCommand(){
    if(dialog.open)return;
    commandInput.value="";
    commandSelection=0;
    renderCommandResults();
    dialog.showModal();
    commandInput.focus();
  }
  function closeCommand(){if(dialog.open)dialog.close();}
  $("#search-open").addEventListener("click",openCommand);
  $("#command-close").addEventListener("click",closeCommand);
  commandInput.addEventListener("input",()=>{commandSelection=0;renderCommandResults();});
  commandInput.addEventListener("keydown",event=>{
    if(event.key==="ArrowDown"||event.key==="ArrowUp"){
      event.preventDefault();
      if(commandHits.length){
        const dir=event.key==="ArrowDown"?1:-1;
        commandSelection=(commandSelection+dir+commandHits.length)%commandHits.length;
        highlightCommandSelection();
      }
    }
    if(event.key==="Enter"){
      event.preventDefault();
      const choice=commandHits[commandSelection];
      if(choice){closeCommand();selectProject(choice.id,{scroll:true});}
    }
  });
  dialog.addEventListener("click",event=>{if(event.target===dialog)closeCommand();});
  document.addEventListener("keydown",event=>{
    const editing=/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName);
    if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){
      event.preventDefault();dialog.open?closeCommand():openCommand();return;
    }
    if(!editing&&!dialog.open&&event.key==="/"){event.preventDefault();openCommand();return;}
    if(!editing&&!dialog.open&&(event.key==="ArrowRight"||event.key==="ArrowLeft")&&document.activeElement===graph){
      event.preventDefault();navigateProject(event.key==="ArrowRight"?1:-1);
    }
  });

  // Boot with readable content before any animation begins.
  makeGraph();
  setLanguage(locale);
  selectProject("zhixu");
  renderArchive();
})();
