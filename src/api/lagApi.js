import 'whatwg-fetch';
import getBaseUrl from './baseUrl';
import * as Utl from '../Utilities';

const baseUrl = getBaseUrl();

export function deleteNewsPostings(id) {
  // debugger; // eslint-disable-line no-debugger
  return del(`news/${id}`);
}

export function deleteErrorPosting(id) {
  // debugger; // eslint-disable-line no-debugger
  return del(`errors/${id}`);
}


// private functions abstract fetch, promise resolution w success and error
// handling you may also want other private functions beside get like
// put, post, and delete
// function get(url) {
//   return fetch(baseUrl + url).then(onSuccess, onError);
// }

function del(url) { // not called delete as it's a reserved word
  const request = new Request(baseUrl + url, {
    method: 'DELETE',
  });

  return fetch(request)
      .then(Utl.status)
      .then(Utl.json)
      .then() // dataCB
      .catch((error) => {
        console.log( // eslint-disable-line no-console
            `Problem deleting: `,
            error);
        console.log( // eslint-disable-line no-console
            `This is expected if running in development.`);

        Utl.makeErrorPosting(
            document.getElementById('messages'),
            `e`,
            `Oops!`, `Problem deleting. Refresh and try again. If you're
            technical, the console has more detail.`
        );

      // TODO: send eMessage to common postErrorEvent logic
      });
  // return; // simple return as not deleted on api, one way messaging
}

// note: on Server: Repository pattern abstracts away database
// here, this centralized API Proxy: abstracts away HTTP API
// one place to handle all of our ajax calls
// one place to configure if base url changes in different environments
