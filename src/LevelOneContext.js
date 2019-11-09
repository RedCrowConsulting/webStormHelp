// Create a level one context interaction
import * as Utl from './Utilities';

/**
 * removes messaging
 * removes previous level-one-context if present
 * creates a new level one context per parameters
 * appends new div to body ready for further population
 *
 * @param { object } doc - HTMLDocument global document, the DOM
 * @param { string } experienceName - name of new context for header and for
 * getting the content
 * @return { boolean } true false on success
 */
export function makeLevelOneContextDiv(doc, experienceName) {
  const levelOneContent = getLevelOneContent(experienceName);
  if (levelOneContent) {
    // Remove any context if there (not likely)
    const elem = doc.getElementById('fresh-level-one-context');
    if (elem) {
      elem.parentNode.removeChild(elem);
    }
    // clear the messaging
    const messageElem = doc.getElementById('messages');
    messageElem.innerHTML = '';
    if (messageElem.classList.contains('hasPadding')) {
      messageElem.classList.toggle('hasPadding');
    }

    // none the display of level zero sections, so content is right sized
    // and no interference
    // from focus able items under level 1
    // restore the level-zero under level one
    const levelZero = document.querySelectorAll('.level-zero');
    Array.from(levelZero, (lzItem) => {
      lzItem.classList.add('is-not-visible');
    });

    // create a new div ready for drill down content
    const div = document.createElement('div');
    div.setAttribute('class', 'fresh-level-one-context');
    div.setAttribute('id', 'fresh-level-one-context');

    // this code should be tied to the event click, set content & append child
    div.innerHTML=
  `<h2 class="level-one-header">
    <button class="mdc-button mdc-button--outlined level-one-mdc-button return"
     tabindex="1">
      <i class="material-icons mdc-button__icon"
        aria-hidden="true">arrow_back
      </i>
      <span class="mdc-button__label">return</span>
    </button>
    ${experienceName}
  </h2>
  <div id="level-one-content" class="level-one-content">
    ${levelOneContent}
  </div>`;
    doc.body.appendChild(div);
    // set focus to scroll to top if content and viewport place us at bottom
    // on first paint
    document.querySelector('.return').focus();

    // set return button's logic to remove the level one context when ready
    const returnSurfaces = document.querySelectorAll('.return');
    Array.from(returnSurfaces, (surface) => {
      surface.onclick = (event) => {
        event.preventDefault();
        const context = doc.getElementById('fresh-level-one-context');

        // restore the level-zero under level one
        const levelZero = document.querySelectorAll('.level-zero');
        Array.from(levelZero, (lzItem) => {
          lzItem.classList.remove('is-not-visible');
        });
        // remove level one to reveal level-zero
        context.parentNode.removeChild(context);
      };

      surface.onkeyup = (e) => {
        if (e.key === 'Escape') {
          surface.click();
        }
      };
    });

    return true;
  } else {
    return false;
  }
} // end makeLevelOneContextDiv

