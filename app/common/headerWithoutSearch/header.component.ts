import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Subscriber } from 'rxjs/Rx';
import { Angulartics2On } from 'angulartics2';
import { MainMenuComponent } from '../menu/menu.component';

let tpl = require('./header.template.html');
let style = require('./header.css');

@Component({
  selector: 'header',
  template: tpl,
  styles: [style],
  directives: [MainMenuComponent, ROUTER_DIRECTIVES, Angulartics2On]
})

export class HeaderWithoutSearchComponent implements OnInit, OnDestroy {
  @Input()
  protected title: string;
  @Input()
  protected subTitle: string;

  private defaultThing: any;
  private headerService: any;
  private headerServiceSubscribe: Subscriber;

  public constructor(@Inject('HeaderService') headerService: any) {
    this.headerService = headerService;
  }

  public ngOnInit(): void {
    this.headerServiceSubscribe = this.headerService.getDefaultThing()
      .subscribe((res: any) => {
        if (res.err) {
          console.error(res.err);
          return;
        }

        this.defaultThing = res.data;
      });
  }

  public ngOnDestroy(): void {
    this.headerServiceSubscribe.unsubscribe();
  }
}
