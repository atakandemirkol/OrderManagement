import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';

@Injectable()
export class ModalService {
  //dialogRef: NbDialogRef<any>;
  dialogRefArr = [];
  constructor(private nbDialogService: NbDialogService) { }

  openDialog(content: any, config?: any) {
    if (!config) {
      config = {};
    }
    config["closeOnEsc"] = false;
    config["closeOnBackdropClick"] = false;
    let retval = this.nbDialogService.open(content, config);
    this.dialogRefArr.push({ key: content.name, value: retval });
    return retval;
  }

  closeDialog(key: string, data?: any) {
    this.dialogRefArr.filter(e => {
      return e.key == key
    })[0].value.close(data);

    this.dialogRefArr.splice(this.dialogRefArr.indexOf(this.dialogRefArr.filter(e => {
      return e.key == key;
    })[0]), 1);
  }

  onCloseDialog(key: string): Observable<any> {
    return new Observable(observer => {
      this.dialogRefArr.filter(e => {
        return e.key == key
      })[0].value.onClose.subscribe(res => {
        observer.next(res);
      });
    });
  }

}
