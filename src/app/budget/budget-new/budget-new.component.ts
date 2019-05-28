import { Component, OnInit, Input, Directive, HostListener, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, FormArray} from '@angular/forms';
import {AppService} from "../../app.service";
import {BudgetNew} from "./budget-new.model";
import {StartService} from '../../start.service';
import {CheckBox} from '../../shared/check/check-box.model';
import { ActivatedRoute } from '@angular/router';
import {BudgetModel} from '../budget.model'
import {CreatePdfComponent} from '../../create-pdf/create-pdf.component'
import "rxjs/add/operator/map";
import {BudgetAmbient} from "./budget-ambient.model";
import { NgControl } from '@angular/forms';
import {Client} from '../../clients/client.model';
import {Terceiro} from '../../clients/terceiro.model';


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
    terceiroTest: Terceiro = {name: "Jessica Miranda",
                              tel: "(16) 98545-5473",
                              cel: "(16) 56874-4851",
                              email: "jessica.miranda@belartte.com",
                              address: "Rua Neveton Freitas de Souza, 60 - Pq das figueiras - Ribeirão Preto"
                             };
    clientTest:  Client = {
                           type: "LOJ",
                           name: "Jefferson Miranda",
                           tel: "(16) 3622-0611",
                           cel: "(16) 98116-1559",
                           email: "jeffersonrfmiranda@gmail.com",
                           address: "Rua Neveton Freitas de Souza, 60 - Pq. das Figueiras - Ribeirão Preto",
                           terceiro: this.terceiroTest
                          };
    mainBudget: BudgetModel = {client: this.clientTest,
                                date: "18/05/2019",
                               terceiro: this.terceiroTest,
                                vendor: "Ivanaldo Miranda",
                                valorTotal: 0,
                                discount: 0,
                                valorComDesconto: 0
                              };
    @Input() date: string;
    @Input() client: string;
    @Input() seller: string;
    @Input() thirdParty: string;
    sub: any;
    comods: string[];
    enableButton: boolean;
    currentItem: number = -1;
    createPdf = new CreatePdfComponent();
    cbo: FormArray;
    budgetsAmbient: BudgetAmbient[] = [];
    newItem: BudgetAmbient = {comodo:"", qtd:[], cod:[], item:[], detalhe:[], medida:[], necessario:[], valor:[], valorTotal:[], valorTotalAmbiente:0};
    valuePattern = /^\d+.\d{2}$/;
    pedraOption: boolean = false;
    public myModel = '';
    public mask = [/^([1-9]{1}[\d]{0,2}(\.[\d]{3})*(\,[\d]{0,2})?|[1-9]{1}[\d]{0,}(\,[\d]{0,2})?|0(\,[\d]{0,2})?|(\,[\d]{1,2})?)$/];
    discount: number = 0;
    
    test(){
        this.joinBudget();
        this.createPdf.gerarPDF(this.budgetsAmbient, this.mainBudget);
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
    
    setPedra(){
            this.pedraOption = !this.pedraOption;
            //this.orderForm.value.isPedra = this.pedraOption;
    }
    
    public clickRow(i: number){
        this.currentItem = i;
        this.orderForm.get('txtQtd').setValue(this.budgets[this.currentItem].qtd);
        this.orderForm.get('txtNecessario').setValue(this.budgets[this.currentItem].necessario);
        this.orderForm.get('txtMedida').setValue(this.budgets[this.currentItem].medida);
        this.orderForm.get('txtValor').setValue(this.budgets[this.currentItem].valorUnitario);
    }
    
    changeItem(){
        var qtd: number = parseFloat(this.orderForm.get('txtQtd').value.toString().replace(',','.'));
        var valor: number = parseFloat(this.orderForm.get('txtValor').value.toString().replace(',','.'));
        var medida1: number = parseFloat(this.orderForm.get('txtMedida1').value);
        var medida2: number = parseFloat(this.orderForm.get('txtMedida2').value);
        
        this.budgets[this.currentItem].qtd = this.orderForm.get('txtQtd').value;
        this.budgets[this.currentItem].necessario = this.orderForm.get('txtNecessario').value;
        this.budgets[this.currentItem].detalhe = this.orderForm.get('txtDetalhe').value;
        this.budgets[this.currentItem].valorUnitario = this.orderForm.get('txtValor').value;
        if(this.pedraOption){
           this.budgets[this.currentItem].valorTotal = (medida1 * medida2 * valor)/ 10000; 
            this.budgets[this.currentItem].medida = this.orderForm.get('txtMedida1').value + " x " + this.orderForm.get('txtMedida2').value;
        } else{
            this.budgets[this.currentItem].valorTotal = qtd * valor;
            this.budgets[this.currentItem].medida = this.orderForm.get('txtMedida').value;
        }
        this.mainBudget.valorTotal = this.mainBudget.valorTotal + this.budgets[this.currentItem].valorTotal;
        
        this.pedraOption = false;
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
    
    applyDiscount(){
        this.discount = parseFloat(this.orderForm.get('txtDiscount').value);
        this.mainBudget.discount = this.discount;
        this.mainBudget.valorComDesconto = this.mainBudget.valorTotal - this.mainBudget.valorTotal * (this.discount/100);
        console.log(this.mainBudget.valorTotal);
        console.log(this.mainBudget.valorComDesconto);
    }

    joinBudget(){
        var flag: boolean = false;
        var newItem = this.newItem;  
        var budgetsAmbient = this.budgetsAmbient;
        var keepGoing: boolean = true;
        this.budgets.forEach(function(b){
            if(budgetsAmbient.length > 0){
                budgetsAmbient.forEach(function(value){
                    if(keepGoing){
                        if(value.comodo === b.comodo){
                            flag = true;
                            value.qtd.push(b.qtd);
                            value.cod.push(b.cod);
                            value.item.push(b.item);
                            value.detalhe.push(b.detalhe);
                            value.medida.push(b.medida);
                            value.necessario.push(b.necessario);
                            value.valor.push(b.valorUnitario);
                            value.valorTotal.push(b.valorTotal);
                            value.valorTotalAmbiente = value.valorTotalAmbiente + b.valorTotal;
                            keepGoing = false;
                        }
                    }
                }); 
            }
            if(!flag){
                newItem.comodo = b.comodo;
                newItem.qtd[0] = b.qtd;
                newItem.cod[0] = b.cod;
                newItem.item[0] = b.item;
                newItem.detalhe[0] = b.detalhe;
                newItem.medida[0] = b.medida;
                newItem.necessario[0] = b.necessario;
                newItem.valor[0] = b.valorUnitario;
                newItem.valorTotal[0] = b.valorTotal; 
                newItem.valorTotalAmbiente = b.valorTotal;
                budgetsAmbient.push(newItem);
                newItem = {comodo:"", qtd:[], cod:[], item:[], detalhe:[], medida:[], necessario:[], valor:[], valorTotal: [], valorTotalAmbiente: 0};
            }
            flag = false;
            keepGoing = true;
        });
        console.log(this.budgetsAmbient);
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
            txtValor: this.formBuilder.control('', [Validators.required]),
            txtMedida1: this.formBuilder.control(''),
            txtMedida2: this.formBuilder.control(''),
            txtDetalhe: this.formBuilder.control(''),
            txtDiscount: this.formBuilder.control(''),
            checkBoxOption: this.buildComodos()
      })
      
      this.cbo = (this.orderForm.get('checkBoxOption') as FormArray);
      
      this.route.queryParams.subscribe(
        (queryParams: any) =>{
            this.client = queryParams['client'];
            console.log(queryParams);
        }
      );
      this.appService.budgetItems().subscribe(budgetItems => this.items = budgetItems);
  }
}