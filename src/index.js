import './index.scss';
import * as Utl from './Utilities';
import * as LevelOne from './LevelOneContext';
import 'whatwg-fetch';
import getBaseUrl from '../src/api/baseUrl';
import {
  MDCRipple,
} from '@material/ripple';
import Modal from './Modal';

/**
 *
 */
document.addEventListener('DOMContentLoaded', (e) => {
  // debugger;
  fetchTheNews();
  enableLevelOneDrillDown();
  setRippleEffectsOnButtons();
  makeGenericModalAvailable();
});

/**
 *
 */
const fetchTheNews = () => {
  // prep for fetch calls
  const baseUrl = getBaseUrl();

  /**
   *   Get the news from json API and populate on page
   *   fetch(url).then(status).then(parseJson).then(dataCB).catch(errorCB)
   */
  fetch(baseUrl + 'news').then(Utl.status).then(Utl.json)
      .then((data) => {
        let newsPostings = '';
        data.forEach((posting) => {
          newsPostings +=
          `
          <div class="icon">
          ${Utl.decodeIconShortCode(posting.articleIconShortCode)}
          </div>
          <div class="article-title">
          ${posting.articleTitle}
          </div>
          <div class="article-body">
          ${posting.articleBody}
          </div>
          `;
        });
        document.getElementById('messages').innerHTML = newsPostings;
      // console.log(newsPostings); // eslint-disable-line no-console
      })
      .catch((error) => {
        console.log( // eslint-disable-line no-console
            `Problem getting news: `,
            error);
        Utl.makeErrorPosting(
            document.getElementById('messages'),
            `e`,
            `Oops!`,
            `Problem getting news. Refresh and try again.
          If you're technical, the console has more detail.`);
      }); // end get the news fetch
}; // end fetchTheNews

/**
 *
 */
const enableLevelOneDrillDown = () => {
  // actions for listing pipeline phase clicks or provider grouping clicks
  const phasesAndGroups = document
      .querySelectorAll('.pipeline-phase, .provider-group');

  Array.from(phasesAndGroups, (box) => {
    box.onclick = (e) => {
      box.style.backgroundColor = '#6200ee';
      e.preventDefault();
      LevelOne.makeLevelOneContextDiv(
          document,
          (e.target.attributes['data-id'].value)
      );
      new MDCRipple(document.querySelector('.return'));
      box.style.backgroundColor = '#008080';
    };

    box.onmousedown = (e) => {
      // e.preventDefault();
      box.style.backgroundColor = '#6200ee';
    };

    box.onmouseup = (e) => {
      // e.preventDefault();
      box.style.backgroundColor = '#008080';
    };

    // add hover pointers and styling
    box.onmouseover = (e) => {
      e.preventDefault();
      box.style.cursor = 'pointer';
    };
    // add event listener for keydown keyup keypress
    box.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        box.style.backgroundColor = '#6200ee';
      }
    };

    box.onkeyup = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        box.style.backgroundColor = '#008080';
        box.click();
      }
    };
  }); // end array of boxes
};

/**
 *
 */
const setRippleEffectsOnButtons = () => {
  // RIPPLE EFFECTS - querySelectorAll and then add ripple effect to mdc buttons
  const buttonArray = Array.from(document.querySelectorAll('.mdc-button'));
  buttonArray.map((ele) => new MDCRipple(ele));
};

/**
 *
 */
const makeGenericModalAvailable = () => {
  // GENERIC MODAL TEST - enalbes modal from create buttons
  const modal = new Modal(document.querySelector('.modal-overlay'));
  window.openModal = modal.open.bind(modal);
};
