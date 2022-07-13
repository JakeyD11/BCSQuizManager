export function randomize(arr) {
    const random = [];
    for (let i = arr.length; i > 0; i--) {
        const n = Math.floor(Math.random() * arr.length);
        random.push(arr[n]);
        arr = arr.filter((_, i) => i !== n);
    }

    return random;
}