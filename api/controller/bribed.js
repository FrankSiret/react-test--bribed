
const calculate = arr => {
    const n = arr.length;
    const details = [];
    let tooChaotic = false;
    let bribed = 0;
    const swap = (a, i, j) => {
        const t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
    details.push({ queue: [...arr], indexA: -1, indexB: -1 })
    for (let i = n - 1; i >= 0; i--) {
        if (arr[i] !== i + 1) {
            if (arr[i - 1] === i + 1) {
                bribed++;
                swap(arr, i, i - 1);
                details.push({ queue: [...arr], indexA: i, indexB: i - 1 })
            } else if (arr[i - 2] === i + 1) {
                bribed += 2;
                swap(arr, i - 2, i - 1);
                details.push({ queue: [...arr], indexA: i - 1, indexB: i - 2 })
                swap(arr, i - 1, i);
                details.push({ queue: [...arr], indexA: i, indexB: i - 1 })
            }
            else return { tooChaotic: true }
        }
    }
    return {
        tooChaotic,
        bribed,
        details
    }
}

module.exports = calculate