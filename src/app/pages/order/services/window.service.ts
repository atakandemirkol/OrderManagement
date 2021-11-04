import { Injectable } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  windowRefArr: Array<{
    key: string,
    value: NbWindowRef
  }> = [];
  constructor(private nbWindowService: NbWindowService) { }

  open(content: any, config?: any) {
    if (!config) {
      config = {};
    }
    // config["windowClass"] = "no-border no-margin no-padding";
    let retval = this.nbWindowService.open(content, config);
    this.windowRefArr.push({ key: content.name, value: retval });
    return retval;
  }

  closeDialog(key: string) {
    this.windowRefArr.filter(e => {
      return e.key == key
    })[0].value.close();

    this.windowRefArr.splice(this.windowRefArr.indexOf(this.windowRefArr.filter(e => {
      return e.key == key;
    })[0]), 1);
  }
}
