/**
 * @description ES6 style class for modal
 */
export default class Modal {
  /**
   * @description constructor for a win modal
   * @param {object} overlay - window element selection
   */
  constructor(overlay) {
    this.overlay = overlay;
    const closeButton = overlay.querySelector('.button-close');
    closeButton.addEventListener('click', this.close.bind(this));
    overlay.addEventListener('click', (e) => {
      if (e.srcElement.id === this.overlay.id) {
        this.close();
      }
    });
  }
  /**
   * @description method for selected window to reveal or make visible
   */
  open() {
    this.overlay.classList.remove('is-not-visible');
  }
  /**
   * @description method for selected window to hide and so 'close'
   */
  close() {
    this.overlay.classList.add('is-not-visible');
  }
}
