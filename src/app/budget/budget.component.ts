import { Component, OnInit} from '@angular/core';
import {RadioOption} from '../shared/radio/radio-option.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {StartService} from '../start.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Select2OptionData } from 'ng2-select2';
import { BudgetService } from './budget.service';
import { BudgetNewComponent } from './budget-new/budget-new.component';
import { BudgetModel } from './budget.model';

@Component({
  selector: 'sivp-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit{
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
    
    formout: BudgetModel = {client: "me", date: "today", type: "physical"};
    
    constructor(private formBuilder: FormBuilder, private start: StartService, private budgetService: BudgetService){}
    
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
    
    setValidator(){
        const clienteControl = this.orderForm.get('cliente');
        const vendedorControl = this.orderForm.get('vendedor');
        const terceiroControl = this.orderForm.get('terceiro');
        
        this.orderForm.get('tCliente').valueChanges.subscribe(tCliente=>{
            if (tCliente == 'LOJ'){
                clienteControl.setValidators([Validators.required]);
                vendedorControl.setValidators([Validators.required]);
                terceiroControl.setValidators([Validators.required]);
            }
            if (tCliente == 'FIS'){
                clienteControl.setValidators([Validators.required]);
                vendedorControl.setValidators(null);
                terceiroControl.setValidators(null);
            }
            if (tCliente == 'ARQ'){
                clienteControl.setValidators([Validators.required]);
                vendedorControl.setValidators(null);
                terceiroControl.setValidators([Validators.required]);
            } 
            
            clienteControl.updateValueAndValidity();
            vendedorControl.updateValueAndValidity();
            terceiroControl.updateValueAndValidity();
        });
    }
    
    nextLevel(){
        this.budgetService.nextLevelBudget(this.bnc, this.orderForm.value.data, this.orderForm.value.cliente, this.orderForm.value.terceiro, this.orderForm.value.vendedor)
    }
    
    ngOnInit() {
        this.orderForm = this.formBuilder.group({
            tCliente: this.formBuilder.control('', [Validators.required]),
            cliente: this.formBuilder.control('', [Validators.required]),
            vendedor: this.formBuilder.control('', [Validators.required]),
            terceiro: this.formBuilder.control('', [Validators.required]),
            data: this.formBuilder.control('', [Validators.required])
        })
        this.setValidator();
        
        
    }
}