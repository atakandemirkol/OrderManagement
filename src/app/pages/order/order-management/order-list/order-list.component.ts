import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { ModalService } from '../../services/modal.service';
import { OrderService } from '../../services/order.services';
import { OrderEditComponent } from '../order-edit/order-edit/order-edit.component';

@Component({
  template: `
  <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
    <mat-icon><i class="fas fa-bars"></i></mat-icon>
  </button>
  <mat-menu #menu="matMenu">
    <button mat-menu-item (click)="getOrder(renderValue)"><i class="nb-edit"></i> Edit</button>
    <button mat-menu-item (click)="deleteOrder(renderValue)"><i class="nb-trash"></i> Delete</button>
  </mat-menu>
  `,
})

export class CustomActionRenderComponent implements OnInit {
  resArray: Array<any> = [];
  renderValue: number;
  cellValue: any = null;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  source: LocalDataSource = new LocalDataSource();

  constructor(
    public router: Router, private orderService: OrderService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.cellValue = this.rowData;
    this.renderValue = this.cellValue.orderId as number;
  }

  getOrder(orderId: number) {
    //this.orderService.getById(orderId).subscribe(res => {
    let addWindow = this.modalService.openDialog(OrderEditComponent, {
      context: {
        editData: this.rowData
      }
    });
    addWindow.onClose.subscribe(selec => {
      this.save.emit("saved");
    })
  }
  deleteOrder(param: number) {
    this.orderService.deleteOrder(param).subscribe(res => {
      this.save.emit("deleted");
    })
  }
}

@Component({
  selector: 'ngx-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() rowData: any;
  resArray: Array<any> = [];
  loading: boolean = false;
  source: LocalDataSource = new LocalDataSource();

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
      custom: [
      ],
    },
    columns: {
      orderId: {
        filter: false,
        title: '#',
        type: 'custom',
        renderComponent: CustomActionRenderComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe(res => {
            console.log("Fired", res);
            if (res == "saved" || res == "deleted") {
              console.log("Load Data sqved");
              this.loading = true;
              this.orderService.getAllOrders().subscribe(res => {
                this.source = new LocalDataSource()
                this.resArray = res;
                this.source.load(this.resArray);
                this.loading = false;
              })
            }
          })

        }
      },
      orderCode: {
        title: 'Order Code',
        type: 'string',
      },
      orderDate: {
        title: 'Order Date',
        type: 'string',
      },
      orderTypeId: {
        title: 'Order Type Id',
        type: 'number',
      },
      orderStateId: {
        title: 'Order State Id',
        type: 'number',
      },
      orderCount: {
        title: 'Order Count',
        type: 'number',
      },
      modelId: {
        title: 'Model Id',
        type: 'number',
      },
      explanation: {
        title: 'Explanation',
        type: 'string',
      },
    },
  };


  constructor(private orderService: OrderService, private modalService: ModalService) {
    // 
    this.loading = true;
    this.orderService.getAllOrders().subscribe(res => {
      this.resArray = res;
      this.source.load(this.resArray);
      this.loading = false;
    })
  }

  getOrder(orderId: number) {
    //this.orderService.getById(orderId).subscribe(res => {
    let editWindow = this.modalService.openDialog(OrderEditComponent, {
      context: {

      },

    });
    editWindow.onClose.subscribe(selec => {
      this.loading = true;
      this.orderService.getAllOrders().subscribe(res => {
        this.source = new LocalDataSource()
        this.resArray = res;
        this.source.load(this.resArray);
        this.loading = false;
      })
    })
    //})
  }
}

