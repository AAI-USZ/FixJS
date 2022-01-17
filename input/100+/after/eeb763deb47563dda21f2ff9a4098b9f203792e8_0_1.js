function(exports){function push_decl_scope(pctx,bl){



























pctx.decl_scopes.push({vars:[],funs:"",fscoped_ctx:0,bl:bl});

if(bl){
var prev=pctx.decl_scopes[pctx.decl_scopes.length-2];
if(!prev.bl)prev.notail=true;

}
}

function collect_decls(decls){var rv="";

if(decls.vars.length)rv+="var "+decls.vars.join(",")+";";

rv+=decls.funs;
return rv;
}

function top_decl_scope(pctx){return pctx.decl_scopes[pctx.decl_scopes.length-1];

}

function push_stmt_scope(pctx){pctx.stmt_scopes.push({seq:[]});

}
function pop_stmt_scope(pctx,pre,post){var seq=pctx.stmt_scopes.pop().seq;

var rv="";
if(seq.length){
if(pctx.js_ctx==0){
if(pre)rv+=pre;

for(var i=0;i<seq.length;++i){
var v=seq[i].v();
;
if(v.length){
if(i||pre)rv+=",";
rv+=v;
}
}
if(post)rv+=post;

}else{


for(var i=0;i<seq.length;++i)rv+=seq[i].nb();

}
}
return rv;
}

function top_stmt_scope(pctx){return pctx.stmt_scopes[pctx.stmt_scopes.length-1];

}









function begin_script(pctx){if(pctx.filename)pctx.fn=pctx.filename.replace(/\'/g,"\\\'");









switch(pctx.mode){case "debug":

pctx.allow_nblock=false;
pctx.full_nblock=false;
break;
case "optimize":
pctx.allow_nblock=true;
pctx.full_nblock=true;
break;
case "normal":
default:
pctx.allow_nblock=true;
pctx.full_nblock=false;
}

if(typeof pctx.scopes!=='undefined')throw "Internal parser error: Nested script";

pctx.decl_scopes=[];
pctx.stmt_scopes=[];

pctx.js_ctx=0;

push_decl_scope(pctx);
push_stmt_scope(pctx);
}



function add_stmt(stmt,pctx){if(stmt==ph_empty_stmt)return;

if(stmt.is_compound_stmt){

for(var i=0;i<stmt.stmts.length;++i)add_stmt(stmt.stmts[i],pctx);

return;
}else if(stmt.is_var_decl){

top_decl_scope(pctx).vars.push(stmt.decl());
if(stmt.is_empty)return;


}else if(stmt.is_fun_decl){

top_decl_scope(pctx).funs+=stmt.decl();
return;
}


var seq=top_stmt_scope(pctx).seq;
if(stmt.is_nblock&&pctx.js_ctx==0){

var last=seq.length?seq[seq.length-1]:null;
if(!last||!last.is_nblock_seq){
last=new ph_nblock_seq(pctx);
seq.push(last);
}
last.pushStmt(stmt);
}else seq.push(stmt);


}

function end_script(pctx){var decls=pctx.decl_scopes.pop();

var rv=collect_decls(decls)+pop_stmt_scope(pctx,"__oni_rt.exseq(this.arguments,this,'"+pctx.fn+"',["+(16|8),"])");



return rv;
}





function pop_block(pctx){switch(top_stmt_scope(pctx).seq.length){case 1:


var stmt=pctx.stmt_scopes.pop().seq[0];

stmt.is_var_decl=false;
return stmt;
case 0:
pctx.stmt_scopes.pop();
return ph_empty_stmt;
default:
return new ph_block(pop_stmt_scope(pctx));
}
}




function nblock_val_to_val(v,r,l){var rv="__oni_rt.Nb(function(){";

if(r)rv+="return ";
return rv+v+"},"+(l||0)+")";
}

function ph(){}

ph.prototype={is_nblock:false,v:function(accept_list){


if(this.is_nblock&&this.nblock_val)return nblock_val_to_val(this.nblock_val(),this.is_value,this.line);else return this.val(accept_list);




},nb:function(){

if(this.nblock_val)return this.nblock_val();else throw "Illegal statement in __js block";






}};





function ph_block(seq){this.seq=seq;

}
ph_block.prototype=new ph();
ph_block.prototype.nblock_val=function(){return this.seq;

};
ph_block.prototype.val=function(accept_list){return this.seq.length?(accept_list?this.seq:"__oni_rt.Seq("+0+","+this.seq+")"):"0";




};






function ph_switch(exp,clauses){this.exp=exp;

this.clauses=clauses;
}
ph_switch.prototype=new ph();
ph_switch.prototype.nblock_val=function(){var rv="switch("+this.exp.nb()+"){";


for(var i=0,l=this.clauses.length;i<l;++i){
var clause=this.clauses[i];
rv+=(clause[0]?"case "+clause[0].nb()+":":"default:")+clause[1].nb();
}
return rv+"}";
};
ph_switch.prototype.val=function(){var clauses="[";


for(var i=0,l=this.clauses.length;i<l;++i){
var clause=this.clauses[i];
if(i)clauses+=",";
clauses+="["+(clause[0]?clause[0].v():"__oni_rt.Default")+","+clause[1].v()+"]";
}
clauses+="]";
return "__oni_rt.Switch("+this.exp.v()+","+clauses+")";
};







function ph_fun_exp(fname,pars,body,pctx,implicit_return){this.is_nblock=pctx.allow_nblock;






if(implicit_return&&pctx.js_ctx)body="return "+body;

















this.code="function "+fname+"("+pars.join(",")+"){"+body+"}";
}
ph_fun_exp.prototype=new ph();

ph_fun_exp.prototype.v=function(){return this.code;

};
ph_fun_exp.prototype.nblock_val=function(){return this.code};

function gen_fun_decl(fname,pars,body,pctx){if(top_decl_scope(pctx).fscoped_ctx){



return gen_var_decl([[fname,new ph_fun_exp("",pars,body,pctx)]],pctx);
}else return new ph_fun_decl(fname,pars,body,pctx);


}

function ph_fun_decl(fname,pars,body,pctx){this.code="function "+fname+"("+pars.join(",")+"){"+body+"}";

}
ph_fun_decl.prototype=new ph();
ph_fun_decl.prototype.is_fun_decl=true;

ph_fun_decl.prototype.decl=function(){return this.code};






function ph_nblock_seq(){this.stmts=[];

}
ph_nblock_seq.prototype=new ph();
ph_nblock_seq.prototype.is_nblock=true;
ph_nblock_seq.prototype.is_nblock_seq=true;
ph_nblock_seq.prototype.pushStmt=function(stmt){this.stmts.push(stmt);

if(typeof this.line==='undefined')this.line=this.stmts[0].line;
};


ph_nblock_seq.prototype.nblock_val=function(){var rv="";

for(var i=0;i<this.stmts.length-1;++i){
rv+=this.stmts[i].nb();
}
if(this.stmts[i].is_value)rv+="return ";

rv+=this.stmts[i].nb();
return rv;
};


function ph_compound_stmt(pctx){this.stmts=[];

this.pctx=pctx;
}
ph_compound_stmt.prototype=new ph();
ph_compound_stmt.prototype.is_compound_stmt=true;
ph_compound_stmt.prototype.toBlock=function(){push_stmt_scope(this.pctx);

add_stmt(this,this.pctx);
return pop_block(this.pctx);
};

function ph_exp_stmt(exp,pctx){this.exp=exp;

this.line=this.exp.line;
this.is_nblock=exp.is_nblock;
}
ph_exp_stmt.prototype=new ph();
ph_exp_stmt.prototype.is_value=true;
ph_exp_stmt.prototype.nblock_val=function(){return this.exp.nb()+";"};
ph_exp_stmt.prototype.v=function(accept_list){return this.exp.v(accept_list)};


function gen_var_compound(decls,pctx){var rv=new ph_compound_stmt(pctx);

for(var i=0;i<decls.length;++i)rv.stmts.push(new ph_var_decl(decls[i],pctx));

return rv;
}

function gen_var_decl(decls,pctx){return gen_var_compound(decls,pctx).toBlock();

}

function ph_var_decl(d,pctx){this.d=d;

this.is_empty=this.d.length<2;
this.line=pctx.line;
if(!this.is_empty)this.is_nblock=pctx.allow_nblock&&d[1].is_nblock;

}
ph_var_decl.prototype=new ph();
ph_var_decl.prototype.is_var_decl=true;
ph_var_decl.prototype.decl=function(){return this.d[0]};
ph_var_decl.prototype.nblock_val=function(){return this.d[0]+"="+this.d[1].nb()+";";


};
ph_var_decl.prototype.val=function(){return "__oni_rt.Sc("+this.line+",function(_oniX){return "+this.d[0]+"=_oniX;},"+this.d[1].v()+")";




};

function ph_if(t,c,a,pctx){this.t=t;

this.c=c;
this.a=a;
this.line=t.line;
this.file=pctx.fn;

this.is_nblock=pctx.full_nblock&&t.is_nblock&&c.is_nblock&&(!a||a.is_nblock);

}
ph_if.prototype=new ph();
ph_if.prototype.nblock_val=function(){var rv="if("+this.t.nb()+"){"+this.c.nb()+"}";

if(this.a)rv+="else{"+this.a.nb()+"}";

return rv;
};

ph_if.prototype.val=function(){var rv;

var c=this.c.v();
if(this.t.is_nblock){

rv="__oni_rt.Nb(function(){if("+this.t.nb()+")return __oni_rt.ex("+c+",this);";

if(this.a)rv+="else return __oni_rt.ex("+this.a.v()+",this);";

return rv+"},"+this.line+")";
}else{


rv="__oni_rt.If("+this.t.v()+","+c;
if(this.a)rv+=","+this.a.v();

return rv+")";
}
};



function ph_try(block,crf,pctx){this.block=block;

this.crf=crf;
this.file=pctx.fn;
}
ph_try.prototype=new ph();
ph_try.prototype.nblock_val=function(){var rv="try{"+this.block.nb()+"}";


if(this.crf[0]){
if(this.crf[0][2])throw "catchall statement not allowed in __js block";
rv+="catch("+this.crf[0][0]+"){"+this.crf[0][1].nb()+"}";
}
if(this.crf[1])throw "retract statement not allowed in __js block";
if(this.crf[2])rv+="finally{"+this.crf[2].nb()+"}";

return rv;
};
ph_try.prototype.val=function(){var tb=this.block.v();

var rv="__oni_rt.Try("+((this.crf[0]&&this.crf[0][2])?1:0);
rv+=","+tb;
if(this.crf[0]){
var cb=this.crf[0][1].v();
rv+=",function(__oni_env,"+this.crf[0][0]+"){";
if(cb.length)rv+="return __oni_rt.ex("+cb+",__oni_env)";

rv+="}";
}else rv+=",0";



if(this.crf[2]){
var fb=this.crf[2].v();
rv+=","+fb;
}else rv+=",0";



if(this.crf[1]){
var rb=this.crf[1].v();
rv+=","+rb;
}
return rv+")";
};

var ph_empty_stmt=new ph();
ph_empty_stmt.is_nblock=true;
ph_empty_stmt.nblock_val=function(){return ';'};
ph_empty_stmt.v=function(){return '0'};

function ph_throw(exp,pctx){this.exp=exp;

this.line=exp.line;
this.file=pctx.fn;
this.is_nblock=pctx.full_nblock&&exp.is_nblock;
}
ph_throw.prototype=new ph();
ph_throw.prototype.nblock_val=function(){return "throw "+this.exp.nb()+";";

};
ph_throw.prototype.val=function(){return "__oni_rt.Sc("+this.line+",__oni_rt.Throw,"+this.exp.v()+","+this.line+",'"+this.file+"')";



};



function ph_return(exp,pctx){this.line=pctx.line;

this.exp=exp;

this.js_ctx=pctx.js_ctx;
this.is_nblock=pctx.allow_nblock&&(exp?exp.is_nblock:true);
}
ph_return.prototype=new ph();
ph_return.prototype.nblock_val=function(){var rv;

if(this.js_ctx){

rv="return";
if(this.exp)rv+=" "+this.exp.nb();
rv+=";";
}else{


rv="return __oni_rt.CFER(this";
if(this.exp)rv+=","+this.exp.nb();
rv+=");";
}
return rv;
};
ph_return.prototype.val=function(){var v=this.exp?","+this.exp.v():"";

return "__oni_rt.Sc("+this.line+",__oni_rt.Return"+v+")";
};


function ph_collapse(pctx){this.line=pctx.line;

}
ph_collapse.prototype=new ph();
ph_collapse.prototype.val=function(){return "__oni_rt.Collapse("+this.line+")";

};




function ph_cfe(f,lbl){this.f=f;

this.lbl=lbl;
}
ph_cfe.prototype=new ph();
ph_cfe.prototype.nblock_val=function(){var rv=(this.f=="b"?"break":"continue");



if(this.lbl)rv+=" "+this.lbl;
return rv+";";
};
ph_cfe.prototype.val=function(){var l=this.lbl?'"'+this.lbl+'"':"";

var rv='__oni_rt.Cfe("'+this.f+'"';
if(this.lbl)rv+=',"'+this.lbl+'"';

return rv+")";
};


function gen_for(init_exp,decls,test_exp,inc_exp,body,pctx){var rv;

if(init_exp||decls){
if(decls)rv=gen_var_compound(decls,pctx);else rv=new ph_compound_stmt(pctx);



if(init_exp)rv.stmts.push(new ph_exp_stmt(init_exp,pctx));

rv.stmts.push(new ph_loop(0,test_exp,body,inc_exp));

rv=rv.toBlock();
}else rv=new ph_loop(0,test_exp,body,inc_exp);


return rv;
}




function ph_loop(init_state,test_exp,body,inc_exp){this.init_state=init_state;

this.test_exp=test_exp;
this.inc_exp=inc_exp;
this.body=body;
}
ph_loop.prototype=new ph();
ph_loop.prototype.nblock_val=function(){if(this.init_state==2){



return "do{"+this.body.nb()+"}while("+this.test_exp.nb()+");";
}else if(this.test_exp&&this.inc_exp){

return "for(;"+this.test_exp.nb()+";"+this.inc_exp.nb()+"){"+this.body.nb()+"}";

}else if(this.test_exp){


return "while("+this.test_exp.nb()+"){"+this.body.nb()+"}";
}else throw "Can't encode this loop as __js yet";

};
ph_loop.prototype.val=function(){var test=this.test_exp?this.test_exp.v():"1";


var body=this.body.v(true);
return "__oni_rt.Loop("+this.init_state+","+test+","+(this.inc_exp?this.inc_exp.v():"0")+","+body+")";

};



function gen_for_in(lhs_exp,decl,obj_exp,body,pctx){var rv;

if(decl){
rv=gen_var_compound([decl],pctx);
rv.stmts.push(new ph_for_in(new ph_identifier(decl[0],pctx),obj_exp,body,pctx));


rv=rv.toBlock();
}else rv=new ph_for_in(lhs_exp,obj_exp,body,pctx);


return rv;
}

function ph_for_in(lhs,obj,body,pctx){this.lhs=lhs;

this.obj=obj;
this.body=body;
this.pctx=pctx;
}
ph_for_in.prototype=new ph();
ph_for_in.prototype.nblock_val=function(){return "for("+this.lhs.nb()+" in "+this.obj.nb()+"){"+this.body.nb()+"}";


};
ph_for_in.prototype.val=function(){var rv="__oni_rt.ForIn("+this.obj.v();

rv+=",function(__oni_env, _oniY) { return __oni_rt.ex(__oni_rt.Seq("+0+",";

rv+=(new ph_assign_op(this.lhs,"=",new ph_identifier("_oniY",this.pctx),this.pctx)).v();


if(this.body)rv+=","+this.body.v();

return rv+"), __oni_env)})";
};

function ph_with(exp,body,pctx){this.exp=exp;

this.body=body;
this.line=this.exp.line;
this.file=pctx.fn;
this.is_nblock=pctx.allow_nblock&&exp.is_nblock&&body.is_nblock;
}
ph_with.prototype=new ph();
ph_with.prototype.nblock_val=function(){return "with("+this.exp.nb()+")"+this.body.nb()};
ph_with.prototype.val=function(){var rv="__oni_rt.Sc("+this.line+",__oni_rt.With,"+this.exp.v()+",function(__oni_env,__oni_z){with(__oni_z) return __oni_rt.ex("+this.body.v()+",__oni_env)})";





return rv;
};





function ph_literal(value,pctx,type){this.value=value;

this.line=pctx.line;
}
ph_literal.prototype=new ph();
ph_literal.prototype.is_nblock=true;

ph_literal.prototype.v=function(){return this.value};
ph_literal.prototype.nblock_val=function(){return this.value};
ph_literal.prototype.destruct=function(){if(this.value!="")throw "invalid pattern";return ""};

function ph_infix_op(left,id,right,pctx){this.left=left;


this.id=id;
this.right=right;
this.line=pctx.line;
this.is_nblock=pctx.allow_nblock&&left.is_nblock&&right.is_nblock;
}
ph_infix_op.prototype=new ph();
ph_infix_op.prototype.is_value=true;
ph_infix_op.prototype.nblock_val=function(){return this.left.nb()+" "+this.id+" "+this.right.nb();

};
ph_infix_op.prototype.val=function(){if(this.is_nblock){



return nblock_val_to_val(this.nb(),true,this.line);
}else if(this.id=="||"){


return "__oni_rt.Seq("+2+","+this.left.v()+","+this.right.v()+")";
}else if(this.id=="&&"){


return "__oni_rt.Seq("+4+","+this.left.v()+","+this.right.v()+")";
}else return "__oni_rt.Sc("+this.line+",__oni_rt.infix['"+this.id+"'],"+this.left.v()+","+this.right.v()+")";


};


function ph_interpolating_str(parts,pctx){this.is_nblock=pctx.allow_nblock;

this.line=pctx.line;
this.parts=parts;
for(var i=0,l=parts.length;i<l;++i){
if(Array.isArray(parts[i])&&!parts[i][0].is_nblock){
this.is_nblock=false;
break;
}
}
}
ph_interpolating_str.prototype=new ph();
ph_interpolating_str.prototype.is_value=true;
ph_interpolating_str.prototype.nblock_val=function(){for(var i=0,l=this.parts.length;i<l;++i){

var p=this.parts[i];
if(Array.isArray(p)){
this.parts[i]="("+p[0].nb()+")";
}else{

this.parts[i]='"'+p+'"';
}
}
return '('+this.parts.join('+')+')';
};
ph_interpolating_str.prototype.val=function(){if(this.is_nblock)return nblock_val_to_val(this.nb(),true,this.line);

for(var i=0,l=this.parts.length;i<l;++i){
var p=this.parts[i];
if(Array.isArray(p)){
this.parts[i]=p[0].v();
}else{

this.parts[i]='"'+p+'"';
}
}
return '__oni_rt.Sc('+this.line+',__oni_rt.sum,'+this.parts.join(',')+')';
};


function ph_assign_op(left,id,right,pctx){if(!left.is_ref&&!left.is_id){


this.dest=true;
if(id!="=")throw "Invalid operator in destructuring assignment";
}
this.left=left;
this.id=id;
this.right=right;
this.line=pctx.line;
this.is_nblock=pctx.allow_nblock&&left.is_nblock&&right.is_nblock&&!this.dest;

}
ph_assign_op.prototype=new ph();
ph_assign_op.prototype.is_value=true;
ph_assign_op.prototype.nblock_val=function(){return this.left.nb()+this.id+this.right.nb();

};
ph_assign_op.prototype.val=function(){var rv;

if(this.is_nblock){
rv=nblock_val_to_val(this.nb(),true,this.line);
}else if(this.dest){

rv="__oni_rt.Sc("+this.line+",function(_oniX";
try{
var drefs=[],body=this.left.destruct("_oniX",drefs);
for(var i=1;i<=drefs.length;++i)rv+=",_oniX"+i;

rv+="){"+body+"},"+this.right.v();
for(var i=0;i<drefs.length;++i)rv+=","+drefs[i];

rv+=")";
}catch(e){

throw {mes:"Invalid left side in destructuring assignment ",line:this.line};

}
}else if(!this.left.is_ref||this.left.is_nblock){




rv="__oni_rt.Sc("+this.line+",function(_oniX){return "+this.left.nb()+this.id+"_oniX;},"+this.right.v()+")";


}else{


rv="__oni_rt.Sc("+this.line+",function(l, r){return l[0][l[1]]"+this.id+"r;},"+this.left.ref()+","+this.right.v()+")";

}
return rv;
};

function ph_prefix_op(id,right,pctx){this.id=id;

this.right=right;
this.line=pctx.line;
this.is_nblock=(pctx.allow_nblock&&right.is_nblock)&&id!="spawn";
}
ph_prefix_op.prototype=new ph();
ph_prefix_op.prototype.is_value=true;
ph_prefix_op.prototype.nblock_val=function(){return this.id+" "+this.right.nb();

};
ph_prefix_op.prototype.val=function(){var rv;

if(this.id=="spawn")rv="__oni_rt.Spawn("+this.line+","+this.right.v()+")";else if(this.right.is_nblock){





rv=nblock_val_to_val(this.nb(),true,this.line);
}else if(this.right.is_ref){
rv="__oni_rt.Sc("+this.line+",function(r){return "+this.id+" r[0][r[1]]},"+this.right.ref()+")";

}else{


rv="__oni_rt.Sc("+this.line+",function(r){return "+this.id+" r},"+this.right.v()+")";

}
return rv;
};

function ph_postfix_op(left,id,pctx){if(!left.is_ref&&!left.is_id)throw "Invalid argument for postfix op '"+id+"'";

this.left=left;
this.id=id;
this.line=pctx.line;
this.is_nblock=pctx.allow_nblock&&left.is_nblock;
}
ph_postfix_op.prototype=new ph();
ph_postfix_op.prototype.is_value=true;
ph_postfix_op.prototype.nblock_val=function(){return this.left.nb()+this.id+" "};
ph_postfix_op.prototype.val=function(){var rv;

if(this.left.is_nblock){

rv=nblock_val_to_val(this.nb(),true,this.line);
}else if(this.left.is_ref){

rv="__oni_rt.Sc("+this.line+",function(l){return l[0][l[1]]"+this.id+"},"+this.left.ref()+")";

}
return rv;
};

function gen_identifier(value,pctx){if(value=="hold"){




var rv=new ph_literal('__oni_rt.Hold',pctx);
rv.is_id=true;
return rv;
}else if(value=="arguments"){

return new ph_envobj('arguments','aobj',pctx);
}


return new ph_identifier(value,pctx);
}

function ph_identifier(value,pctx){this.value=value;

this.line=pctx.line;
}
ph_identifier.prototype=new ph();
ph_identifier.prototype.is_nblock=true;
ph_identifier.prototype.is_id=true;
ph_identifier.prototype.is_value=true;
ph_identifier.prototype.nblock_val=function(){return this.value};
ph_identifier.prototype.destruct=function(dpath){return this.value+"="+dpath+";";

};

function ph_envobj(name,ename,pctx){this.js_ctx=pctx.js_ctx;

this.line=pctx.line;
this.name=name;
this.ename=ename;
}
ph_envobj.prototype=new ph();
ph_envobj.prototype.is_nblock=true;
ph_envobj.prototype.is_id=true;
ph_envobj.prototype.is_value=true;
ph_envobj.prototype.nblock_val=function(){if(this.js_ctx)return this.name;else return "this."+this.ename;




};





function is_nblock_arr(arr){for(var i=0;i<arr.length;++i)if(!arr[i].is_nblock)return false;


return true;
}

function ph_fun_call(l,args,pctx){this.l=l;

this.args=args;
this.nblock_form=l.is_nblock&&is_nblock_arr(args);
this.line=pctx.line;
}
ph_fun_call.prototype=new ph();
ph_fun_call.prototype.is_value=true;
ph_fun_call.prototype.nblock_val=function(){var rv=this.l.nb()+"(";



for(var i=0;i<this.args.length;++i){
if(i)rv+=",";
rv+=this.args[i].nb();
}
return rv+")";
};
ph_fun_call.prototype.val=function(){var rv;

if(this.nblock_form){
rv=this.l.nb()+"(";
for(var i=0;i<this.args.length;++i){
if(i)rv+=",";
rv+=this.args[i].nb();
}
return nblock_val_to_val(rv+")",true,this.line);
}else if(this.l.is_ref){

rv="__oni_rt.Fcall(1,"+this.line+","+this.l.ref();
}else{



rv="__oni_rt.Fcall(0,"+this.line+","+this.l.v();
}
for(var i=0;i<this.args.length;++i){
rv+=","+this.args[i].v();
}
rv+=")";
return rv;
};

function ph_dot_accessor(l,name,pctx){this.l=l;

this.name=name;
this.line=pctx.line;
this.is_nblock=pctx.allow_nblock&&l.is_nblock;
}
ph_dot_accessor.prototype=new ph();
ph_dot_accessor.prototype.is_ref=true;
ph_dot_accessor.prototype.is_value=true;
ph_dot_accessor.prototype.nblock_val=function(){return this.l.nb()+"."+this.name};
ph_dot_accessor.prototype.val=function(){return "__oni_rt.Sc("+this.line+",function(l){return l."+this.name+";},"+this.l.v()+")";


};
ph_dot_accessor.prototype.ref=function(){return "__oni_rt.Sc("+this.line+",function(l){return [l,'"+this.name+"'];},"+this.l.v()+")";



};
ph_dot_accessor.prototype.destruct=function(dpath,drefs){drefs.push(this.ref());

var v="_oniX"+drefs.length;
return v+"[0]["+v+"[1]]="+dpath+";";
};

function ph_idx_accessor(l,idxexp,pctx){this.l=l;

this.idxexp=idxexp;
this.line=pctx.line;

this.is_nblock=pctx.allow_nblock&&l.is_nblock&&idxexp.is_nblock;
}
ph_idx_accessor.prototype=new ph();
ph_idx_accessor.prototype.is_ref=true;
ph_idx_accessor.prototype.is_value=true;
ph_idx_accessor.prototype.nblock_val=function(){return this.l.nb()+"["+this.idxexp.nb()+"]";

};
ph_idx_accessor.prototype.val=function(){return "__oni_rt.Sc("+this.line+",function(l, idx){return l[idx];},"+this.l.v()+","+this.idxexp.v()+")";


};
ph_idx_accessor.prototype.ref=function(){if(this.is_nblock)return "__oni_rt.Nb(function(){return ["+this.l.nb()+","+this.idxexp.nb()+"]},"+this.line+")";else return "__oni_rt.Sc("+this.line+",function(l, idx){return [l, idx];},"+this.l.v()+","+this.idxexp.v()+")";






};


function ph_group(e,pctx){this.e=e;

this.is_nblock=pctx.allow_nblock&&e.is_nblock;
}
ph_group.prototype=new ph();
ph_group.prototype.is_value=true;
ph_group.prototype.nblock_val=function(){return "("+this.e.nb()+")"};
ph_group.prototype.v=function(accept_list){return this.e.v(accept_list)};
ph_group.prototype.destruct=function(dpath,drefs){return this.e.destruct(dpath,drefs)};

function ph_arr_lit(elements,pctx){this.elements=elements;

this.line=pctx.line;
this.is_nblock=pctx.allow_nblock&&is_nblock_arr(elements);

}
ph_arr_lit.prototype=new ph();
ph_arr_lit.prototype.is_value=true;
ph_arr_lit.prototype.nblock_val=function(){var rv="[";

for(var i=0;i<this.elements.length;++i){
if(i)rv+=",";
rv+=this.elements[i].nb();
}
return rv+"]";
};
ph_arr_lit.prototype.val=function(){var rv="__oni_rt.Sc("+this.line+",__oni_rt.Arr";

for(var i=0;i<this.elements.length;++i){
rv+=","+this.elements[i].v();
}
return rv+")";
};
ph_arr_lit.prototype.destruct=function(dpath,drefs){var rv="";

for(var i=0;i<this.elements.length;++i){
rv+=this.elements[i].destruct(dpath+"["+i+"]",drefs);
}
return rv;
};


function ph_obj_lit(props,pctx){this.props=props;

this.line=pctx.line;
this.is_nblock=pctx.allow_nblock&&(function(){for(var i=0;i<props.length;++i){


if(!props[i][2].is_nblock)return false;
}
return true;
})();


}
ph_obj_lit.prototype=new ph();
ph_obj_lit.prototype.is_value=true;
ph_obj_lit.prototype.nblock_val=function(){var rv="{";

for(var i=0;i<this.props.length;++i){
if(i!=0)rv+=",";



rv+=this.props[i][1]+":"+this.props[i][2].nb();
}
return rv+"}";
};

function quotedName(name){if(name.charAt(0)=="'"||name.charAt(0)=='"')return name;


return '"'+name+'"';
}

ph_obj_lit.prototype.val=function(){var rv="__oni_rt.Sc("+this.line+",__oni_rt.Obj, [";




for(var i=0;i<this.props.length;++i){
if(i)rv+=",";
if(this.props[i][0]=="pat")throw {mes:"Missing initializer for object property "+quotedName(this.props[i][1]),line:this.props[i][2]};


rv+=quotedName(this.props[i][1]);
}
rv+="]";
for(var i=0;i<this.props.length;++i){
rv+=","+this.props[i][2].v();
}
return rv+")";
};
ph_obj_lit.prototype.destruct=function(dpath,drefs){var rv="";

for(var i=0;i<this.props.length;++i){
var p=this.props[i];
if(p[0]=="pat"){
if(p[1].charAt(0)=="'"||p[1].charAt(0)=='"'){




throw "invalid syntax";
}
rv+=p[1]+"="+dpath+"."+p[1]+";";
}else rv+=p[2].destruct(dpath+"["+quotedName(p[1])+"]",drefs);


}
return rv;
};


function ph_conditional(t,c,a,pctx){this.t=t;

this.c=c;
this.a=a;
this.line=t.line;
this.is_nblock=pctx.allow_nblock&&t.is_nblock&&c.is_nblock&&a.is_nblock;
}
ph_conditional.prototype=new ph();
ph_conditional.prototype.is_value=true;
ph_conditional.prototype.nblock_val=function(){return this.t.nb()+"?"+this.c.nb()+":"+this.a.nb();

};
ph_conditional.prototype.val=function(){return "__oni_rt.If("+this.t.v()+","+this.c.v()+","+this.a.v()+")";

};

function ph_new(exp,args){this.exp=exp;

this.args=args;
this.line=exp.line;
}
ph_new.prototype=new ph();
ph_new.prototype.is_value=true;
ph_new.prototype.nblock_val=function(){var rv="new "+this.exp.nb()+"(";


for(var i=0;i<this.args.length;++i){
if(i)rv+=",";
rv+=this.args[i].nb();
}
return rv+")";
};

ph_new.prototype.val=function(){var rv="__oni_rt.Fcall(2,"+this.line+","+this.exp.v();

for(var i=0;i<this.args.length;++i){
rv+=","+this.args[i].v();
}
rv+=")";
return rv;
};









function gen_waitfor_andor(op,blocks,crf,pctx){if(crf[0]||crf[1]||crf[2])return new ph_try(new ph_par_alt(op,blocks),crf,pctx);else return new ph_par_alt(op,blocks);




}

function ph_par_alt(op,blocks){this.op=op;

this.blocks=blocks;
}
ph_par_alt.prototype=new ph();
ph_par_alt.prototype.is_nblock=false;
ph_par_alt.prototype.val=function(){var rv="__oni_rt.";

if(this.op=="and")rv+="Par(";else rv+="Alt(";



for(var i=0;i<this.blocks.length;++i){
var b=this.blocks[i].v();
if(i)rv+=",";
rv+=b;
}
return rv+")";
};

function gen_suspend(has_var,decls,block,crf,pctx){var rv;

if(has_var){
rv=gen_var_compound(decls,pctx);
rv.stmts.push(gen_suspend_inner(decls,block,crf,pctx));

rv=rv.toBlock();
}else rv=gen_suspend_inner(decls,block,crf,pctx);


return rv;
}

function gen_suspend_inner(decls,block,crf,pctx){var wrapped=(crf[0]||crf[1]||crf[2]);



var rv=new ph_suspend(decls,block,wrapped,pctx);
if(wrapped)rv=new ph_suspend_wrapper((new ph_try(rv,crf,pctx)).v(),pctx);

return rv;
}

function ph_suspend(decls,block,wrapped,pctx){this.decls=decls;

this.block=block;
this.wrapped=wrapped;
this.file=pctx.fn;
}
ph_suspend.prototype=new ph();
ph_suspend.prototype.val=function(){var rv="__oni_rt.Suspend(function(__oni_env,";

if(this.wrapped)rv+="_oniX){resume=_oniX;";else rv+="resume){";



var b=this.block.v();
if(b.length)rv+="return __oni_rt.ex("+b+",__oni_env)";

rv+="}, function() {";
for(var i=0;i<this.decls.length;++i){
var name=this.decls[i][0];
if(name=="arguments")throw "Cannot use 'arguments' as variable name in waitfor()";
rv+=name+"=arguments["+i+"];";
}
rv+="})";
return rv;
};


function ph_suspend_wrapper(code,pctx){this.code=code;

this.line=pctx.line;
this.file=pctx.fn;
}
ph_suspend_wrapper.prototype=new ph();
ph_suspend_wrapper.prototype.val=function(){return "__oni_rt.Nb(function(){var resume;"+"return __oni_rt.ex("+this.code+",this)},"+this.line+")";


};



function gen_using(has_var,lhs,exp,body,pctx){var rv;

if(has_var){

if(!lhs.is_id)throw "Variable name expected in 'using' expression";
rv=gen_var_compound([[lhs.nb()]],pctx);
rv.stmts.push(new ph_using(lhs,exp,body,pctx));
rv=rv.toBlock();
}else rv=new ph_using(lhs,exp,body,pctx);


return rv;
}

function ph_using(lhs,exp,body,pctx){this.line=pctx.line;

this.body=body;
this.assign1=new ph_assign_op(new ph_identifier("_oniW",pctx),"=",exp,pctx);

if(lhs)this.assign2=new ph_assign_op(lhs,"=",new ph_identifier("_oniW",pctx),pctx);


}

ph_using.prototype=new ph();
ph_using.prototype.val=function(){var rv="__oni_rt.Nb(function(){var _oniW;"+"return __oni_rt.ex(__oni_rt.Seq("+0+","+this.assign1.v()+",";



if(this.assign2)rv+=this.assign2.v()+",";

rv+="__oni_rt.Try("+0+","+this.body.v()+",0,"+"__oni_rt.Nb(function(){if(_oniW&&_oniW.__finally__)return _oniW.__finally__()},"+this.line+"),0)),this)},"+this.line+")";

return rv;
};







function ph_blocklambda(pars,body,pctx){this.code="__oni_rt.Bl(function("+pars.join(",")+"){"+body+"})";

}
ph_blocklambda.prototype=new ph();
ph_blocklambda.prototype.val=function(){return this.code};



function ph_lbl_stmt(lbl,stmt){this.lbl=lbl;

this.stmt=stmt;
}
ph_lbl_stmt.prototype=new ph();
ph_lbl_stmt.prototype.nblock_val=function(){return this.lbl+": "+this.stmt.nb();


};
ph_lbl_stmt.prototype.val=function(){throw "labeled statements not implemented yet";


};








function Hash(){}
Hash.prototype={lookup:function(key){
return this["$"+key]},put:function(key,val){
this["$"+key]=val},del:function(key){
delete this["$"+key]}};






















var TOKENIZER_SA=/(?:[ \f\r\t\v\u00A0\u2028\u2029]+|\/\/.*|#!.*)*(?:((?:\n|\/\*(?:.|\n|\r)*?\*\/)+)|((?:0[xX][\da-fA-F]+)|(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?))|(\/(?:\\.|\[(?:\\.|[^\n\]])*\]|[^\/\n])+\/[gimy]*)|(==|!=|>>|<<|<=|>=|--|\+\+|\|\||&&|[-*\/%+&^|]=|[;,?:|^&=<>+\-*\/%!~.\[\]{}()\"]|[$_\w]+)|('(?:\\.|[^\\\'\n])*')|('(?:\\(?:.|\n|\r)|[^\\\'])*')|(\S+))/g;



var TOKENIZER_OP=/(?:[ \f\r\t\v\u00A0\u2028\u2029]+|\/\/.*|#!.*)*(?:((?:\n|\/\*(?:.|\n|\r)*?\*\/)+)|(>>>=|===|!==|>>>|<<=|>>=|==|!=|>>|<<|<=|>=|--|\+\+|\|\||&&|[-*\/%+&^|]=|[;,?:|^&=<>+\-*\/%!~.\[\]{}()\"]|[$_\w]+))/g;



var TOKENIZER_IS=/((?:\\.|\#(?!\{)|[^#\\\"\n])+)|(\\\n)|(\n)|(\"|\#\{)/g;




function SemanticToken(){}
SemanticToken.prototype={exsf:function(pctx,st){




throw "Unexpected "+this},excbp:0,excf:function(left,pctx,st){




throw "Unexpected "+this},stmtf:null,tokenizer:TOKENIZER_SA,toString:function(){









return "'"+this.id+"'"},exs:function(f){




this.exsf=f;

return this;
},exc:function(bp,f){
this.excbp=bp;

if(f)this.excf=f;
return this;
},stmt:function(f){
this.stmtf=f;

return this;
},ifx:function(bp,right_assoc){


this.excbp=bp;

if(right_assoc)bp-=.5;
this.excf=function(left,pctx,st){var right=parseExp(pctx,bp,st);


return new ph_infix_op(left,this.id,right,pctx);
};
return this;
},asg:function(bp,right_assoc){

this.excbp=bp;

if(right_assoc)bp-=.5;
this.excf=function(left,pctx,st){var right=parseExp(pctx,bp,st);


return new ph_assign_op(left,this.id,right,pctx);
};
return this;
},pre:function(bp){

return this.exs(function(pctx,st){
var right=parseExp(pctx,bp,st);


return new ph_prefix_op(this.id,right,pctx);
});
},pst:function(bp){

return this.exc(bp,function(left,pctx,st){
return new ph_postfix_op(left,this.id,pctx);


});
}};



function Literal(type,value){this.id=type;

this.value=value;
}
Literal.prototype=new SemanticToken();
Literal.prototype.tokenizer=TOKENIZER_OP;
Literal.prototype.toString=function(){return "literal '"+this.value+"'"};
Literal.prototype.exsf=function(pctx,st){return new ph_literal(this.value,pctx,this.id);


};


function Identifier(value){this.value=value;

}
Identifier.prototype=new Literal("<id>");
Identifier.prototype.exsf=function(pctx,st){return gen_identifier(this.value,pctx);


};
Identifier.prototype.toString=function(){return "identifier '"+this.value+"'"};



var ST=new Hash();
function S(id,tokenizer){var t=new SemanticToken();

t.id=id;
if(tokenizer)t.tokenizer=tokenizer;

ST.put(id,t);
return t;
}




S("[").exs(function(pctx,st){

var elements=[];

while(pctx.token.id!="]"){
if(elements.length)scan(pctx,",");
if(pctx.token.id==","){
elements.push((function(pctx){return new ph_literal("",pctx)})(pctx));
}else if(pctx.token.id=="]")break;else elements.push(parseExp(pctx,110));




}
scan(pctx,"]");

return new ph_arr_lit(elements,pctx);
}).exc(270,function(l,pctx,st){

var idxexp=parseExp(pctx);

scan(pctx,"]");

return new ph_idx_accessor(l,idxexp,pctx);
});

S(".").exc(270,function(l,pctx,st){if(pctx.token.id!="<id>")throw "Expected an identifier, found '"+pctx.token+"' instead";


var name=pctx.token.value;
scan(pctx);

return new ph_dot_accessor(l,name,pctx);
});

S("new").exs(function(pctx,st){var exp=parseExp(pctx,110,"(");

var args=[];
if(pctx.token.id=="("){
scan(pctx);
while(pctx.token.id!=")"){
if(args.length)scan(pctx,",");
args.push(parseExp(pctx,110));
}
scan(pctx,")");
}

return new ph_new(exp,args);
});

S("(").exs(function(pctx,st){

var e=parseExp(pctx);

scan(pctx,")");

return new ph_group(e,pctx);
}).exc(260,function(l,pctx,st){

var args=[];

while(pctx.token.id!=")"){
if(args.length)scan(pctx,",");
args.push(parseExp(pctx,110));
}
scan(pctx,")");


if(pctx.token.id=='{'){

TOKENIZER_SA.lastIndex=pctx.lastIndex;
while(1){
var matches=TOKENIZER_SA.exec(pctx.src);
if(matches&&(matches[4]=='|'||matches[4]=='||')){



args.push(parseBlockLambda(scan(pctx).id,pctx));
}else if(matches&&matches[1]){

continue;
}
break;
}
}


return new ph_fun_call(l,args,pctx);
});

S("++").pre(240).pst(250).asi_restricted=true;
S("--").pre(240).pst(250).asi_restricted=true;

S("delete").pre(240);
S("void").pre(240);
S("typeof").pre(240);
S("+").pre(240).ifx(220);
S("-").pre(240).ifx(220);
S("~").pre(240);
S("!").pre(240);

S("*").ifx(230);
S("/").ifx(230);
S("%").ifx(230);



S("<<").ifx(210);
S(">>").ifx(210);
S(">>>").ifx(210);

S("<").ifx(200);
S(">").ifx(200);
S("<=").ifx(200);
S(">=").ifx(200);
S("instanceof").ifx(200);

S("in").ifx(200);

S("==").ifx(190);
S("!=").ifx(190);
S("===").ifx(190);
S("!==").ifx(190);

S("&").ifx(180);
S("^").ifx(170);
S("|").ifx(160);
S("&&").ifx(150);
S("||").ifx(140);

S("?").exc(130,function(test,pctx,st){var consequent=parseExp(pctx,110);

scan(pctx,":");
var alternative=parseExp(pctx,110);

return new ph_conditional(test,consequent,alternative,pctx);
});

S("=").asg(120,true);
S("*=").asg(120,true);
S("/=").asg(120,true);
S("%=").asg(120,true);
S("+=").asg(120,true);
S("-=").asg(120,true);
S("<<=").asg(120,true);
S(">>=").asg(120,true);
S(">>>=").asg(120,true);
S("&=").asg(120,true);
S("^=").asg(120,true);
S("|=").asg(120,true);

S("spawn").pre(115);

S(",").ifx(110,true);


function parsePropertyName(token,pctx){var id=token.id;

if(id=="<id>"||id=="<string>"||id=="<number>")return token.value;

if(id=='"'){
if((token=scan(pctx)).id!="<string>"||scan(pctx,undefined,TOKENIZER_IS).id!='istr-"')throw "Non-literal strings can't be used as propery names ("+token+")";


return '"'+token.value+'"';
}
throw "Invalid object literal syntax; property name expected, but saw "+token;
}

function parseBlock(pctx){push_stmt_scope(pctx);


while(pctx.token.id!="}"){
var stmt=parseStmt(pctx);

add_stmt(stmt,pctx);
}
scan(pctx,"}");

return pop_block(pctx);
}

function parseBlockLambdaBody(pctx){push_decl_scope(pctx,true);

push_stmt_scope(pctx);
while(pctx.token.id!="}"){
var stmt=parseStmt(pctx);

add_stmt(stmt,pctx);;
}
scan(pctx,"}");

var decls=pctx.decl_scopes.pop();return collect_decls(decls)+pop_stmt_scope(pctx,"return __oni_rt.exbl(this,["+0,"])");
}
function parseBlockLambda(start,pctx){var token=scan(pctx);

var pars=[];

if(start=="|"){
while(token.id!="|"){
if(pars.length)token=scan(pctx,",");

if(token.id!="<id>")throw "Expected parameter name but found '"+token+"'";

pars.push(token.value);
token=scan(pctx);
}
scan(pctx,"|");
}
var body=parseBlockLambdaBody(pctx);

return new ph_blocklambda(pars,body,pctx);
}

S("{").exs(function(pctx,st){
var start=pctx.token.id;

if(start=="|"||start=="||"){

return parseBlockLambda(start,pctx);
}else{


var props=[];
while(pctx.token.id!="}"){
if(props.length)scan(pctx,",");
var prop=pctx.token;
if(prop.id=="}")break;

prop=parsePropertyName(prop,pctx);
scan(pctx);
if(pctx.token.id==":"){

scan(pctx);
var exp=parseExp(pctx,110);
props.push(["prop",prop,exp]);
}else if(pctx.token.id=="("){

props.push(["method",prop,parseMethod(pctx)]);
}else if(pctx.token.id=="}"||pctx.token.id==","){

props.push(["pat",prop,pctx.line]);
}else throw "Unexpected token '"+pctx.token+"'";


}
scan(pctx,"}",TOKENIZER_OP);

return new ph_obj_lit(props,pctx);
}
}).exc(260,function(l,pctx,st){

var start=pctx.token.id;

if(start!="|"&&start!="||")throw "Unexpected token '"+pctx.token+"' - was expecting '|' or '||'";

var args=[parseBlockLambda(start,pctx)];

return new ph_fun_call(l,args,pctx);;
}).stmt(parseBlock);




S(";").stmt(function(pctx){return ph_empty_stmt});
S(")",TOKENIZER_OP);
S("]",TOKENIZER_OP);
S("}");
S(":");

S("<eof>").exs(function(pctx,st){
throw "Unexpected end of input (exs)"}).stmt(function(pctx){
throw "Unexpected end of input (stmt)"});




function parseFunctionBody(pctx,implicit_return){push_decl_scope(pctx);

push_stmt_scope(pctx);
scan(pctx,"{");
while(pctx.token.id!="}"){
var stmt=parseStmt(pctx);

add_stmt(stmt,pctx);
}
scan(pctx,"}");

var decls=pctx.decl_scopes.pop();var flags=1;if(decls.notail)flags+=8;if(implicit_return)flags+=32;return collect_decls(decls)+pop_stmt_scope(pctx,"return __oni_rt.exseq(arguments,this,'"+pctx.fn+"',["+flags,"])");
}



function parseFunctionInner(pctx,pars,implicit_return){var token=scan(pctx,"(");

while(token.id!=")"){
if(pars.length)token=scan(pctx,",");

if(token.id!="<id>")throw "Expected parameter name but found '"+token+"'";

pars.push(token.value);
token=scan(pctx);
}
scan(pctx,")");
return parseFunctionBody(pctx,implicit_return);
}


function parseMethod(pctx){var pars=[];

var body=parseFunctionInner(pctx,pars,true);

return new ph_fun_exp("",pars,body,pctx,true);
}

S("function").exs(function(pctx,st){

var fname="";

if(pctx.token.id=="<id>"){
fname=pctx.token.value;
scan(pctx);
}
var pars=[];
var body=parseFunctionInner(pctx,pars);

return new ph_fun_exp(fname,pars,body,pctx,false);
}).stmt(function(pctx){

if(pctx.token.id!="<id>")throw "Malformed function declaration";

var fname=pctx.token.value;
scan(pctx);
var pars=[];
var body=parseFunctionInner(pctx,pars);

return gen_fun_decl(fname,pars,body,pctx);
});

S("this",TOKENIZER_OP).exs(function(pctx,st){return new ph_envobj('this','tobj',pctx)});
S("true",TOKENIZER_OP).exs(function(pctx,st){return new ph_literal('true',pctx)});
S("false",TOKENIZER_OP).exs(function(pctx,st){return new ph_literal('false',pctx)});
S("null",TOKENIZER_OP).exs(function(pctx,st){return new ph_literal('null',pctx)});

S("collapse",TOKENIZER_OP).exs(function(pctx,st){return new ph_collapse(pctx)});

S('"',TOKENIZER_IS).exs(function(pctx,st){var parts=[],last=-1;

while(pctx.token.id!='istr-"'){
switch(pctx.token.id){case "<string>":





if(last!=-1&&typeof parts[last]=='string'){
parts[last]+=pctx.token.value;
}else{

parts.push(pctx.token.value);
++last;
}
break;
case 'istr-#{':
scan(pctx);




parts.push([parseExp(pctx)]);
++last;
break;
case "<eof>":
throw "Unterminated string";
break;
default:
throw "Internal parser error: Unknown token in string ("+pctx.token+")";
}
scan(pctx,undefined,TOKENIZER_IS);
}
scan(pctx);

if(last==-1){
parts.push('');
last=0;
}

if(last==0&&typeof parts[0]=='string'){
var val='"'+parts[0]+'"';
return new ph_literal(val,pctx,'<string>');
}
return new ph_interpolating_str(parts,pctx);
});

S('istr-#{',TOKENIZER_SA);
S('istr-"',TOKENIZER_OP);

function isStmtTermination(token){return token.id==";"||token.id=="}"||token.id=="<eof>";

}

function parseStmtTermination(pctx){if(pctx.token.id!="}"&&pctx.token.id!="<eof>"&&!pctx.newline)scan(pctx,";");


}

function parseVarDecls(pctx,st){var decls=[];

do {
if(decls.length)scan(pctx,",");
var id=pctx.token.value;
scan(pctx,"<id>");
if(pctx.token.id=="="){
scan(pctx);
var initialiser=parseExp(pctx,110,st);
decls.push([id,initialiser]);
}else decls.push([id]);


}while(pctx.token.id==",");
return decls;
}

S("var").stmt(function(pctx){var decls=parseVarDecls(pctx);

parseStmtTermination(pctx);

return gen_var_decl(decls,pctx);
});

S("else");

S("if").stmt(function(pctx){scan(pctx,"(");

var test=parseExp(pctx);
scan(pctx,")");
var consequent=parseStmt(pctx);
var alternative=null;
if(pctx.token.id=="else"){
scan(pctx);
alternative=parseStmt(pctx);
}

return new ph_if(test,consequent,alternative,pctx);
});

S("while").stmt(function(pctx){scan(pctx,"(");

var test=parseExp(pctx);
scan(pctx,")");
var body=parseStmt(pctx);

return new ph_loop(0,test,body);
});

S("do").stmt(function(pctx){var body=parseStmt(pctx);

scan(pctx,"while");
scan(pctx,"(");
var test=parseExp(pctx);
scan(pctx,")");
parseStmtTermination(pctx);

return new ph_loop(2,test,body);
});

S("for").stmt(function(pctx){scan(pctx,"(");

var start_exp=null;
var decls=null;
if(pctx.token.id=="var"){
scan(pctx);
decls=parseVarDecls(pctx,"in");
}else{

if(pctx.token.id!=";")start_exp=parseExp(pctx,0,"in");

}

if(pctx.token.id==";"){
scan(pctx);
var test_exp=null;
if(pctx.token.id!=";")test_exp=parseExp(pctx);

scan(pctx,";");
var inc_exp=null;
if(pctx.token.id!=")")inc_exp=parseExp(pctx);

scan(pctx,")");
var body=parseStmt(pctx);

return gen_for(start_exp,decls,test_exp,inc_exp,body,pctx);
}else if(pctx.token.id=="in"){

scan(pctx);

if(decls&&decls.length>1)throw "More that one variable declaration in for-in loop";

var obj_exp=parseExp(pctx);
scan(pctx,")");
var body=parseStmt(pctx);
var decl=decls?decls[0]:null;

return gen_for_in(start_exp,decl,obj_exp,body,pctx);
}else throw "Unexpected token '"+pctx.token+"' in for-statement";


});

S("continue").stmt(function(pctx){var label=null;

if(pctx.token.id=="<id>"&&!pctx.newline){
label=pctx.token.value;
scan(pctx);
}
parseStmtTermination(pctx);

return new ph_cfe("c",label);
});

S("break").stmt(function(pctx){var label=null;

if(pctx.token.id=="<id>"&&!pctx.newline){
label=pctx.token.value;
scan(pctx);
}
parseStmtTermination(pctx);

return new ph_cfe("b",label);
});

S("return").stmt(function(pctx){var exp=null;

if(!isStmtTermination(pctx.token)&&!pctx.newline)exp=parseExp(pctx);

parseStmtTermination(pctx);

return new ph_return(exp,pctx);
});

S("with").stmt(function(pctx){scan(pctx,"(");

var exp=parseExp(pctx);
scan(pctx,")");
var body=parseStmt(pctx);

return new ph_with(exp,body,pctx);
});

S("case");
S("default");

S("switch").stmt(function(pctx){scan(pctx,"(");

var exp=parseExp(pctx);
scan(pctx,")");
scan(pctx,"{");
var clauses=[];
while(pctx.token.id!="}"){
var clause_exp=null;
if(pctx.token.id=="case"){
scan(pctx);
clause_exp=parseExp(pctx);
}else if(pctx.token.id=="default"){

scan(pctx);
}else throw "Invalid token '"+pctx.token+"' in switch statement";


scan(pctx,":");

push_stmt_scope(pctx);top_stmt_scope(pctx).exp=clause_exp;
while(pctx.token.id!="case"&&pctx.token.id!="default"&&pctx.token.id!="}"){
var stmt=parseStmt(pctx);

add_stmt(stmt,pctx);
}
clauses.push((function(pctx){return [top_stmt_scope(pctx).exp,pop_block(pctx)]})(pctx));
}
scan(pctx,"}");

return new ph_switch(exp,clauses);(exp,clauses,pctx);
});

S("throw").stmt(function(pctx){if(pctx.newline)throw "Illegal newline after throw";

var exp=parseExp(pctx);
parseStmtTermination(pctx);

return new ph_throw(exp,pctx);;
});

S("catch");
S("finally");





function parseCRF(pctx){var rv=[];

var a=null;
if(pctx.token.id=="catch"||pctx.token.value=="catchall"){



var all=pctx.token.value=="catchall";
a=[];
scan(pctx);
a.push(scan(pctx,"(").value);
scan(pctx,"<id>");
scan(pctx,")");
scan(pctx,"{");
a.push(parseBlock(pctx));
a.push(all);
}
rv.push(a);
if(pctx.token.value=="retract"){
scan(pctx);
scan(pctx,"{");
rv.push(parseBlock(pctx));
}else rv.push(null);


if(pctx.token.id=="finally"){
scan(pctx);
scan(pctx,"{");
rv.push(parseBlock(pctx));
}else rv.push(null);


return rv;
}

S("try").stmt(function(pctx){scan(pctx,"{");

var block=parseBlock(pctx);
var op=pctx.token.value;
if(op!="and"&&op!="or"){

var crf=parseCRF(pctx);
if(!crf[0]&&!crf[1]&&!crf[2])throw "Missing 'catch', 'finally' or 'retract' after 'try'";


return new ph_try(block,crf,pctx);
}else{

var blocks=[block];
do {
scan(pctx);
scan(pctx,"{");
blocks.push(parseBlock(pctx));
}while(pctx.token.value==op);
var crf=parseCRF(pctx);

return gen_waitfor_andor(op,blocks,crf,pctx);
}
});

S("waitfor").stmt(function(pctx){

scan(pctx,"{");
var blocks=[parseBlock(pctx)];
var op=pctx.token.value;
if(op!="and"&&op!="or")throw "Missing 'and' or 'or' after 'waitfor' block";
do {
scan(pctx);
scan(pctx,"{");
blocks.push(parseBlock(pctx));
}while(pctx.token.value==op);
var crf=parseCRF(pctx);

return gen_waitfor_andor(op,blocks,crf,pctx);
}else{


scan(pctx,"(");
var has_var=(pctx.token.id=="var");
if(has_var)scan(pctx);
var decls=[];
if(pctx.token.id==")"){
if(has_var)throw "Missing variables in waitfor(var)";
}else decls=parseVarDecls(pctx);


scan(pctx,")");
scan(pctx,"{");

++top_decl_scope(pctx).fscoped_ctx;
var block=parseBlock(pctx);
var crf=parseCRF(pctx);

--top_decl_scope(pctx).fscoped_ctx;

return gen_suspend(has_var,decls,block,crf,pctx);
}
});


S("using").stmt(function(pctx){var has_var;

scan(pctx,"(");
if(has_var=(pctx.token.id=="var"))scan(pctx);

var lhs,exp;
var e1=parseExp(pctx,120);
if(pctx.token.id=="="){
lhs=e1;
scan(pctx);
exp=parseExp(pctx);
}else{

if(has_var)throw "Syntax error in 'using' expression";

exp=e1;
}
scan(pctx,")");
var body=parseStmt(pctx);

return gen_using(has_var,lhs,exp,body,pctx);
});

S("__js").stmt(function(pctx){if(pctx.allow_nblock)++pctx.js_ctx;


var body=parseStmt(pctx);

if(pctx.allow_nblock)--pctx.js_ctx;

body.is_nblock=pctx.allow_nblock;return body;
});



S("abstract");
S("boolean");
S("byte");
S("char");
S("class");
S("const");
S("debugger");
S("double");
S("enum");
S("export");
S("extends");
S("final");
S("float");
S("goto");
S("implements");
S("import");
S("int");
S("interface");
S("long");
S("native");
S("package");
S("private");
S("protected");
S("public");
S("short");
S("static");
S("super");
S("synchronized");
S("throws");
S("transient");
S("volatile");




function makeParserContext(src,settings){var ctx={src:src,line:1,lastIndex:0,token:null};







if(settings)for(var a in settings)ctx[a]=settings[a];



return ctx;
}


function compile(src,settings){var pctx=makeParserContext(src+"\n",settings);









try{
return parseScript(pctx);
}catch(e){

var mes=e.mes||e;
var line=e.line||pctx.line;
throw new Error("SJS syntax error "+(pctx.filename?"in "+pctx.filename+",":"at")+" line "+line+": "+mes);
}
}
exports.compile=compile;

function parseScript(pctx){begin_script(pctx);

scan(pctx);
while(pctx.token.id!="<eof>"){
var stmt=parseStmt(pctx);

add_stmt(stmt,pctx);;
}
return end_script(pctx);
}

function parseStmt(pctx){var t=pctx.token;

scan(pctx);
if(t.stmtf){

return t.stmtf(pctx);
}else if(t.id=="<id>"&&pctx.token.id==":"){


scan(pctx);

var stmt=parseStmt(pctx);

return new ph_lbl_stmt(t.value,stmt);
}else{


var exp=parseExp(pctx,0,null,t);
parseStmtTermination(pctx);

return new ph_exp_stmt(exp,pctx);
}
}


function parseExp(pctx,bp,st,t){bp=bp||0;

if(!t){
t=pctx.token;
scan(pctx);
}
var left=t.exsf(pctx,st);
while(bp<pctx.token.excbp&&pctx.token.id!=st){
t=pctx.token;

if(pctx.newline&&(!t.excf||t.asi_restricted))return left;

scan(pctx);
left=t.excf(left,pctx,st);
}
return left;
}

function scan(pctx,id,tokenizer){if(!tokenizer){

if(pctx.token)tokenizer=pctx.token.tokenizer;else tokenizer=TOKENIZER_SA;



}

if(id&&(!pctx.token||pctx.token.id!=id))throw "Unexpected "+pctx.token;

pctx.token=null;
pctx.newline=0;
while(!pctx.token){
tokenizer.lastIndex=pctx.lastIndex;
var matches=tokenizer.exec(pctx.src);
if(!matches){
pctx.token=ST.lookup("<eof>");
break;
}
pctx.lastIndex=tokenizer.lastIndex;

if(tokenizer==TOKENIZER_SA){
if(matches[4]){
pctx.token=ST.lookup(matches[4]);
if(!pctx.token){
pctx.token=new Identifier(matches[4]);
}
}else if(matches[1]){

var m=matches[1].match(/\n/g);
if(m){
pctx.line+=m.length;
pctx.newline+=m.length;

}

}else if(matches[5])pctx.token=new Literal("<string>",matches[5]);else if(matches[6]){



var val=matches[6];
var m=val.match(/\n/g);
pctx.line+=m.length;
pctx.newline+=m.length;
val=val.replace(/\\\n/g,"").replace(/\n/g,"\\n");
pctx.token=new Literal("<string>",val);
}else if(matches[2])pctx.token=new Literal("<number>",matches[2]);else if(matches[3])pctx.token=new Literal("<regex>",matches[3]);else if(matches[7])throw "Unexpected characters: '"+matches[7]+"'";else throw "Internal scanner error";









}else if(tokenizer==TOKENIZER_OP){

if(matches[2]){
pctx.token=ST.lookup(matches[2]);
if(!pctx.token){
pctx.token=new Identifier(matches[2]);
}
}else if(matches[1]){

var m=matches[1].match(/\n/g);
if(m){
pctx.line+=m.length;
pctx.newline+=m.length;

}

}else{




tokenizer=TOKENIZER_SA;

}

}else if(tokenizer==TOKENIZER_IS){


if(matches[1])pctx.token=new Literal("<string>",matches[1]);else if(matches[2]){


++pctx.line;
++pctx.newline;

}else if(matches[3]){

++pctx.line;
++pctx.newline;
pctx.token=new Literal("<string>",'\\n');
}else if(matches[4]){

pctx.token=ST.lookup("istr-"+matches[4]);
}
}else throw "Internal scanner error: no tokenizer";


}
return pctx.token;
}


})(__oni_rt.c1={});__oni_rt.modsrc['sjs:apollo-sys-common.sjs']="__oni_rt.sys=exports;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar UNDEF;\n\n\n\n\n\n\n\n\n\nexports.hostenv=__oni_rt.hostenv;\n\n\n\n\n\nexports.getGlobal=function(){return __oni_rt.G};\n\n\n\n\n\n\n\nexports.isArrayOrArguments=function(obj){return Array.isArray(obj)||!!(obj&&Object.prototype.hasOwnProperty.call(obj,\'callee\'));\n\n\n};\n\n\n\n\n\n\n\n\n\n\n\nexports.flatten=function(arr,rv){var rv=rv||[];\n\nvar l=arr.length;\nfor(var i=0;i<l;++i){\nvar elem=arr[i];\nif(exports.isArrayOrArguments(elem))exports.flatten(elem,rv);else rv.push(elem);\n\n\n\n}\nreturn rv;\n};\n\n\n\n\n\n\nexports.accuSettings=function(accu,hashes){hashes=exports.flatten(hashes);\n\nvar hl=hashes.length;\nfor(var h=0;h<hl;++h){\nvar hash=hashes[h];\nfor(var o in hash)accu[o]=hash[o];\n\n}\nreturn accu;\n};\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nexports.parseURL=function(str){var o=exports.parseURL.options,m=o.parser.exec(str),uri={},i=14;\n\n\n\n\n\nwhile(i-- )uri[o.key[i]]=m[i]||\"\";\n\nuri[o.q.name]={};\nuri[o.key[12]].replace(o.q.parser,function($0,$1,$2){if($1)uri[o.q.name][$1]=$2;\n\n});\n\nreturn uri;\n};\nexports.parseURL.options={key:[\"source\",\"protocol\",\"authority\",\"userInfo\",\"user\",\"password\",\"host\",\"port\",\"relative\",\"path\",\"directory\",\"file\",\"query\",\"anchor\"],q:{name:\"queryKey\",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:/^(?:([^:\\/?#]+):)?(?:\\/\\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\\/?#]*)(?::(\\d*))?))?((((?:[^?#\\/]*\\/)*)([^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/};\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nexports.constructQueryString=function(){var hashes=exports.flatten(arguments);\n\nvar hl=hashes.length;\nvar parts=[];\nfor(var h=0;h<hl;++h){\nvar hash=hashes[h];\nfor(var q in hash){\nvar l=encodeURIComponent(q)+\"=\";\nvar val=hash[q];\nif(!exports.isArrayOrArguments(val))parts.push(l+encodeURIComponent(val));else{\n\n\nfor(var i=0;i<val.length;++i)parts.push(l+encodeURIComponent(val[i]));\n\n}\n}\n}\nreturn parts.join(\"&\");\n};\n\n\n\n\n\n\n\n\nexports.constructURL=function(){var url_spec=exports.flatten(arguments);\n\nvar l=url_spec.length;\nvar rv=url_spec[0];\n\n\nfor(var i=1;i<l;++i){\nvar comp=url_spec[i];\nif(typeof comp!=\"string\")break;\nif(rv.charAt(rv.length-1)!=\"/\")rv+=\"/\";\nrv+=comp.charAt(0)==\"/\"?comp.substr(1):comp;\n}\n\n\nvar qparts=[];\nfor(;i<l;++i){\nvar part=exports.constructQueryString(url_spec[i]);\nif(part.length)qparts.push(part);\n\n}\nvar query=qparts.join(\"&\");\nif(query.length){\nif(rv.indexOf(\"?\")!=-1)rv+=\"&\";else rv+=\"?\";\n\n\n\nrv+=query;\n}\nreturn rv;\n};\n\n\n\n\n\n\n\nexports.isSameOrigin=function(url1,url2){var a1=exports.parseURL(url1).authority;\n\nif(!a1)return true;\nvar a2=exports.parseURL(url2).authority;\nreturn !a2||(a1==a2);\n};\n\n\n\n\n\n\n\n\n\n\nexports.canonicalizeURL=function(url,base){if(__oni_rt.hostenv==\"nodejs\"&&__oni_rt.G.process.platform==\'win32\'){\n\n\n\nurl=url.replace(/\\\\/g,\"/\");\nbase=base.replace(/\\\\/g,\"/\");\n}\n\nvar a=exports.parseURL(url);\n\n\nif(base&&(base=exports.parseURL(base))&&(!a.protocol||a.protocol==base.protocol)){\n\nif(!a.directory&&!a.protocol)a.directory=base.directory;else if(a.directory&&a.directory.charAt(0)!=\'/\'){\n\n\n\na.directory=(base.directory||\"/\")+a.directory;\n}\nif(!a.protocol){\na.protocol=base.protocol;\nif(!a.authority)a.authority=base.authority;\n\n}\n}\n\n\nvar pin=a.directory.split(\"/\");\nvar l=pin.length;\nvar pout=[];\nfor(var i=0;i<l;++i){\nvar c=pin[i];\nif(c==\".\")continue;\nif(c==\"..\"&&pout.length>1)pout.pop();else pout.push(c);\n\n\n\n}\na.directory=pout.join(\"/\");\n\n\nvar rv=\"\";\nif(a.protocol)rv+=a.protocol+\":\";\nif(a.authority)rv+=\"//\"+a.authority;else if(a.protocol==\"file\")rv+=\"//\";\n\n\n\nrv+=a.directory+a.file;\nif(a.query)rv+=\"?\"+a.query;\nif(a.anchor)rv+=\"#\"+a.anchor;\nreturn rv;\n};\n\n\n\n\n\n\n\n\n\n\n\nexports.jsonp=jsonp_hostenv;\n\n\n\n\n\n\n\nexports.getXDomainCaps=getXDomainCaps_hostenv;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nexports.request=request_hostenv;\n\n\n\n\n\n\nexports.makeMemoizedFunction=function(f,keyfn){var lookups_in_progress={};\n\n\nvar memoizer=function(){var key=keyfn?keyfn.apply(this,arguments):arguments[0];\n\nvar rv=memoizer.db[key];\nif(typeof rv!==\'undefined\')return rv;\nif(!lookups_in_progress[key])lookups_in_progress[key]=spawn (function(args){\nreturn memoizer.db[key]=f.apply(this,args);\n\n})(arguments);\ntry{\nreturn lookups_in_progress[key].waitforValue();\n}finally{\n\nif(lookups_in_progress[key].waiting()==0){\nlookups_in_progress[key].abort();\ndelete lookups_in_progress[key];\n}\n}\n};\n\nmemoizer.db={};\nreturn memoizer;\n};\n\n\n\n\nexports.eval=eval_hostenv;\n\n\n\n\nvar pendingLoads={};\n\n\n\n\nfunction makeRequire(parent){var rf=function(module,settings){\n\nvar opts=exports.accuSettings({},[settings]);\n\n\nif(opts.callback){\n(spawn (function(){try{\n\nvar rv=requireInner(module,rf,parent,opts);\n}catch(e){\n\nopts.callback(e);return 1;\n}\nopts.callback(UNDEF,rv);\n})());\n}else return requireInner(module,rf,parent,opts);\n\n\n};\n\nrf.resolve=function(module,settings){var opts=exports.accuSettings({},[settings]);\n\nreturn resolve(module,rf,parent,opts);\n};\n\nrf.path=\"\";\nrf.alias={};\n\n\nif(exports.require){\nrf.hubs=exports.require.hubs;\nrf.modules=exports.require.modules;\nrf.extensions=exports.require.extensions;\n}else{\n\n\nrf.hubs=getHubs_hostenv();\nrf.modules={};\n\nrf.extensions=getExtensions_hostenv();\n}\nreturn rf;\n}\n\n\nfunction resolveAliases(module,aliases){var ALIAS_REST=/^([^:]+):(.*)$/;\n\nvar alias_rest,alias;\nvar rv=module;\nvar level=10;\nwhile((alias_rest=ALIAS_REST.exec(rv))&&(alias=aliases[alias_rest[1]])){\n\nif(--level==0)throw \"Too much aliasing in modulename \'\"+module+\"\'\";\n\nrv=alias+alias_rest[2];\n}\nreturn rv;\n}\n\n\nfunction resolveHubs(module,hubs,opts){var path=module;\n\nvar loader=opts.loader||default_loader;\nvar src=opts.src||default_src_loader;\nvar level=10;\nfor(var i=0,hub;hub=hubs[i++ ];){\nif(path.indexOf(hub[0])==0){\n\nif(typeof hub[1]==\"string\"){\npath=hub[1]+path.substring(hub[0].length);\ni=0;\nif(--level==0)throw \"Too much indirection in hub resolution for module \'\"+module+\"\'\";\n\n}else if(typeof hub[1]==\"object\"){\n\nif(hub[1].src)src=hub[1].src;\nif(hub[1].loader)loader=hub[1].loader;\n\nbreak;\n}else throw \"Unexpected value for require.hubs element \'\"+hub[0]+\"\'\";\n\n\n}\n}\n\nreturn {path:path,loader:loader,src:src};\n}\n\n\nfunction default_src_loader(path){throw new Error(\"Don\'t know how to load module at \"+path);\n\n}\n\nfunction default_loader(path,parent,src,opts){return getNativeModule(path,parent,src,opts);\n\n}\n\nfunction http_src_loader(path){var src;\n\nif(getXDomainCaps_hostenv()!=\'none\'||exports.isSameOrigin(path,document.location))src=request_hostenv(path,{mime:\"text/plain\"});else{\n\n\n\n\npath+=\"!modp\";\nsrc=jsonp_hostenv(path,{forcecb:\"module\",cbfield:null});\n\n\n}\nreturn {src:src,loaded_from:path};\n}\n\n\n\n\n\n\nvar github_api=\"https://api.github.com/\";\nvar github_opts={cbfield:\"callback\"};\nfunction github_src_loader(path){var user,repo,tag;\n\ntry{\n[ ,user,repo,tag,path]=/github:([^\\/]+)\\/([^\\/]+)\\/([^\\/]+)\\/(.+)/.exec(path);\n}catch(e){throw \"Malformed module id \'\"+path+\"\'\"}\n\nvar url=exports.constructURL(github_api,\'repos\',user,repo,\"contents\",path,{ref:tag});\n\nwaitfor{\nvar data=jsonp_hostenv(url,github_opts).data;\n}or{\n\nhold(10000);\nthrow new Error(\"Github timeout\");\n}\nif(data.message&&!data.content)throw new Error(data.message);\n\n\n\nvar str=exports.require(\'apollo:string\');\n\nreturn {src:str.utf8ToUtf16(str.base64ToOctets(data.content)),loaded_from:url};\n\n\n\n}\n\nfunction getNativeModule(path,parent,src_loader,opts){var extension=/.+\\.([^\\.\\/]+)$/.exec(path)[1];\n\n\n\nvar compile=exports.require.extensions[extension];\nif(!compile)throw \"Unknown type \'\"+extension+\"\'\";\n\n\nvar descriptor;\nif(!(descriptor=exports.require.modules[path])){\n\nvar pendingHook=pendingLoads[path];\nif(!pendingHook){\npendingHook=pendingLoads[path]=spawn (function(){var src,loaded_from;\n\nif(typeof src_loader===\"string\"){\nsrc=src_loader;\nloaded_from=\"[src string]\";\n}else if(path in __oni_rt.modsrc){\n\n\nloaded_from=\"[builtin]\";\nsrc=__oni_rt.modsrc[path];\ndelete __oni_rt.modsrc[path];\n\n}else{\n\n({src,loaded_from})=src_loader(path);\n}\nvar descriptor={id:path,exports:{},loaded_from:loaded_from,loaded_by:parent,required_by:{},require:makeRequire(path)};\n\n\n\n\n\n\n\ncompile(src,descriptor);\n\n\n\n\n\nexports.require.modules[path]=descriptor;\n\nreturn descriptor;\n})();\n}\ntry{\nvar descriptor=pendingHook.waitforValue();\n}finally{\n\n\nif(pendingHook.waiting()==0)delete pendingLoads[path];\n\n}\n}\n\nif(!descriptor.required_by[parent])descriptor.required_by[parent]=1;else ++descriptor.required_by[parent];\n\n\n\n\nreturn descriptor.exports;\n}\n\n\nfunction resolve(module,require_obj,parent,opts){var path=resolveAliases(module,require_obj.alias);\n\n\n\n\nif(path.indexOf(\":\")==-1)path=resolveSchemelessURL_hostenv(path,require_obj,parent);\n\n\n\nvar resolveSpec=resolveHubs(path,exports.require.hubs,opts);\n\n\nresolveSpec.path=exports.canonicalizeURL(resolveSpec.path,parent);\n\n\nif(resolveSpec.loader==default_loader&&resolveSpec.path.charAt(resolveSpec.path.length-1)!=\'/\'){\n\n\nvar matches=/.+\\.([^\\.\\/]+)$/.exec(resolveSpec.path);\nif(!matches||!exports.require.extensions[matches[1]])resolveSpec.path+=\".sjs\";\n\n}\n\nif(parent==getTopReqParent_hostenv())parent=\"[toplevel]\";\n\n\nreturn resolveSpec;\n}\n\n\n\n\n\nexports.resolve=function(url,require_obj,parent,opts){require_obj=require_obj||exports.require;\n\nparent=parent||getTopReqParent_hostenv();\nopts=opts||{};\nreturn resolve(url,require_obj,parent,opts);\n};\n\n\nfunction requireInner(module,require_obj,parent,opts){try{\n\n\nvar resolveSpec=resolve(module,require_obj,parent,opts);\n\n\nmodule=resolveSpec.loader(resolveSpec.path,parent,resolveSpec.src,opts);\nif(opts.copyTo){\nexports.accuSettings(opts.copyTo,[module]);\n}\n\nreturn module;\n}catch(e){\n\nvar mes=\"Cannot load module \'\"+module+\"\'. \"+\"(Underlying exception: \"+e+\")\";\n\nthrow new Error(mes);\n}\n}\n\n\nexports.require=makeRequire(getTopReqParent_hostenv());\n\nexports.require.modules[\'sjs:apollo-sys.sjs\']={id:\'sjs:apollo-sys.sjs\',exports:exports,loaded_from:\"[builtin]\",loaded_by:\"[toplevel]\",required_by:{\"[toplevel]\":1}};\n\n\n\n\n\n\n\nexports.init=function(cb){init_hostenv();\n\ncb();\n};\n\n";__oni_rt.modsrc['sjs:apollo-sys-nodejs.sjs']="function jsonp_hostenv(url,settings){\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar opts=exports.accuSettings({},[{cbfield:\"callback\",forcecb:\"jsonp\"},settings]);\n\n\n\n\n\n\n\n\nvar query={};\nquery[opts.cbfield]=opts.forcecb;\n\nvar parser=/^[^{]*({[^]+})[^}]*$/;\nvar data=parser.exec(request_hostenv([url,opts.query,query]));\n\n\n\n\ndata[1]=data[1].replace(/([^\\\\])\\\\x/g,\"$1\\\\u00\");\n\ntry{\nreturn JSON.parse(data[1]);\n}catch(e){\n\nthrow new Error(\"Invalid jsonp response from \"+exports.constructURL(url)+\" (\"+e+\")\");\n}\n}\n\n\n\n\n\n\nfunction getXDomainCaps_hostenv(){return \"*\";\n\n}\n\n\n\n\n\nvar req_base;\nfunction getTopReqParent_hostenv(){if(!req_base)req_base=\"file://\"+process.cwd()+\"/\";\n\nreturn req_base;\n}\n\n\n\n\n\n\n\n\n\nfunction resolveSchemelessURL_hostenv(url_string,req_obj,parent){if(/^\\.?\\.?\\//.exec(url_string))return exports.canonicalizeURL(url_string,parent);else return \"nodejs:\"+url_string;\n\n\n\n\n}\n\n\n\n\nvar readStream=exports.readStream=function readStream(stream){if(stream.readable===false)return null;\n\n\n\n\nvar data=null;\n\nstream.resume();\nwaitfor{\nwaitfor(var exception){\nstream.on(\'error\',resume);\nstream.on(\'end\',resume);\n}finally{\n\nstream.removeListener(\'error\',resume);\nstream.removeListener(\'end\',resume);\n}\nif(exception)throw exception;\n}or{\n\nwaitfor(data){\nstream.on(\'data\',resume);\n}finally{\n\nstream.removeListener(\'data\',resume);\n}\n}finally{\n\nif(stream.readable)stream.pause();\n\n}\n\nreturn data;\n};\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction request_hostenv(url,settings){var opts=exports.accuSettings({},[{method:\"GET\",headers:{},response:\'string\',throwing:true,max_redirects:5},settings]);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar url_string=exports.constructURL(url,opts.query);\n\n\nvar url=exports.parseURL(url_string);\nvar protocol=url.protocol;\nif(!(protocol===\'http\'||protocol===\'https\')){\nthrow (\'Unsupported protocol: \'+protocol);\n}\nvar secure=(protocol==\"https\");\nvar port=url.port||(secure?443:80);\n\nif(!opts.headers[\'Host\'])opts.headers.Host=url.authority;\n\nif(opts.body&&!opts.headers[\'Transfer-Encoding\']){\n\n\n\nopts.body=new Buffer(opts.body);\nopts.headers[\'Content-Length\']=opts.body.length;\n}else{\n\nopts.headers[\'Content-Length\']=0;\n}\nvar auth;\nif(typeof opts.username!=\'undefined\'&&typeof opts.password!=\'undefined\')auth=opts.username+\":\"+opts.password;\n\nvar request=__oni_rt.nodejs_require(protocol).request({method:opts.method,host:url.host,port:port,path:url.relative||\'/\',headers:opts.headers,auth:auth});\n\n\n\n\n\n\n\nrequest.end(opts.body);\n\nwaitfor{\nwaitfor(var err){\nrequest.on(\'error\',resume);\n}finally{\n\nrequest.removeListener(\'error\',resume);\n}\nthrow new Error(err);\n}or{\n\nwaitfor(var response){\nrequest.on(\'response\',resume);\n}finally{\n\nrequest.removeListener(\'response\',resume);\n}\n}retract{\n\n\n\nrequest.on(\'error\',function(){});\nrequest.abort();\n}\n\nif(response.statusCode<200||response.statusCode>=300){\nswitch(response.statusCode){case 300:\ncase 301:case 302:case 303:case 307:\nif(opts.max_redirects>0){\n\nopts.headers.host=null;\n--opts.max_redirects;\n\n\n\nreturn request_hostenv(exports.canonicalizeURL(response.headers[\'location\'],url_string),opts);\n\n\n}\n\ndefault:\nif(opts.throwing){\nvar txt=\"Failed \"+opts.method+\" request to \'\"+url_string+\"\'\";\ntxt+=\" (\"+response.statusCode+\")\";\nvar err=new Error(txt);\n\nerr.status=response.statusCode;\nerr.request=request;\nerr.response=response;\n\nresponse.setEncoding(\'utf8\');\nresponse.data=\"\";\nvar data;\nwhile(data=readStream(response)){\nresponse.data+=data;\n}\nerr.data=response.data;\nthrow err;\n}else if(opts.response==\'string\')return \"\";\n\n\n\n}\n}\n\n\nresponse.setEncoding(\'utf8\');\nresponse.data=\"\";\nvar data;\nwhile(data=readStream(response)){\nresponse.data+=data;\n}\n\nif(opts.response==\'string\')return response.data;else{\n\n\n\nreturn {content:response.data,getHeader(name){\n\nresponse.headers[name.toLowerCase()]}};\n\n}\n\n};\n\nfunction file_src_loader(path){waitfor(var err,data){\n\n\n__oni_rt.nodejs_require(\'fs\').readFile(path.substr(7),resume);\n}\nif(err){\n\n\nvar matches;\nif((matches=/(.*)\\.sjs$/.exec(path))){\ntry{\nreturn file_src_loader(matches[1]);\n}catch(e){throw err+\"\\nand then\\n\"+e}\n}else throw err;\n\n\n}\nreturn {src:data.toString(),loaded_from:path};\n}\n\n\nfunction nodejs_loader(path,parent,dummy_src,opts){path=path.substr(7);\n\n\n\n\n\n\nvar base;\nif(!(/^file:/.exec(parent)))base=getTopReqParent_hostenv();else base=parent;\n\n\n\n\nbase=base.substr(7);\n\nvar mockModule={paths:__oni_rt.nodejs_require(\'module\')._nodeModulePaths(base)};\n\n\n\nvar resolved=\"\";\ntry{\nresolved=__oni_rt.nodejs_require(\'module\')._resolveFilename(path,mockModule);\n\nif(resolved instanceof Array)resolved=resolved[1];\n\nif(resolved.indexOf(\'.\')==-1)return __oni_rt.nodejs_require(resolved);\n}catch(e){\n}\n\nvar matches;\nif(!(matches=/.+\\.([^\\.\\/]+)$/.exec(path))){\ntry{\n\nresolved=__oni_rt.nodejs_require(\'module\')._resolveFilename(path+\".sjs\",mockModule);\n\nif(resolved instanceof Array)resolved=resolved[1];\n\n\nreturn default_loader(\"file://\"+resolved,parent,file_src_loader,opts);\n}catch(e){\n}\n}else if(resolved&&matches[1]!=\"js\"){\n\n\nif(exports.require.extensions[matches[1]])return default_loader(\"file://\"+resolved,parent,file_src_loader,opts);\n\n}\n\nif(resolved==\"\")throw new Error(\"nodejs module at \'\"+path+\"\' not found\");\nreturn __oni_rt.nodejs_require(resolved);\n}\n\nfunction getHubs_hostenv(){return [[\"apollo:\",\"file://\"+__oni_rt.nodejs_apollo_lib_dir],[\"github:\",{src:github_src_loader}],[\"http:\",{src:http_src_loader}],[\"https:\",{src:http_src_loader}],[\"file:\",{src:file_src_loader}],[\"nodejs:\",{loader:nodejs_loader}]];\n\n\n\n\n\n\n\n\n}\n\nfunction getExtensions_hostenv(){return {\'sjs\'(src,descriptor){\n\n\nvar f=exports.eval(\"(function(module,exports,require){\"+src+\"})\",{filename:\"module \'\"+descriptor.id+\"\'\"});\n\n\nf(descriptor,descriptor.exports,descriptor.require);\n},\'js\'(src,descriptor){\n\nvar f=new Function(\"module\",\"exports\",\"require\",src);\n\nf.apply(descriptor.exports,[descriptor,descriptor.exports,descriptor.require]);\n}};\n\n}\n\n\n\n\nfunction eval_hostenv(code,settings){var filename=(settings&&settings.filename)||\"\'sjs_eval_code\'\";\n\nvar mode=(settings&&settings.mode)||\"normal\";\nvar js=__oni_rt.c1.compile(code,{filename:filename,mode:mode});\nreturn __oni_rt.G.eval(js);\n}\n\n\n\n\n\nfunction init_hostenv(){var init_path=process.env[\'APOLLO_INIT\'];\n\nif(init_path){\nvar node_fs=__oni_rt.nodejs_require(\'fs\');\nvar files=init_path.split(\':\');\nfor(var i=0;i<files.length;i++ ){\nvar path=files[i];\nif(!path)continue;\ntry{\npath=node_fs.realpathSync(path);\nexports.require(\'file://\'+path);\n}catch(e){\nconsole.error(\"Error loading init script at \"+path+\": \"+e);\nthrow e;\n}\n}\n}\n};\n\n\n";var rt=global.__oni_rt;
