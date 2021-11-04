import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../services/modal.service';
import { OrderService } from '../../../services/order.services';

@Component({
  selector: 'ngx-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  loading: boolean = false;
  @Input() editData: any = null;
  public dataItemForm: FormGroup = new FormGroup({
    orderCode: new FormControl(null, [Validators.required]),
    orderDate: new FormControl(null, [Validators.required]),
    orderTypeId: new FormControl(null, [Validators.required]),
    orderStateId: new FormControl(null, [Validators.required]),
    orderCount: new FormControl(null, [Validators.required]),
    modelId: new FormControl(null, [Validators.required]),
    explanation: new FormControl(null, [Validators.required])
  });
  constructor(private orderService: OrderService, private modalService: ModalService) { }

  ngOnInit() {
    this.setFormValues();
  }
  setFormValues() {
    if (this.editData) {
      this.dataItemForm.controls["orderCode"].setValue(this.editData.orderCode);
      this.dataItemForm.controls["orderDate"].setValue(this.editData.orderDate);
      this.dataItemForm.controls["orderTypeId"].setValue(this.editData.orderTypeId);
      this.dataItemForm.controls["orderStateId"].setValue(this.editData.orderStateId);
      this.dataItemForm.controls["modelId"].setValue(this.editData.modelId);
      this.dataItemForm.controls["explanation"].setValue(this.editData.explanation);
      this.dataItemForm.controls["orderCount"].setValue(this.editData.orderCount);
    }
  }
  cancel() {
    this.modalService.closeDialog(OrderEditComponent.name);
  }
  save() {
    this.loading = true;
    let orderId = 0;
    if (this.editData) {
      orderId = this.editData.orderId;
    }
    let payload = {
      OrderCode: this.dataItemForm.controls["orderCode"].value,
      OrderDate: this.dataItemForm.controls["orderDate"].value,
      OrderTypeId: this.dataItemForm.controls["orderTypeId"].value,
      OrderStateId: this.dataItemForm.controls["orderStateId"].value,
      OrderCount: this.dataItemForm.controls["orderCount"].value,
      ModelId: this.dataItemForm.controls["modelId"].value,
      Explanation: this.dataItemForm.controls["explanation"].value,
      OrderId: orderId,
    }
    if (orderId > 0) {
      this.orderService.updateOrders(payload).subscribe(res => {
        if (res) {
          this.modalService.closeDialog(OrderEditComponent.name, true);
        } else {
          this.modalService.closeDialog(OrderEditComponent.name);
        }
        this.loading = false;
      })
    }
    else {
      this.orderService.saveOrder(payload).subscribe(res => {
        if (res) {
          this.modalService.closeDialog(OrderEditComponent.name, true);
        } else {
          this.modalService.closeDialog(OrderEditComponent.name);
        }
        this.loading = false;
      })
    }
  }
}
