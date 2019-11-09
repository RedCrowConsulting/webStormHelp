import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

const {JSDOM} = jsdom;

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it('should have h1 that says h1 header', () => {
    const index = fs.readFileSync('./src/index.ejs', 'utf-8');
    const dom = new JSDOM(index);
    const h1 = dom.window.document.getElementsByTagName('h1')[0];
    expect(h1.innerHTML).to.equal('h1 header');
    // if there were an asynch function call inside, we could tell Mocha
    // done();// tells mocha our test is done and needed
    dom.window.close();
  });
});
