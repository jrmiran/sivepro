import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'sivp-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.css']
})
export class BudgetTableComponent implements OnInit {

  constructor(private appService: AppService ) { }

    buds: Object[];
    
    ngOnInit() {
        this.appService.budgets().subscribe(budgets => this.buds = budgets);
    }
}