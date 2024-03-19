import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NmSplitterDividerComponent } from './nm-splitter-divider/nm-splitter-divider.component';
import { NmSplitterComponent } from './nm-splitter.component';
import { NmSplittertabComponent } from './nm-splittertab/nm-splittertab.component';
import { NmTabComponent } from './nm-tab/nm-tab.component';



@NgModule({
  declarations: [
    NmSplitterComponent,
    NmSplittertabComponent,
    NmTabComponent,
    NmSplitterDividerComponent,
  ],
  imports: [
    FlexLayoutModule,
  ],
  exports: [
    NmSplitterComponent,
    NmSplittertabComponent,
    NmTabComponent,
  ]
})
export class NmSplitterModule { }
