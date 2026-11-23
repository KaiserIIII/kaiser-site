/* Atelier Reliability Lab — a tiny deterministic teaching model.
 * NOT PostgreSQL, pg-osc, Chroma, BM25 or a real LLM. No network, storage or side effects.
 * The source-backed projects are linked by the UI; only synthetic data runs here. */
(function(root,factory){
  "use strict";
  const value=factory();
  if(typeof module!=="undefined"&&module.exports)module.exports=value;
  if(root)root.KAISER_LAB_ENGINE=value;
})(typeof window!=="undefined"?window:null,function(){
  "use strict";
  const grants=Object.freeze({
    app_writer:Object.freeze(["SELECT","INSERT","UPDATE"]),
    app_reader:Object.freeze(["SELECT"])
  });
  const docs=Object.freeze([
    {id:"A-01",tenant:"alpha",title:"Release checklist",body:"release version artifacts signing"},
    {id:"A-02",tenant:"alpha",title:"Cost measurement",body:"cost estimation quantities rounding"},
    {id:"B-01",tenant:"beta",title:"Partner roadmap",body:"release version artifacts roadmap"},
    {id:"B-02",tenant:"beta",title:"Financial forecast",body:"cost estimation quantities forecast"},
    {id:"PUB-01",tenant:"public",title:"Public release guidance",body:"release testing rollback"},
    {id:"PUB-02",tenant:"public",title:"Public security guidance",body:"security scope audit retention"}
  ]);
  const allowed=new Set(["alpha","beta"]);
  const normalise=(s)=>String(s??"").toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu)||[];

  function permission(input={}){
    const role=Object.hasOwn(grants,input.role)?input.role:"app_writer";
    const strategy=input.strategy==="swap"?"swap":"native";
    const reapply=Boolean(input.reapply);
    const expected=[...grants[role]];
    const actual=(strategy==="native"||reapply)?[...expected]:[];
    const checks=expected.map(operation=>({operation,ok:actual.includes(operation)}));
    const pass=checks.every(x=>x.ok);
    const trace=[
      {kind:"setup",en:"Baseline explicit role grants recorded",zh:"记录迁移前应用角色的显式授权"},
      {kind:"action",en:strategy==="swap"?"Toy shadow-table swap creates a replacement with no copied grants":"Toy native ALTER keeps the original table and grants",zh:strategy==="swap"?"模拟影子表替换：新表没有自动继承旧表授权":"模拟原生 ALTER：保留原表及其授权"},
      {kind:"action",en:strategy==="swap"?(reapply?"Explicit grants are reapplied to the replacement":"No post-swap grant replay is requested"):"No grant replay is necessary in this toy scenario",zh:strategy==="swap"?(reapply?"显式授权已重新赋予新表":"没有执行替换后的授权恢复"):"这个模拟场景不需要重新授权"},
      {kind:"verify",en:pass?"Independent expected-grant check PASS":"Independent expected-grant check FAIL",zh:pass?"独立权限契约检查通过":"独立权限契约检查失败"}
    ];
    return {kind:"permission",strategy,role,reapply,expected,actual,checks,pass,
      missing:expected.filter(x=>!actual.includes(x)),trace};
  }

  function retrieval(input={}){
    const tenant=allowed.has(input.tenant)?input.tenant:"alpha";
    const scoped=input.scoped!==false;
    const query=String(input.query??"release version roadmap").slice(0,90);
    const terms=[...new Set(normalise(query))].slice(0,12);
    // Filter the allowed records before lexical scoring when scoped.
    const eligible=docs.filter(d=>!scoped||d.tenant===tenant||d.tenant==="public");
    const hits=eligible.map(d=>{
      const matches=terms.filter(term=>normalise(d.body).includes(term));
      return {...d,score:matches.length,matches,unauthorized:d.tenant!=="public"&&d.tenant!==tenant};
    }).filter(d=>d.score>0).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)).slice(0,4);
    const leaks=hits.filter(d=>d.unauthorized);
    const pass=leaks.length===0;
    const trace=[
      {kind:"setup",en:"Synthetic documents include two tenants and public records",zh:"模拟文档包含两个租户和公共记录"},
      {kind:"action",en:scoped?"Tenant filter applied BEFORE toy lexical ranking":"Tenant filter disabled; all synthetic records enter ranking",zh:scoped?"先执行租户过滤，再进行简化词项排序":"租户过滤已关闭，所有模拟文档参与排序"},
      {kind:"action",en:"Ranked by count of exact query tokens in each toy document",zh:"按模拟文档中匹配查询词项的数量排序"},
      {kind:"verify",en:pass?"No foreign-tenant record returned":"Foreign-tenant evidence appears in results",zh:pass?"返回结果中没有其他租户文档":"结果中出现其他租户文档"}
    ];
    return {kind:"retrieval",tenant,scoped,query,terms,hits,leaks:leaks.length,pass,trace,
      scanned:eligible.length,total:docs.length};
  }
  return Object.freeze({permission,retrieval,fixtures:docs,roles:grants});
});
