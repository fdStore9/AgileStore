import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormat]'
})
export class CurrencyFormatDirective {
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.value.replace(/[^0-9.]/g, '');
    if (input) {
      const parts = input.split('.');
      let integerPart = parts[0];
      const decimalPart = parts[1] ? parts[1].slice(0, 2) : '';

      integerPart = integerPart.replace(/^0+(?!$)/, ''); // Elimina ceros a la izquierda
      let formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      if (decimalPart) {
        formatted += `.${decimalPart}`;
      }

      this.el.value = `$${formatted}`;
    } else {
      this.el.value = '';
    }
  }
}
