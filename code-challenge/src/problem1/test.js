var sum_to_n_a = function (n) {
    let sum = 0
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    return sum
};

var sum_to_n_b = function (n) {
    if (n === 1) {
        return 1
    } else {
        return n + sum_to_n_b(n - 1)
    }
};

var sum_to_n_c = function (n) {
    const arrNumber = Array.from({ length: n }, (_, index) => index + 1)
    return arrNumber.reduce((accumulator, value) => accumulator + value, 0)
};
