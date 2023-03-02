const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  console.log('there is no fetch in server');
}
