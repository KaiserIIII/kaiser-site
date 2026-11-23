/* KAISER / Evidence Search V10
   Local deterministic retrieval of curated PUBLIC project records.
   Not an LLM or automated claim verifier. Relevance != competence. */
(function(root,factory){
  "use strict";
  const api=factory();
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  if(root)root.KAISER_EVIDENCE_SEARCH=api;
})(typeof window!=="undefined"?window:null,function(){
  "use strict";
  const concepts=Object.freeze([
    {id:"shipping",labels:{en:"Published & usable work",zh:"发布与可用成果"},
      signals:["published","released","release","shipped","shipping","playable","demo","steam","game","product","发布","发售","上线","可玩","交付","成品","游戏","产品","应用"],
      projects:["cardcraft","wifiscope","qldevice","zhixu"]},
    {id:"database",labels:{en:"Database correctness",zh:"数据库正确性"},
      signals:["database","postgresql","postgres","pg-osc","sql","migration","privilege","grant","数据库","数据迁移","迁移","授权","权限丢失"],
      projects:["migrationwitness","zhixu","importproof"]},
    {id:"knowledge",labels:{en:"Retrieval & knowledge systems",zh:"检索与知识系统"},
      signals:["knowledge","retrieval","rag","vector","fastapi","document","citation","multitenant","tenant","知识","检索","文档","引用","租户","向量","隔离","多租户"],
      projects:["zhixu","importproof","paperskill"]},
    {id:"security",labels:{en:"Boundaries & security",zh:"边界与安全"},
      signals:["security","network","wifi","tls","tcp","pcap","privacy","scope","forensics","安全","网络","协议","隐私","边界","取证","授权","攻击面"],
      projects:["wifiscope","zhixu","migrationwitness","qldevice"]},
    {id:"construction",labels:{en:"Construction & computation",zh:"工程计算与造价"},
      signals:["construction","cost","bim","engineering management","quantity","boq","unit rate","decimal","建筑","土木","造价","工程管理","工程量","计量","计价","成本","清单"],
      projects:["cost","qldevice"]},
    {id:"verification",labels:{en:"Testing & independent evidence",zh:"测试与独立证据"},
      signals:["test","tested","verification","reliable","reliability","failure","ci","experiment","control","audit","evidence","验证","测试","实验","可复现","复现","失败","缺陷","证据","对照","可靠性"],
      projects:["migrationwitness","wifiscope","zhixu","reproshift","importproof","tta","qldevice","paperskill"]},
    {id:"research",labels:{en:"Research & reproducibility",zh:"研究与可复现性"},
      signals:["research","reproducible","reproducibility","science","paper","experiment","negative result","研究","科研","论文","实验","负结果","可复现","复现"],
      projects:["reproshift","migrationwitness","tta","paperskill"]},
    {id:"automation",labels:{en:"Engineering workflows",zh:"工程流程与自动化"},
      signals:["automation","workflow","pipeline","industrial","modbus","deployment","devops","自动化","工作流","生产","部署","工业","设备","验收"],
      projects:["qldevice","zhixu","cardcraft","paperskill"]}
  ]);
  const stop=new Set(["what","which","where","when","how","show","tell","me","my","your","you","any","are","is","was","were","have","has","had","been","work","about","the","and","for","with","from","into","some","can","did","that","on","of","or","to","do","a","an","in","i"]);
  const normalize=value=>String(value??"").normalize("NFKC").toLocaleLowerCase().trim();
  const tokenList=value=>[...new Set((normalize(value).match(/[\p{L}\p{N}][\p{L}\p{N}+.#-]*/gu)||[])
    .filter(w=>!stop.has(w)&&w.length>1))].slice(0,20);
  const chinese=value=>/[\u3400-\u9fff]/u.test(value);
  const hasSignal=(query,signal)=>{
    const text=normalize(signal),q=normalize(query);
    if(!text)return false;
    if(chinese(text)||/\s/.test(text))return q.includes(text);
    const escaped=text.replace(/[.*+?^$()|[\]{}]/g,"\\$&");
    return new RegExp("(^|[^\\p{L}\\p{N}])"+escaped+"(?=$|[^\\p{L}\\p{N}])","u").test(q);
  };
  const localeOf=lang=>String(lang).startsWith("zh")?"zh":"en";
  function inspect(query,projects,language="en",maxResults=6){
    const locale=localeOf(language),raw=String(query??"").trim().slice(0,180);
    const corpus=Array.isArray(projects)?projects:[];
    if(!raw)return {query:"",locale,mode:"browse",concepts:[],tokens:[],results:corpus.slice(0,maxResults).map(project=>({
      project,score:0,reasons:[],kind:"browse",
      evidence:project[locale]?.proof||project.en?.proof||"",
      limitation:project[locale]?.note||project.en?.note||""}))};
    const matches=concepts.filter(c=>c.signals.some(signal=>hasSignal(raw,signal)));
    const tokens=tokenList(raw);
    const results=corpus.map(project=>{
      const translated=project[locale]||project.en||{};
      const other=project[locale==="zh"?"en":"zh"]||{};
      const fields=[
        {value:project.name,weight:11},{value:project.id,weight:12},
        {value:(project.tech||[]).join(" "),weight:7},
        {value:translated.tag+" "+other.tag,weight:5},
        {value:translated.focus+" "+other.focus,weight:5},
        {value:translated.proof+" "+other.proof,weight:5},
        {value:translated.short+" "+other.short,weight:3},
        {value:translated.story+" "+other.story,weight:2},
        {value:translated.note+" "+other.note,weight:2},
        {value:(project.links||[]).map(l=>l.title).join(" "),weight:3}
      ];
      let score=0;
      const reasons=[];
      const matched=matches.filter(c=>c.projects.includes(project.id));
      if(matched.length){
        score+=matched.reduce((sum,c)=>sum+16+(c.id==="shipping"&&project.id==="cardcraft"?6:0),0);
        reasons.push(...matched.slice(0,2).map(c=>c.labels[locale]));
      }
      const q=normalize(raw);
      if(q===normalize(project.name)||q===normalize(project.id)){
        score+=85;
        reasons.unshift(locale==="zh"?"项目名称匹配":"Exact project match");
      }
      for(const token of tokens){
        let best=0;
        for(const field of fields){
          const haystack=normalize(field.value);
          if(haystack&&haystack.includes(token))best=Math.max(best,field.weight);
        }
        if(best)score+=best;
      }
      if(chinese(q)&&q.length>1&&fields.some(f=>normalize(f.value).includes(q)))score+=9;
      if(score>0&&!reasons.length)reasons.push(locale==="zh"?"公开项目资料中的关键词":"Keyword in public project record");
      return {project,score,reasons:reasons.slice(0,3),kind:matched.length?"concept":"keyword",
        evidence:translated.proof||"",limitation:translated.note||""};
    }).filter(r=>r.score>0).sort((a,b)=>b.score-a.score||String(a.project.field).localeCompare(String(b.project.field)))
      .slice(0,Math.max(1,Math.min(10,Number(maxResults)||6)));
    return {query:raw,locale,mode:matches.length?"conceptual":"lexical",
      concepts:matches.map(c=>c.labels[locale]),tokens,results};
  }
  return Object.freeze({inspect,normalize,tokenList,conceptDefinitions:concepts});
});
