import { Time } from "@angular/common";

export interface OrdersTable {
    orderNum: number;
    client: string;
    order: string;
    info: string;
    time: string;
    ready: number;
}