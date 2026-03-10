const res = await fetch("https://www.google.com");
const data = await res.json();
console.log(data);