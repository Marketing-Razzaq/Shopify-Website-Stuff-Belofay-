if (!customElements.get('belofay-product')) {
  class BelofayProduct extends HTMLElement {
    connectedCallback() {
      this.data = JSON.parse(this.querySelector('[data-belofay-variants]').textContent);
      this.addEventListener('change', this.onOptionChange.bind(this));
      this.addEventListener('click', this.onClick.bind(this));
      this.updateSelectedVariant();
      requestAnimationFrame(() => this.updateSelectedVariant());
      this.syncStickyButton();
    }

    onClick(event) {
      const thumb = event.target.closest('[data-gallery-thumb]');
      if (thumb) this.selectMedia(thumb.dataset.galleryThumb);
      const stickyButton = event.target.closest('[data-sticky-submit]');
      if (stickyButton) this.addSelectedVariant(stickyButton, false);
      const addButton = event.target.closest('[data-product-submit]');
      if (addButton) this.addSelectedVariant(addButton, false);
      const buyButton = event.target.closest('[data-buy-now]');
      if (buyButton) this.addSelectedVariant(buyButton, true);
    }

    onOptionChange(event) {
      if (!event.target.matches('[data-belofay-option]')) return;
      const group = event.target.closest('[data-option-position]');
      if (group) {
        group.removeAttribute('data-invalid');
        const optionError = group.querySelector('[data-option-error]');
        if (optionError) optionError.hidden = true;
        const dimensions = group.querySelector('[data-dimensions]');
        if (dimensions) {
          const value = dimensions.querySelector('[data-dimensions-value]');
          if (value) value.textContent = `${event.target.value} W × ${dimensions.dataset.depth} × ${dimensions.dataset.height}`;
          dimensions.hidden = false;
        }
      }
      this.updateSelectedVariant();
      requestAnimationFrame(() => this.updateSelectedVariant());
    }

    updateSelectedVariant() {
      const selected = Array(this.data[0]?.options.length || 0).fill(undefined);
      this.querySelectorAll('[data-option-position]').forEach((group) => {
        selected[Number(group.dataset.optionPosition) - 1] = group.querySelector('[data-belofay-option]:checked')?.value;
      });
      const variant = this.data.find((item) => item.options.every((value, index) => value === selected[index]));
      if (!variant) {
        this.selectedVariant = null;
        return null;
      }
      this.selectedVariant = variant;
      this.querySelectorAll('[data-product-submit], [data-sticky-submit], [data-buy-now]').forEach((button) => {
        button.disabled = this.purchasePending || !variant.available;
        const label = button.querySelector('[data-submit-label]');
        if (label) label.textContent = variant.available ? button.dataset.availableLabel : button.dataset.soldOutLabel;
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
      return variant;
    }

    async addSelectedVariant(button, redirectToCheckout) {
      if (this.purchasePending) return;
      if (!this.validateRequiredOptions()) return;
      const variant = this.updateSelectedVariant();
      if (!variant?.available || button.disabled) return;
      const error = this.querySelector('[data-purchase-error]');
      this.purchasePending = true;
      this.querySelectorAll('[data-product-submit], [data-sticky-submit], [data-buy-now]').forEach((purchaseButton) => {
        purchaseButton.disabled = true;
      });
      button.setAttribute('aria-busy', 'true');
      if (error) error.hidden = true;
      try {
        const cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        const payload = { items: [{ id: variant.id, quantity: 1 }] };
        if (cart?.getSectionsToRender) {
          payload.sections = cart.getSectionsToRender().map((section) => section.id);
          payload.sections_url = window.location.pathname;
        }
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 10000);
        const response = await fetch(`${window.Shopify?.routes?.root || '/'}cart/add.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
        window.clearTimeout(timeout);
        const result = await response.json();
        if (!response.ok) throw new Error(result.description || result.message || 'Unable to add this item.');
        if (redirectToCheckout) {
          window.location.assign(`${window.Shopify?.routes?.root || '/'}checkout`);
          return;
        }
        if (cart?.renderContents) cart.renderContents(result);
        document.dispatchEvent(new CustomEvent('belofay:cart-added', { detail: result }));
      } catch (purchaseError) {
        if (error) {
          error.textContent = purchaseError.message;
          error.hidden = false;
        }
      } finally {
        this.purchasePending = false;
        button.removeAttribute('aria-busy');
        this.updateSelectedVariant();
      }
    }

    validateRequiredOptions() {
      const invalidGroups = [...this.querySelectorAll('[data-option-position]')].filter((group) => {
        const invalid = !group.querySelector('[data-belofay-option]:checked');
        group.toggleAttribute('data-invalid', invalid);
        const optionError = group.querySelector('[data-option-error]');
        if (optionError) optionError.hidden = !invalid;
        return invalid;
      });
      if (!invalidGroups.length) return true;
      const names = invalidGroups.map((group) => group.dataset.optionName).join(' and ');
      const error = this.querySelector('[data-purchase-error]');
      if (error) {
        error.textContent = `Please select ${names} before continuing.`;
        error.hidden = false;
      }
      invalidGroups[0].querySelector('[data-belofay-option]:not(:disabled)')?.focus({ preventScroll: true });
      invalidGroups[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
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
