import {Injectable} from "@angular/core";
import {DATA_API} from "./app.api";
import { Http } from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class AppService{
    constructor(private http: Http){}
    
    callQuery(q: string): Observable<Object[]>{
        return this.http.get(`${DATA_API}/` + q).map(response => response.json());
    }
    
    budgets(): Observable<Object[]>{
        return this.callQuery("query");
    }
    
    budgetItems(): Observable<Object[]>{
        return this.callQuery("items");
    }
    
}