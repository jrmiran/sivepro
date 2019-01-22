import {Injectable} from "@angular/core";
import {DATA_API} from "./app.api";
import { Http } from "@angular/http";
import {Observable} from "rxjs/Observable";
import "../../node_modules/rxjs/add/operator/map";

@Injectable()
export class AppService{
    constructor(private http: Http){}
    
    budgets(): Observable<Object[]>{
        //return this.http.get(`${DATA_API}/test2.php/?function=getBudgets`).map(response => response.json())
        return this.http.get(`${DATA_API}/query`).map(response => response.json())
    }
    
}