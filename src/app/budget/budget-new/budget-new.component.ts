import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AppService} from "../../app.service";
import {BudgetNew} from "./budget-new.model";

@Component({
  selector: 'sivp-budget-new',
  templateUrl: './budget-new.component.html',
  styleUrls: ['./budget-new.component.css']
})
export class BudgetNewComponent implements OnInit {
    orderForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private appService: AppService) { }
    
    items: Object[];
    
    budgets: BudgetNew[] = [];
    
    addItemBudget(b: BudgetNew){
        this.budgets.push(b);
    }
    
  ngOnInit() {
      this.appService.budgetItems().subscribe(budgetItems => this.items = budgetItems);
      
      this.orderForm = this.formBuilder.group({
            address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
            number: this.formBuilder.control('', [Validators.required]),
            optional: this.formBuilder.control(''),
            paymentOption: this.formBuilder.control('')
        })
      
  }

}
