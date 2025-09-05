export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function waitForSecond(second = 1) {
  const ms = second * 1000;
  return new Promise(resolve => setTimeout(resolve, ms));
}
