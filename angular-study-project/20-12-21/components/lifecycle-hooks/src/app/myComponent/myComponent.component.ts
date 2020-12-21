import { Component } from '@angular/core';

// @Component 데코레이터
@Component({
    selector : 'my-component-overview', // css 셀렉터
    templateUrl : './my-component-overview.component.html', // html 템플릿
    /* 직접 정의시 template 선언
     * templateUrl, template 중 하나는 반드시 정의해야 하고 두개를 동시에 지정 불가
    template : `<h1>Hello World!</h1>
                <p>This template definition spans
                multiple lines.</p>`
    */
    styleUrls : ['./my-component-overview.component.css'] // 스타일 css
    /* 직접 정의시 styles 선언
     * styles : ['h1 { font-weight: normal; }']
     */
})

// 컴포넌트 클래스 정의 구문
export class myComponentOverviewComponent {

}

