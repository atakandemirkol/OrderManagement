import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientProxyService {

    constructor(
        private httpClient: HttpClient) { }

    public serviceCall(url: string, payload: any, op: string): Observable<any> {
        payload = payload || {};
        if (op == 'post') {
            return new Observable(observer => {
                this.httpClient
                    .post<any>(url, payload)
                    .subscribe(data => {
                        if (data) {
                            observer.next(data);
                        } else {
                            observer.next();
                        }
                    },
                        err => {
                            return;
                        }, () => {
                            observer.complete();
                        });
            });
        } else if (op == 'get') {
            return new Observable(observer => {
                this.httpClient
                    .get<any>(url)
                    .subscribe(data => {
                        if (data) {
                            observer.next(data);
                        } else {
                            observer.next();
                        }
                    },
                        err => {
                            return;
                        }, () => {
                            observer.complete();
                        });
            });
        }
        else if (op == 'put') {
            return new Observable(observer => {
                this.httpClient
                    .put<any>(url, payload)
                    .subscribe(data => {
                        if (data) {
                            observer.next(data);
                        } else {
                            observer.next();
                        }
                    },
                        err => {
                            return;
                        }, () => {
                            observer.complete();
                        });
            });
        }
        else if (op == 'delete') {
            return new Observable(observer => {
                this.httpClient
                    .delete<any>(url)
                    .subscribe(data => {
                        if (data) {
                            observer.next(data);
                        } else {
                            observer.next();
                        }
                    },
                        err => {
                            return;
                        }, () => {
                            observer.complete();
                        });
            });
        }
    }
}
