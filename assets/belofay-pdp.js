if (!customElements.get('belofay-product')) {
  class BelofayProduct extends HTMLElement {
    connectedCallback() {
      this.form = this.querySelector('[data-belofay-product-form]');
      this.variantInput = this.querySelector('[data-belofay-variant-id]');
      this.data = JSON.parse(this.querySelector('[data-belofay-variants]').textContent);
      this.addEventListener('change', this.onOptionChange.bind(this));
      this.addEventListener('click', this.onClick.bind(this));
      this.form?.addEventListener('submit', this.onSubmit.bind(this), true);
      this.updateSelectedVariant();
      requestAnimationFrame(() => this.updateSelectedVariant());
      this.syncStickyButton();
    }

    onClick(event) {
      const thumb = event.target.closest('[data-gallery-thumb]');
      if (thumb) this.selectMedia(thumb.dataset.galleryThumb);
      const stickyButton = event.target.closest('[data-sticky-submit]');
      if (stickyButton && this.form) this.form.requestSubmit();
    }

    onOptionChange(event) {
      if (!event.target.matches('[data-belofay-option]')) return;
      this.updateSelectedVariant();
      requestAnimationFrame(() => this.updateSelectedVariant());
    }

    onSubmit() {
      this.updateSelectedVariant();
    }

    updateSelectedVariant() {
      const selected = [...this.querySelectorAll('[data-option-position]')].map((group) => {
        return group.querySelector('[data-belofay-option]:checked')?.value;
      });
      const variant = this.data.find((item) => item.options.every((value, index) => value === selected[index]));
      if (!variant) return;
      this.variantInput.value = variant.id;
      this.variantInput.disabled = !variant.available;
      this.querySelectorAll('[data-product-submit], [data-sticky-submit]').forEach((button) => {
        button.disabled = !variant.available;
        button.querySelector('[data-submit-label]').textContent = variant.available ? button.dataset.availableLabel : button.dataset.soldOutLabel;
      });
      const price = this.querySelector('[data-price-current]');
      if (price) price.textContent = variant.price_formatted;
      const compare = this.querySelector('[data-price-compare]');
      if (compare) {
        compare.textContent = variant.compare_at_price_formatted || '';
        compare.hidden = !variant.compare_at_price_formatted;
      }
      this.querySelectorAll('[data-sticky-variant]').forEach((node) => { node.textContent = variant.title; });
      this.querySelectorAll('[data-sticky-price]').forEach((node) => { node.textContent = variant.price_formatted; });
      if (variant.featured_media_id) this.selectMedia(String(variant.featured_media_id));
      if (variant.url) {
        const nextUrl = new URL(variant.url, window.location.origin);
        const templateView = new URL(window.location.href).searchParams.get('view');
        if (templateView) nextUrl.searchParams.set('view', templateView);
        history.replaceState({}, '', nextUrl);
      }
    }

    selectMedia(id) {
      const target = this.querySelector(`[data-gallery-item="${CSS.escape(id)}"]`);
      if (!target) return;
      this.querySelectorAll('[data-gallery-item]').forEach((item) => {
        item.setAttribute('aria-hidden', String(item.dataset.galleryItem !== id));
      });
      this.querySelectorAll('[data-gallery-thumb]').forEach((thumb) => {
        thumb.setAttribute('aria-current', String(thumb.dataset.galleryThumb === id));
      });
    }

    syncStickyButton() {
      const sticky = this.querySelector('[data-sticky-submit]');
      const main = this.querySelector('[data-product-submit]');
      if (!sticky || !main) return;
      sticky.disabled = main.disabled;
    }
  }
  customElements.define('belofay-product', BelofayProduct);
}
