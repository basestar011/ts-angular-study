import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * 평가 결과가 참으로 평가되면 DOM에서 템플릿을 제거합니다.
 * 평가 결과가 거짓으로 평가되면 DOM에 템플릿을 추가합니다.
 *
 * <div *appUnless="errorCount" class="success">
 *   Congrats! Everything is great!
 * </div>
 *
 * ### 사용법
 *
 * - `<div *appUnless="condition">...</div>`
 * - `<ng-template [appUnless]="condition"><div>...</div></ng-template>`
 *
 */
@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}