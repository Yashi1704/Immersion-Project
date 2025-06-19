function outer(){
    var money=50;
    function inner(){
        money++;
        var x=10;
        function innermost(){
            x++;
            console.log(money,x);

        }
        return innermost;
    }
    return inner;
}
let fun1=outer();
let fun2=outer();
let fun3=outer();
let a=fun1();
let b=fun2();
let c =fun3();
a();
a();
b();
a();
c();