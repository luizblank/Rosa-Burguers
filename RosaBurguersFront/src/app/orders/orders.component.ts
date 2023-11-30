import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrdersTable } from './orderstable';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ReadyTable } from './readytable';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

var ORDER_DATA: OrdersTable[] = [
  { orderNum: 1, client: 'Luiz', order: 'Rosinha', info: 'Pão cor de rosa, uma carne, cheddar, alface e molho especial', time: new Date().toISOString().substring(11, 19), ready: 1 },
  { orderNum: 2, client: 'Marcos', order: 'Cupcake', info: 'Massa de cupcake como pão, chocolate, chantilly, granulado colorido', time: new Date().toISOString().substring(11, 19), ready: 2 },
  { orderNum: 3, client: 'Emyli', order: 'Barbie combo', info: 'Pão com gergilim, duas carnes, cheddar, alface, cebola, picles, molho especial', time: new Date().toISOString().substring(11, 19), ready: 3 },
  { orderNum: 4, client: 'Marcos', order: 'Cupcake', info: 'Massa de cupcake como pão, chocolate, chantilly, granulado colorido', time: new Date().toISOString().substring(11, 19), ready: 2 },
  { orderNum: 5, client: 'Emyli', order: 'Barbie combo', info: 'Pão com gergilim, duas carnes, cheddar, alface, cebola, picles, molho especial', time: new Date().toISOString().substring(11, 19), ready: 3 },
  { orderNum: 6, client: 'Marcos', order: 'Cupcake', info: 'Massa de cupcake como pão, chocolate, chantilly, granulado colorido', time: new Date().toISOString().substring(11, 19), ready: 2 },
  { orderNum: 7, client: 'Emyli', order: 'Barbie combo', info: 'Pão com gergilim, duas carnes, cheddar, alface, cebola, picles, molho especial', time: new Date().toISOString().substring(11, 19), ready: 3 },
];

var READY_DATA: ReadyTable[] = [
  { orderNum: 8, client: 'Felipe' },
  { orderNum: 9, client: 'Xispita' },
];

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NavBarComponent,
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements AfterViewInit{
  orderDisplayedColumns: string[] = ['orderNum', 'client', 'order', 'info', 'time', 'ready'];
  orderSource = new MatTableDataSource<OrdersTable>(ORDER_DATA);

  readyDisplayedColumns: string[] = ['orderNum', 'client'];
  readySource = new MatTableDataSource<ReadyTable>(READY_DATA);

  constructor(public dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.orderSource.paginator = this.paginator;
  }
  

  setReadyOrder(table: OrdersTable) {
    this.readySource.data.push({orderNum: table.orderNum, client: table.client})
    this.readySource = new MatTableDataSource<ReadyTable>(
      this.readySource.data
    );
    var new_order = this.orderSource.data.filter(item => item.orderNum != table.orderNum);
    this.orderSource.data = new_order;
    console.log(this.readySource)
  }

  openDialog(orderForModal: any, infoForModal: any) {
    this.dialog.open(OrdersModal, {
      data: {
        order: orderForModal,
        info: infoForModal
      }
    });
  }
}

@Component({
  selector: 'orders-modal',
  templateUrl: 'modal.html',
  styleUrl: './orders.component.css',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class OrdersModal {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {order: string, info: string}) { }
}