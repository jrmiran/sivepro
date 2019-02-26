import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import {BudgetNewComponent} from '../budget/budget-new/budget-new.component';
import {BudgetNew} from '../budget/budget-new/budget-new.model';

@Component({
  selector: 'sivp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {

  constructor(private budgetComponent: BudgetNewComponent) { }

    @Input() name: string;
    @Input() headers: string[];
    @Input() datas: Array<Object>;
    @Input() ids: string[];
    @Input() searchBar: string = "true";
    @ViewChild(TemplateRef) template: TemplateRef<any>;
    
    filter: Object;
    p: Object;
    b: BudgetNew;
    
    addBudgetItem(id: string, item: string){
        this.b = {
            qtd: 1,
            cod: id,
            item: item,
            detalhe: "",
            medida: "",
            comodo: "",
            necessario: "",
            valor: ""
        }
        this.budgetComponent.addItemBudget(this.b);
    }
    
    ngOnInit() {
        
    }
    
    
    /*pageChanged($event){
        this.numberOfPage = this.numberOfPage + 1;
    }*/

}
