import { Component, ViewContainerRef, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { WindowsManager } from '@astonio/ui';
import { Backend, ListModel } from '@astonio/core';
import { ModelWindowsDispatcher } from '@astonio/model-ui';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) containerVCR;
  tables:ListModel[] = [];
 
  constructor(private wm:WindowsManager, private mwd:ModelWindowsDispatcher, private vcr:ViewContainerRef, private backend:Backend, private cdr:ChangeDetectorRef) {
    this.backend.bootstrapped.subscribe(() => {
      this.tables = [...this.backend.listModels.values()]; 
      this.cdr.detectChanges();
    });	
  }
 
  openListWindow(listModel:ListModel) {
    var wndClass = this.mwd.getListWindow(listModel);
    var wnd = this.mwd.getListWindow(listModel, false, null, true).subscribe(wndInfo => {
      new wndInfo.window(this.wm, null, Object.assign({}, wndInfo.windowOptions, {list:listModel}));
    });
  }
 
  ngOnInit() {
    this.wm.initVCR(this.containerVCR); 
  }
}