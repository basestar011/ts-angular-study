import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Directive,
    DoCheck,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { Component, Input } from '@angular/core';
import { LoggerService } from './logger.service';

let nextId = 1;

@Directive()
export class PeekABooDirective implements OnInit {
    constructor(private logger: LoggerService) { }

    ngOnInit() { this.logIt(`OnInit`); }

    logIt(msg: string) {
        this.logger.log(`#${nextId++} ${msg}`);
    }
    
}

@Component({
    selector: 'peek-a-boo',
    template: '<p>Now you see my hero, {{name}}</p>',
    styles: ['p {background: LightYellow; padding: 8px}']
})

export class PeekABooComponent extends PeekABooDirective implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy
{
    @Input()  name: string;

    private verb = 'initialized';

    constructor(logger: LoggerService) {
        super(logger);

        const is = this.name ? 'is' : 'is not';
        this.logIt(`name ${is} known at construction`);
    }

    ngOnChanges(changes: SimpleChanges) {
        const changesMsgs: string[] = [];
        for (const propName in changes) {
            if (propName === 'name') {
                const name = changes.name.currentValue;
                changesMsgs.push(`name ${this.verb} to "${name}"`);
            } else {
                changesMsgs.push(propName + ' ' + this.verb);
            }
        }
        this.logIt(`OnChanges: ${changesMsgs.join('; ')}`);
        this.verb = 'changed';
    }

    ngDoCheck() { this.logIt(`DoCheck`); }

    ngAfterContentInit() { this.logIt(`AfterContentInit`);  }

    ngAfterContentChecked() { this.logIt(`AfterContentChecked`); }

    ngAfterViewInit() { this.logIt(`AfterViewInit`); }

    ngAfterViewChecked() { this.logIt(`AfterViewChecked`); }

    ngOnDestroy() { this.logIt(`OnDestroy`); }
}