function getLevelOneContent(experience) {
  let levelOneContent = '';
  // New, Contracted, Completed, Archived or Browse Providers, Do It yourself

  switch (experience) {
    case 'New':
      {levelOneContent = getNewLevelOneContentListings();}
      break;
    case 'Contracted':
      {levelOneContent = getContractedLevelOneContentListings();}
      break;
    case 'Completed':
      {levelOneContent = getCompletedLevelOneContentListings();}
      break;
    case 'Archived':
      {levelOneContent = getArchivedLevelOneContentListings();}
      break;
    case 'Browse Providers':
      {levelOneContent = getBrowseProvidersLevelOneContent();}
      break;
    case 'Do It Yourself':
      {levelOneContent = getDoItYourselfLevelOneContent();}
      break;
    default:
    {
      Utl.makeErrorPosting(
          document.getElementById('messages'),
          `e`,
          `Oops!`,
          `Could not create content for '${experience}'.`);
    }
  } // end switch
  return levelOneContent;

  // ENCLOSED functions
  function getNewLevelOneContentListings() {
    return `
    :-o <br><br>not yet coded
    `;
  } // end getNewLevelOneContentListings
  function getContractedLevelOneContentListings() {
    return `
    :-o <br><br>not yet coded
    `;
  }
  function getCompletedLevelOneContentListings() {
    return `
    :-o <br><br>not yet coded
    `;
  }
  function getArchivedLevelOneContentListings() {
    return `
    :-o <br><br>not yet coded
    `;
  }
  function getBrowseProvidersLevelOneContent() {
    return `
    <div class="level-one-providers">
        <p>Professional listings are presented as entered by users.</p>
      <article class="provider-info">
        <h2>Red Crow Consulting</h2>
        <p>
  Creators of <a class="individual-info-link" href="https://github.com/rudimusmaximus/DevFlow">DevFlow</a> and this site. Please consider us or any of the providers
   listed here. We specialize in:
        </p>
        <ul class="specialities">
          <li><a class="provider-info-link" href="https://subscriptionplus.redcrowmethods.com">Small Business Owner Coaching</a></li>
          <li><strong>Process Automation</strong> via Sheets Add-ons</li>
          <li><strong>XYZ Team Enablement</strong></li>
          <li><strong>Kick Start / Time Boxed Efforts</strong> at day rates</li>
          <li><strong>Add-ons</strong> coming soon</li>
        </ul>
      </article>
      <article class="provider-info">
        <h2>Expert Company</h2>
        <p>Example x Developer Expert who x, y, z
          </br>We specialize in:
        </p>
        <ul class="specialities">
          <li>3 month+ projects</li>
          <li>Staff augmentation on site</li>
          <li>Custom apps</li>
          <li>Support contracts</li>
          <li><a class="individual-info-link" href="https://via.placeholder.com/220x140?text=future404">Professional web site</a></li>
        </ul>
      </article>
      <article class="provider-info">
        <h2>Enthusiast</h2>
        <p>Example Independent Contractor, XYZ enthusiast, I specialize in:
        </p>
        <ul class="specialities">
          <li>Custom functions</li>
          <li>Custom menu functions</li>
          <li>Hourly with four hour min</li>
          <li>Internships less than six months </li>
          <li><a class="individual-info-link" href="https://via.placeholder.com/220x140?text=future404">LinkedIn profile</a></li>
        </ul>
      </article>
    </div>
    `;
  }
  function getDoItYourselfLevelOneContent() {
    return `
    <div class="level-one-providers">
      <article class="provider-info">
        <h2>Discussion Communities</h2>
        <p>Most of these groups are open to all.
          Try them all:
        </p>
        <ul class="specialities">
          <li><a class="provider-info-link" href="https://via.placeholder.com/220x140?text=future404">TBD link 1</a></li>
          <li><a class="provider-info-link" href="https://via.placeholder.com/220x140?text=future404">TBD link 2</a></li>
          <li><a class="provider-info-link" href="https://via.placeholder.com/220x140?text=future404">TBD link 3</a></li>
          <li><a class="provider-info-link" href="https://via.placeholder.com/220x140?text=future404">TBD link 4</a></li>
        </ul>
      </article>
      <article class="provider-info">
        <h2>Research Tools</h2>
        <h3>Make Notes - Collect. Annotate. Organize. Share.</h3>
        <ul class="research-tools-mastery">
          <li><a class="references-info-link" href="https://www.diigo.com/index">Diigo</a> - amazing tool with over 9 million users</li>
          <li><a class="references-info-link" href="https://dillinger.io/">Dillinger.io</a> - realtime markdown</li>
        </ul>
        <h3>Organize - tab managers and browser productivity</h3>
        <ul class="research-tools-browser-org">
          <li><a class="references-info-link" href="https://momentumdash.com/">Momentum</a> - Personal dashboard with integrated to do</li>
          <li><a class="research-info-link" href="https://www.one-tab.com/">OneTab</a> - Convert open tabs to a list and free up memory</li>
          <li><a class="research-info-link" href="https://workona.com">Workona</a> - Workspaces for Chrome</li>
        </ul>
      </article>
      <article class="provider-info">
        <h2>Selected References</h2>
        <h3>X - y sites, issue tracking, store 1, store 2</h3>
        <ul class="selected-references">
          <li><a class="references-info-link" href="https://">link</a> - tbd</li>
        </ul>
        <h3>Community Favorites - awesome list, stack overflow</h3>
        <ul class="selected-references2">
        <li><a class="references-info-link" href="https://">link</a> - tbd</li>
        </ul>
      </article>
    </div>
    `;
  }
  // end ENCLOSED functions
} // end getLevelOneContent
