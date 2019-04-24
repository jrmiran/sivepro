import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, FormArray} from '@angular/forms';
import {AppService} from "../../app.service";
import {BudgetNew} from "./budget-new.model";
import {StartService} from '../../start.service';
import {CheckBox} from '../../shared/check/check-box.model';
import { ActivatedRoute } from '@angular/router';
import {BudgetModel} from '../budget.model'
import {CreatePdfComponent} from '../../create-pdf/create-pdf.component'
import "rxjs/add/operator/map";

@Component({
  selector: 'sivp-budget-new',
  templateUrl: './budget-new.component.html',
  styleUrls: ['./budget-new.component.css']
})
export class BudgetNewComponent implements OnInit {
    
  constructor(private formBuilder: FormBuilder, private appService: AppService, private start: StartService, private route: ActivatedRoute) { }
    
    orderForm: FormGroup;
    items: Object[];
    budgets: BudgetNew[] = [];
    main: BudgetNewComponent = this;
    places: string[] = [""];
    checks: string[] = [''];
    formin: BudgetModel;
    @Input() date: string;
    @Input() client: string;
    @Input() seller: string;
    @Input() thirdParty: string;
    sub: any;
    comods: string[];
    enableButton: boolean;
    currentItem: number;
    createPdf = new CreatePdfComponent();
    cbo: FormArray;
    
    
    test(){
        this.createPdf.gerarPDF();
    }
    
    removePlace2(i: number){
        this.places = this.places.slice(0,i).concat(this.places.slice(i+1,this.places.length));
        this.checks = this.checks.slice(0,i).concat(this.checks.slice(i+1,this.checks.length));
        (this.orderForm.get('checkBoxOption') as FormArray).removeAt(i);
        this.cbo = (this.orderForm.get('checkBoxOption') as FormArray)
    }
    setDate(value: string){
        this.date = value;
    }
    setClient(value: string){
        this.client = value;
    }
    setSeller(value: string){
        this.seller = value;
    }
    setThirdParty(value: string){
        this.thirdParty = value;
    }
    
    addPlace(place: string){
        this.places.push(place);
        this.checks.push(place);
        
        (this.orderForm.get('checkBoxOption') as FormArray).push(new FormControl(false));
        this.cbo = (this.orderForm.get('checkBoxOption') as FormArray);
    }
    
    setValueCheckBox(i: number){
            this.orderForm.value.checkBoxOption[i] = !this.orderForm.value.checkBoxOption[i];
    }
    
    public clickRow(i: number){
        this.currentItem = i;
        this.orderForm.get('txtQtd').setValue(this.budgets[this.currentItem].qtd);
        this.orderForm.get('txtNecessario').setValue(this.budgets[this.currentItem].necessario);
        this.orderForm.get('txtMedida').setValue(this.budgets[this.currentItem].medida);
        this.orderForm.get('txtValor').setValue(this.budgets[this.currentItem].valor);
    }
    
    changeItem(){
        this.budgets[this.currentItem].qtd = this.orderForm.get('txtQtd').value;
        this.budgets[this.currentItem].necessario = this.orderForm.get('txtNecessario').value;
        this.budgets[this.currentItem].medida = this.orderForm.get('txtMedida').value;
        this.budgets[this.currentItem].valor = this.orderForm.get('txtValor').value;
    }
    
    public setValue(){
        let valueCheckBox = Object.assign({}, this.orderForm.value);
        valueCheckBox = Object.assign(valueCheckBox, {
        checkBoxOption: valueCheckBox.checkBoxOption
            .map((v,i) => v ? this.checks[i] : null)
            .filter(v => v !== null)
    });
        this.comods = valueCheckBox.checkBoxOption;
        //console.log(this.orderForm.value.checkBoxOption);
        if(this.comods.length > 0){
            this.enableButton = true;
        }else{
            this.enableButton = false;
        }
    }
    
    addItemBudget(b: BudgetNew){
        this.budgets.push(b);
    }
    
    getBudgets(): BudgetNew[]{
        return this.budgets;
    }
    
    buildComodos(){
        const values = this.checks.map(v => new FormControl(false));
        return this.formBuilder.array(values); 
    }
    
    
  ngOnInit() {
      this.start.start();
      
      this.orderForm = this.formBuilder.group({
            
            inputPlace: this.formBuilder.control(''),
            txtQtd: this.formBuilder.control(''),
            txtNecessario: this.formBuilder.control(''),
            txtMedida: this.formBuilder.control(''),
            txtValor: this.formBuilder.control(''),
            checkBoxOption: this.buildComodos()
        })
      
      this.cbo = (this.orderForm.get('checkBoxOption') as FormArray);
      
      this.route.queryParams.subscribe(
        (queryParams: any) =>{
            this.client = queryParams['client'];
        }
      );
      this.appService.budgetItems().subscribe(budgetItems => this.items = budgetItems);
  }
}