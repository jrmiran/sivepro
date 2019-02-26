import {Injectable} from "@angular/core";
import {DATA_API} from "./app.api";
import { Http } from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
//import "../../node_modules/rxjs/add/operator/map";
//import { map } from "rxjs/operators";

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
        return this.callQuery("itens");
    }
}