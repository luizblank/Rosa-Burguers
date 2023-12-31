import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrdersTable } from './orderstable';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ReadyTable } from './readytable';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { OrderService } from '../server/services/orders.service';

var ORDER_DATA: OrdersTable[] = [];

var READY_DATA: ReadyTable[] = [];

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
export class OrdersComponent implements AfterViewInit, OnInit{
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private orders: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  orderDisplayedColumns: string[] = ['ordernum', 'callname', 'orders', 'time', 'ready'];
  orderSource = new MatTableDataSource<OrdersTable>(ORDER_DATA);

  readyDisplayedColumns: string[] = ['ordernum', 'callname', 'delete'];
  readySource = new MatTableDataSource<ReadyTable>(READY_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.orderSource.paginator = this.paginator;
  }

  firstNameOnly(name: String)
  {
    var nameSplitted = name.split(' ');
    return nameSplitted[0];
  }

  getOrders()
  {
    this.orders.getOrders((result: any) => {
      if (result != false)
      {
        this.orderSource.data = result;
      }
      return null;
    });
  }

  setReadyOrder(table: OrdersTable) {
    this.readySource.data.push({ordernum: table.ordernum, callname: table.callname, delete: table.ordernum})
    this.readySource = new MatTableDataSource<ReadyTable>(
      this.readySource.data
    );
    var new_order = this.orderSource.data.filter(item => item.ordernum != table.ordernum);
    this.orderSource.data = new_order;
  }

  openDialog(orderForModal: any) {
    this.dialog.open(OrdersModal, {
      data: {
        order: orderForModal
      }
    });
  }

  deleteItem(id: number, name: string) {
    this.orders.deleteOrder({
        userid: id,
        callname: name
      },
      (result: any) => {
        if (result != null)
          console.log(result);
      }
    );

    var new_ready = this.readySource.data.filter(item => item.ordernum != id);
    this.readySource.data = new_ready;
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: {order: any}) { }
  
  capitalizeText(text: string)
  {
    var textSplitted = text.split(' ');
    var newText = textSplitted[0].slice(1);

    if (textSplitted.length <= 1)
    {
      newText = text.charAt(0).toUpperCase() + newText;
      return newText;
    }

    text = text.slice(textSplitted[0].length);
    newText = textSplitted[0].charAt(0).toUpperCase() + newText;
    newText = newText + text;
    return newText;
  }
}