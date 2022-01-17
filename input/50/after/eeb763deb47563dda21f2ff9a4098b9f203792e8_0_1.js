function parseMethod(pctx){var pars=[];

var body=parseFunctionInner(pctx,pars,true);

return new ph_fun_exp("",pars,body,pctx,true);
}