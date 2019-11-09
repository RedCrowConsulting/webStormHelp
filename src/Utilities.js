// Common functions
// see https://developers.google.com/web/updates/2015/03/introduction-to-fetch
/**
 * a call back used in a chained fetch, it resolves or rejects a fetch it's
 * chained to by examining the status value of the 'response' object
 * fetch(url).then(useHere).then(parseJson).then(dataCB).catch(errorCB)
 * @param { object } response - stream object response from fetch call.
 * see https://streams.spec.whatwg.org/
 * @return { string } - response to thenable or statusText
 */
export const status = (response) => {
  // return Promise.reject(new Error('forced error in fetch stream.'));
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

/**
 * a call back used in a chained fetch
 * fetch(url).then(useHere).then(parseJson).then(dataCB).catch(errorCB)
 * @param { response } response - thenable from stream object response
 * of upstream fetch
 * @return { object } - json
 */
export const json = (response) => {
  return response.json();
};

/**
 * expands a short code for the icon html using selections from
 * awesomefont
 * @param { string } iCode - icon short iCode
 * @return { string } output string of html for icon
 */
export function decodeIconShortCode(iCode) {
  let decode = '';
  switch (iCode) {
    case 'i': // info
      decode = `<i class="material-icons">info</i>`;
      break;
    case 'n': // news
      decode = `<i class="material-icons">chat</i>`;
      break;
    case 'e': // error
      decode = `<i class="material-icons">error_outline</i>`;
      break;
    case 'b': // bug
      decode = `<i class="material-icons">bug_report</i>`;
      break;
    default: // default to error
      decode = `<i class="material-icons">error_outline</i>`;
  }
  return decode;
}

/**
 * returns html table row entry for event errors; these are intended to be
 * erased on refresh
 *
 * @param { object } messagesElement - dom element where news n errors post
 * @param { string } typeCode - error type code used for icons
 * @param { string } title - categorizes or sums error content in few words
 * @param { string } description - describes error details
 * @return { string } errorRowInHtml - string html for error message row
 */
export function makeErrorPosting(messagesElement,
    typeCode, title, description) {
  // clear message posting areas to focus on this event error
  messagesElement.innerHTML = ``;
  const errorObj = {
    id: new Date(),
    articleIconShortCode: typeCode,
    articleTitle: title,
    articleBody: description,
  };

  console.log(errorObj); // eslint-disable-line no-console

  const errorRowInHtml =
    `
    <div class="icon">
      ${decodeIconShortCode(errorObj.articleIconShortCode)}
    </div>
    <div class="article-title">
      ${errorObj.articleTitle}
    </div>
    <div class="article-body">
      ${errorObj.articleBody}
    </div>
    `;

  messagesElement.innerHTML = errorRowInHtml;
  document.querySelector('.messaging').classList.toggle('isError');
  return true;
}
