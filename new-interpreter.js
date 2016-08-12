// run in node.js, chrome or firefox console
// spits out 99 bottles of beer on the wall, bf code obtained from http://www.99-bottles-of-beer.net/
// (c)2016, Greg Frazier
// MIT License, http://www.opensource.org/licenses/mit-license.php
((code) => {
    var mem = [...Array(30000)].map((x)=>0), memPos = 0, disp = [], loopStack = [],
        ops = Array.from(code).map((o,i,arr) => {
        var op = ['>','<','+','-','.',',','[',']'].indexOf(o);
        if(op == 6) loopStack.push({ b: i, e: null });
        if(op == 7) loopStack.unshift({ b: (loopStack.pop()||{b: i}).b, e: i });
        if(op > -1)
            return ([(v) => { ++memPos; return v + 1; },
                     (v) => { --memPos; return v + 1; },
                     (v) => { mem[memPos]++; return v + 1; },
                     (v) => { mem[memPos]--; return v + 1; },
                     (v) => { disp.push(String.fromCharCode(mem[memPos])); return v + 1; },
                     (v) => { return v + 1; }, // input not implemented
                     (v) => { return (mem[memPos]==0 ? (loopStack.find((o)=>o.b==v) || {e:v}).e : v) + 1; },
                     (v) => { return (mem[memPos]!=0 ? (loopStack.find((o)=>o.e==v) || {b:v}).b : v) + 1; }][op]);
        return (v) => { return v + 1; }; // invalid op, just ignore it
        }); 
    for(var q = 0; q < ops.length; q = ops[q](q));
    return { disp: disp, mem: mem, memPos: memPos, ops: ops };
})('>>>>>++++++++[<+++++++++>-]<+[>>[>]+[<]<-]>++++++++++[<++++++++++>-]<[>>[+>]<[<]<-]<++++++++[>++++++++[>>->->->>>>>>>>>>>->>>->>>>>>->->->->>->>>->>>>->>>>>->->>>>>>->>>>->>>>>->->>>>>->>>->>>>>>>->-[<]<-]>>++>++>->>+>++>++>+>>>>++>>->+>>->>>>++>>+>+>+>--->>->+>+>->++>>>->++>>+>+>+>--->>-->>+>>->+>+>>->>+>++>+>+>->+>>++>++>->>++>->>++>+>++>+>>+>---[<]<<-]>>>++++>++++>+++>--->++>->->->>[-]>->-->[-]>+++>++>+>+++>--->>>--->[-]>+>+>+>--->[-]>+++>++>+>+++>->+++>>+++>++>---->->->+>--->[-]>->---->-->>+++>++>+>>+++>->++>++>+>->+++>+++>---->-->-->+++>++++>->+++>---->--->++>>+>->->---[[<]<]+++++++++[<+<+++++++++++>>-]<<[>>>>>[<]>[.>]>--[>.>]<[<<]>++>>>[.>]>[>]>[.>]<[[<]<]>>[.>]>--[>.>]<[<<]>++>>>[.>]>[.>]>[>]>[.>]<[[<]<]<<[<]>>>+<[>-]>[>]<[+++++++++[<+<->>>>>+<<<-]+<<[>>-]>>>[<]<<<++++++++++>>[>>[-]+<<-]>>-<<]>>>-[>]>-<<[<]>[.>]>--[>.>]<[<<]>++>>>[.>]>[>]>[.>]<.[[<]<]<<[<]>>-<-]').disp.join('');
