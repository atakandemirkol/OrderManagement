import { Injectable } from "@angular/core";
import { ClientProxyService } from "../../../@core/services/client-proxy.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    constructor(private clientProxy: ClientProxyService) { }

    getAllOrders(): Observable<Array<any>> {
        return new Observable(observer => {
            this.clientProxy.serviceCall("http://localhost:8000/api/order", {}, "get").subscribe(res => {
                observer.next(res);
                console.log("res", res);
            });
        });
    }
    updateOrders(payload: any): Observable<any> {
        return new Observable(observer => {
            this.clientProxy.serviceCall("http://localhost:8000/api/order", payload, "put").subscribe(res => {
                observer.next(res);
            });
        });
    }
    getById(id: number): Observable<any> {
        return new Observable(observer => {
            this.clientProxy.serviceCall("http://localhost:8000/api/order/" + id, {}, "get").subscribe(res => {
                observer.next(res);
            });
        });
    }
    saveOrder(payload: any): Observable<any> {
        return new Observable(observer => {
            this.clientProxy.serviceCall("http://localhost:8000/api/order", payload, "post").subscribe(res => {
                observer.next(res);
            });
        });
    }
    deleteOrder(id: number): Observable<any> {
        return new Observable(observer => {
            this.clientProxy.serviceCall("http://localhost:8000/api/order?id=" + id, {}, "delete").subscribe(res => {
                observer.next(res);
            });
        });
    }
}