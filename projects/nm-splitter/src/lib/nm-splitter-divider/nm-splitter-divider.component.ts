import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Resizing, getEmpty } from './models/resizing.model';

@Component({
  selector: 'app-nm-splitter-divider',
  templateUrl: './nm-splitter-divider.component.html',
  styleUrls: ['./nm-splitter-divider.component.scss']
})
export class NmSplitterDividerComponent implements OnInit {
  @Input() splithoriz: boolean = true;
  @Input() moveable: boolean = true;
  @Input() dividerIndex: number = 0;
  @Output() resizeout = new EventEmitter();
  splitterw: string = "100%";
  splitterh: string = "5px";
  splittercolor: string = "#818078";
  splittercursor: string = "ns-resize";
  
  
  resizing: Resizing = getEmpty();

  constructor() { }

  ngOnInit(): void {
    if (!this.splithoriz) {
      this.splitterw="5px";
      this.splitterh="100%";
      this.splittercursor="ew-resize";
    }
  }

  initMousePos(event: any) {
    this.resizing.mousePos = event.clientX;
    this.resizing.isResizing = true;
    this.resizing.dividerIndex = this.dividerIndex;
    this.sendResized();
  }

  
  onMouseUp(e : any) {
    this.resizing.isResizing = false;
    this.resizing.dividerIndex = this.dividerIndex;
    this.sendResized();
  }

  sendResized() {
    this.resizeout.emit(this.resizing);
  }

}
