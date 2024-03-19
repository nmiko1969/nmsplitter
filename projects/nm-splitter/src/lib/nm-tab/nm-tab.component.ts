import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';



@Component({
  selector: 'nm-tab',
  templateUrl: './nm-tab.component.html',
})
export class NmTabComponent implements OnInit {
  @Input() rateSize: number = 30;
  @Input() minSize: number = 0;
  @Input() fixed: boolean = false;

  rateString?: string;

  @ContentChild(TemplateRef)
  template: TemplateRef<any> | undefined;

  public vsize: number = 0;
  public vstart: number = 0;
  public vend: number = 0;
  public reCountered: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.rateString = this.rateSize + "%";
  }

  ngAfterViewInit() {
  }

  ngOnChanges(): void {
    this.rateString = this.rateSize + "%";
  }


}
