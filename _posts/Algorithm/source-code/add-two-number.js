/**
 * @param a
 * @param b
 * @returns {string}
 */
function add(a,b){
    if(!(+a&&+b)){ return 'error'}
    let a_length = a.length, b_length= b.length;
    let i = a_length-1,j= b_length-1;
    let carry = 0;
    let res = '';
    while(i>= 0 && j>=0){
        let sum  = +a[i]+(+b[j])+carry
        carry = sum > 9 ? 1 : 0;
        res =  ''+(sum % 10)+res;
        i--;
        j--;
    }
    if(i>=0){
        return (a.substring(0,i+1)+res)
    }
    if(j>=0){
        return (b.substring(0,j+1)+res)
    }
    return (carry === 1 ? ''+carry+res :res)
}



