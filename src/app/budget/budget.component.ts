import { Component, OnInit, OnChanges, ViewChild, ElementRef} from '@angular/core';
import {RadioOption} from '../shared/radio/radio-option.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {StartService} from '../start.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Select2OptionData } from 'ng2-select2';
import { BudgetService } from './budget.service';
import { BudgetNewComponent } from './budget-new/budget-new.component';
import { BudgetModel } from './budget.model';
import { AppService } from '../app.service';
import { timer } from 'rxjs/observable/timer';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import {AutoCompleteComponent} from '../shared/auto-complete/auto-complete.component';

const source = timer(1000);
@Component({
  selector: 'sivp-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, OnChanges{
    @ViewChild('completo') completo: AutoCompleteComponent;
    @ViewChild('vendedores') vendedores: AutoCompleteComponent;
    orderForm: FormGroup;
    validateCliente: boolean;
    validateTerceiro: boolean;
    validateVendedor: boolean;
    public bnc: BudgetNewComponent;
    tipoCliente: RadioOption[] = [
        {label: 'Loja', value: 'LOJ'},
        {label: 'Cliente Físico', value: 'FIS'},
        {label: 'Arquiteto', value: 'ARQ'}
    ]
    clientsJuridicoObj: Object[];
    clientsFisicoObj: Object[];
    clientsArquitetoObj: Object[];
    clientsInput: Object[];
    terceirosObj: any[];
    vendedoresObj: any[];
    main: BudgetComponent;
    temp: string[];
    flag: boolean;
    
    
    
    
    //public formout: BudgetModel = {client: "me", date: "today", type: "physical", terceiro:"", vendor:"", valorTotal: 0, discount: 0, valorComDesconto: 0};
    
    public formout = {client: "me", date: "today", type: "physical", terceiro:"", vendor:"", valorTotal: 0, discount: 0, valorComDesconto: 0};
    constructor(private formBuilder: FormBuilder, private start: StartService, private budgetService: BudgetService, private appService: AppService){}
    
    validateField(){
        if(this.orderForm.value.tCliente == 'LOJ'){
            this.validateCliente = true;
            this.validateTerceiro = true;
            this.validateVendedor = true;
        }else if(this.orderForm.value.tCliente == 'FIS'){
            this.validateCliente = true;
            this.validateTerceiro = false;
            this.validateVendedor = false;
        }else if(this.orderForm.value.tCliente == 'ARQ'){
            this.validateCliente = true;
            this.validateTerceiro = true;
            this.validateVendedor = false;
        } 
    }
    
    public setTerceiros(value: Object[]){
        this.terceirosObj = value;
        this.completo.options = this.terceirosObj;
        this.completo.inicia();
    }
    
    public setVendedores(value: Object[]){
        this.vendedoresObj = value;
        this.vendedores.options = this.vendedoresObj;
        this.vendedores.inicia();
    }
    
    setFormout(){
        console.log("FORMOUT");
        this.formout.client = this.orderForm.value.cliente;
        this.formout.date = this.orderForm.value.data;
        this.formout.type = this.orderForm.value.tCliente;
        this.formout.terceiro = this.orderForm.value.terceiro;
        this.formout.vendor = this.orderForm.value.vendedor;
    }
    
    setValidator(){
        const clienteControl = this.orderForm.get('cliente');
        const vendedorControl = this.orderForm.get('vendedor');
        const terceiroControl = this.orderForm.get('terceiro');
        var cInput = this.clientsInput;
        
        this.orderForm.get('tCliente').valueChanges.subscribe(tCliente=>{
            if (tCliente == 'LOJ'){
                clienteControl.setValidators([Validators.required]);
                vendedorControl.setValidators([Validators.required]);
                terceiroControl.setValidators([Validators.required]);
                this.clientsInput = this.clientsJuridicoObj;
            }
            if (tCliente == 'FIS'){
                clienteControl.setValidators([Validators.required]);
                vendedorControl.setValidators(null);
                terceiroControl.setValidators(null);
                this.clientsInput = this.clientsFisicoObj;
            }
            if (tCliente == 'ARQ'){
                clienteControl.setValidators([Validators.required]);
                vendedorControl.setValidators(null);
                terceiroControl.setValidators([Validators.required]);
                this.clientsInput = this.clientsArquitetoObj;
            } 
            
            clienteControl.updateValueAndValidity();
            vendedorControl.updateValueAndValidity();
            terceiroControl.updateValueAndValidity();
        });
    }
    
    nextLevel(){
        this.budgetService.nextLevelBudget(this.bnc, this.orderForm.value.data, this.orderForm.value.cliente, this.orderForm.value.terceiro, this.orderForm.value.vendedor);
    }
    
    ngOnInit() {                    
        
        this.main = this;
        this.appService.clientsJuridico().subscribe(clientsJuridico => this.clientsJuridicoObj = clientsJuridico);
        this.appService.clientsFisico().subscribe(clientsFisico => this.clientsFisicoObj = clientsFisico);
        this.appService.clientsArquiteto().subscribe(clientsArquiteto => this.clientsArquitetoObj = clientsArquiteto);
        this.terceirosObj = [{nome:''}];
        this.vendedoresObj = [{nome:''}];
        
        this.orderForm = this.formBuilder.group({
            tCliente: this.formBuilder.control('', [Validators.required]),
            cliente: this.formBuilder.control('', [Validators.required]),
            vendedor: this.formBuilder.control('', [Validators.required]),
            terceiro: this.formBuilder.control('', [Validators.required]),
            data: this.formBuilder.control('', [Validators.required])
        })
        this.setValidator();
        
        //this.appService.clientsEmpresa("'Alameda'").subscribe(clientsEmpresa => this.terceirosObj = clientsEmpresa);

    }
    
    ngOnChanges() {                    

    }
}