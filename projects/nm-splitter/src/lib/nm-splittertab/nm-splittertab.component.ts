import { Component, ContentChildren, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Resizing } from '../nm-splitter-divider/models/resizing.model';
import { NmTabComponent } from '../nm-tab/nm-tab.component';



@Component({
  selector: 'nm-splittertab',
  templateUrl: './nm-splittertab.component.html',
  styleUrls: ['./nm-splittertab.component.scss']
})
export class NmSplittertabComponent implements OnInit {
  @ContentChildren(NmTabComponent) splitContainers! : QueryList<NmTabComponent>;
//  @ContentChildren(NmSplitterDividerComponent) dividerContainers! : QueryList<NmSplitterDividerComponent>;
  @ViewChildren("elReference") contentChildren: QueryList<ElementRef> | undefined;
  
  @Input() splithoriz: boolean = true;
  @Input() moveable: boolean = true;


  mylayout: string = "column";
  splitterw: string = "100%";
  splitterh: string = "5px";
  splittercolor: string = "blue";
  splittercursor: string = 'ns-resize';

  mouseDowned: boolean = false;
  componentCount: number = 0;
  totalSize: number = 0;

  splitPercents: string[] = [];
  panels: any[] = [];
  selectedPanel: number = -1;
  dividerLocation?: number;
  sumFixed: number = 0;

  @ViewChild('mainPanel') elementView?: ElementRef;

  separatorList: boolean[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    this.initSeparators();
    
  }

  

  ngAfterContentInit() {
    this.initSplitter();
    
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.initSizes();
    });  
    

  }



  initSizes() {
    let ind: number =0;
    this.totalSize = 0;
    this.contentChildren!.forEach(item => {
      this.panels[ind].vstart = item.nativeElement.getBoundingClientRect().left;
      this.panels[ind].vend = item.nativeElement.getBoundingClientRect().right;
      if (this.splithoriz) {
        this.panels[ind].vstart = item.nativeElement.getBoundingClientRect().top;
        this.panels[ind].vend = item.nativeElement.getBoundingClientRect().bottom;
      }
      this.panels[ind].vsize = this.panels[ind].vend - this.panels[ind].vstart;
      this.totalSize += this.panels[ind].vsize;
      ind++;
    });
    this.calcPercents();
  }

  calcPercents() {
    let ind = 0;
    this.panels.forEach(item => {
      item.vsize = item.vend - item.vstart;
      if (!item.fixed) {
        item.rateSize = item.vsize / this.totalSize * 100;
        this.splitPercents[ind]=item.rateSize + "%";
      }
      ind++;
    });
  }

  initSeparators() {
    this.separatorList = [];
    for (let i = 0; i<this.componentCount; i++) {
      if (i==0) {
        this.separatorList.push(false);
      } else {
        if (this.panels[i-1].fixed) {
          this.separatorList.push(false);
        } else {
          if (this.panels[i].fixed) {
            this.separatorList.push(false);
          } else {
            this.separatorList.push(this.moveable);
          }
        }
      }
    }
    

  }

  initSplitter() {
    this.splitPercents = [];
    this.componentCount = this.childrensLength();
    this.initSeparators();
    if (this.splithoriz) {
      this.mylayout="column";
      this.splitterw = "100%";
      this.splitterh = "5px";
      this.splittercolor = "blue";
      this.splittercursor = 'ns-resize';
    } else {
      this.mylayout="row";
      this.splitterw = "5px";
      this.splitterh = "100%";
      this.splittercolor = "blue";
      this.splittercursor = 'ew-resize';
    }
    if (!this.moveable) {
      this.splittercursor = 'auto';
    }

  }

  

  childrensLength(): number {
    let totalRate: number = 0;
    this.sumFixed = 0;
    this.splitContainers.forEach((item) => {
      this.panels.push(item);
      if (item.fixed) {
        this.sumFixed += item.rateSize;
      } else {
        totalRate += item.rateSize;
      }
    });

    this.splitContainers.forEach((item) => {
      if (!item.fixed) {
        item.rateSize = (item.rateSize / totalRate) * 100;
      }
      if (item.fixed) {
        if (item.rateSize>0) {
          this.splitPercents.push(item.rateSize + "px");
        } else {
          this.splitPercents.push("");
        }
      } else {
        this.splitPercents.push(item.rateSize + "%");
      }
    });

    return this.splitContainers ? this.splitContainers.length : -1;
  }

  mousemoveondivider(e: any) {
    if (this.mouseDowned && this.moveable && this.selectedPanel>-1) {
      let mousePos: number = e.clientX + window.scrollX;// - this.elementView!.nativeElement.getBoundingClientRect().x;
      if (this.splithoriz) {
        mousePos = e.clientY + window.scrollY; // - this.elementView!.nativeElement.getBoundingClientRect().y;
      }
      let start: number = this.panels[this.selectedPanel-1].vstart;
      let nextstart: number = this.panels[this.selectedPanel].vend;
      if (mousePos>(start + this.panels[this.selectedPanel-1].minSize) && mousePos<(nextstart - this.panels[this.selectedPanel].minSize)) {
        this.panels[this.selectedPanel-1].vend = mousePos;
        this.panels[this.selectedPanel].vstart = mousePos;
        this.calcPercents();
      }
    }

  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e : any) {
    this.mousemoveondivider(e);
  }


  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e : any) {
      this.mouseDowned = false;
      this.selectedPanel = -1;
  }

  setResizing(resize: Resizing) {
   

    this.mouseDowned = resize.isResizing;
    this.selectedPanel = resize.dividerIndex;
  }

}
