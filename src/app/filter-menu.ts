import { Component, ElementRef, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';

export interface FilterOption { value: string; label: string }

@Component({
  selector: 'app-filter-menu',
  template: `
    <div class="filter-menu">
      <button type="button" class="filter-trigger" (click)="open = !open"
        [attr.aria-label]="'Filtrar por ' + title.toLowerCase() + ': ' + selectedLabel"
        [attr.aria-expanded]="open" [attr.aria-controls]="menuId">
        <span class="filter-caption">{{title}}</span><span class="filter-value">{{selectedLabel}}</span>
        <span class="filter-chevron" aria-hidden="true">⌄</span>
      </button>
      @if(open){
        <div class="filter-options" [id]="menuId" role="group" [attr.aria-label]="'Opciones de ' + title.toLowerCase()">
          @for(option of options;track option.value){
            <button type="button" class="filter-option" [class.selected]="option.value === value"
              [attr.aria-pressed]="option.value === value" (click)="choose(option.value)">
              <span>{{option.label}}</span>@if(option.value === value){<span aria-hidden="true">✓</span>}
            </button>
          }
        </div>
      }
    </div>`,
  styles: [`
    :host{display:block;min-width:150px}
    .filter-menu{position:relative;height:52px}
    .filter-trigger{width:100%;height:100%;display:flex;align-items:center;gap:10px;text-align:left;border:1px solid #e9e8e1;background:#fff;border-radius:10px;padding:0 14px;cursor:pointer;color:#24374a;font:inherit}
    .filter-trigger:hover,.filter-trigger[aria-expanded=true]{border-color:#df7770;box-shadow:0 3px 12px #1833490e}
    .filter-trigger:focus-visible,.filter-option:focus-visible{outline:2px solid #bd4845;outline-offset:2px}
    .filter-caption{font-size:11px;color:#88949c}.filter-value{font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px}.filter-chevron{margin-left:auto;font-size:17px;color:#d65d58;line-height:1}
    .filter-options{position:absolute;z-index:4;top:calc(100% + 7px);left:0;min-width:100%;width:max-content;max-width:min(300px,85vw);max-height:260px;overflow-y:auto;background:white;border:1px solid #ebe9e2;border-radius:12px;padding:6px;box-shadow:0 14px 35px #122b4229;scrollbar-color:#d6ded9 transparent;scrollbar-width:thin}
    .filter-option{width:100%;border:0;background:transparent;border-radius:7px;padding:10px 11px;display:flex;justify-content:space-between;gap:15px;text-align:left;font:600 12px 'DM Sans',sans-serif;color:#354d5b;cursor:pointer;text-transform:capitalize}
    .filter-option:hover,.filter-option:focus-visible{background:#f5f8f3}.filter-option.selected{background:#fff1ec;color:#c6544f}
    @media(max-width:760px){:host{width:100%}.filter-value{max-width:none}.filter-options{width:100%;max-width:none}}
  `]
})
export class FilterMenu {
  @Input({ required: true }) title = '';
  @Input({ required: true }) menuId = '';
  @Input() value = '';
  @Input() options: FilterOption[] = [];
  @Output() valueChange = new EventEmitter<string>();
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  open = false;
  get selectedLabel(): string { return this.options.find(option => option.value === this.value)?.label ?? ''; }
  choose(value: string): void { this.open = false; if (value !== this.value) this.valueChange.emit(value); this.host.nativeElement.querySelector<HTMLButtonElement>('.filter-trigger')?.focus(); }
  @HostListener('document:click', ['$event.target']) outside(target: EventTarget | null): void { if (target instanceof Node && !this.host.nativeElement.contains(target)) this.open = false; }
  @HostListener('document:keydown.escape') escape(): void { if (this.open) { this.open = false; this.host.nativeElement.querySelector<HTMLButtonElement>('.filter-trigger')?.focus(); } }
}
