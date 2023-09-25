//计算三角形面积
function triangleArea(bottom,height){
    return area=bottom*height/2;
}
//箭头函数
let trianglearea1=(bottom,height)=>{
    return area=bottom*height/2;
}

// 打印两个数值之间的所有素数
function primeNumber(n1, n2) {
    for (let n = n1 + 1; n < n2; n++) {
        let isPrime = true;
        for (let x = 2; x <= n / 2; x++) {
            if (n % x === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            console.log(n);
        }
    }
}



