const { checkStatus } = require('./statusChecker');

describe('checkStatus tests', () => {
  test('Check url with status 200 to return 0', () => {
    const urlList = [{ url: 'http://224.1.1.1', status: '200' }];
    expect(checkStatus(urlList)).toBe(0);
  });

  test('Check url with status 400 to return false', () => {
    const urlList = [{ url: 'http://224.1.1.1', status: '400' }];
    expect(checkStatus(urlList)).toBe(1);
  });

  test('Check url with status 404 to return false', () => {
    const urlList = [{ url: 'http://224.1.1.1', status: '404' }];
    expect(checkStatus(urlList)).toBe(1);
  });

  test('Check url with status UNKNOWN to return false', () => {
    const urlList = [{ url: 'http://224.1.1.1', status: 'UNKNOWN' }];
    expect(checkStatus(urlList)).toBe(1);
  });

  test('Check url list with url statuses 200,400,404 to return false', () => {
    const urlList = [
      { url: 'http://224.1.1.1', status: '200' },
      { url: 'http://1.1.1.1.1', status: '404' },
      { url: 'http://abc.go.com/%', status: '400' },
    ];
    expect(checkStatus(urlList)).toBe(1);
  });

  test('Check empty object need return true', () => {
    const urlList = [];
    expect(checkStatus(urlList)).toBe(0);
  });
});
