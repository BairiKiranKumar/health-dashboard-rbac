import { Directive, ElementRef, inject, input, effect, Renderer2, computed } from '@angular/core';
import { uiIcons, IconName } from '../../../assets/icon';

@Directive({
  selector: 'svg[appIcon]',
  standalone: true,
  host: {
    role: 'img',
    '[attr.aria-hidden]': 'isDecorative()',
    '[attr.aria-label]': 'label() || null',
    class: 'app-icon',
  },
})
export class IconDirective {
  private el = inject(ElementRef<SVGElement>);
  private renderer = inject(Renderer2);
  private parser = new DOMParser();

  name = input.required<IconName>();
  label = input<string>();
  size = input<string>('100%');

  private parsedData = computed(() => {
    const rawSvg = uiIcons[this.name()];
    const doc = this.parser.parseFromString(rawSvg, 'image/svg+xml');
    const svgElement = doc.documentElement;
    return {
      viewBox: svgElement.getAttribute('viewBox') || '0 0 24 24',
      content: svgElement.innerHTML,
    };
  });

  protected isDecorative = computed(() => (this.label() ? false : true));

  constructor() {
    effect(() => {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.parsedData().content);
    });
    effect(() => {
      this.renderer.setAttribute(this.el.nativeElement, 'viewBox', this.parsedData().viewBox);
    });
    effect(() => {
      this.renderer.setAttribute(this.el.nativeElement, 'width', this.size());
      this.renderer.setAttribute(this.el.nativeElement, 'height', this.size());
    });
  }
}
