import { Component, OnInit } from '@angular/core';
import {RadioOption} from '../shared/radio/radio-option.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {StartService} from '../start.service';

@Component({
  selector: 'sivp-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
    
    orderForm: FormGroup;
    
    paymentOptions: RadioOption[] = [
        {label: 'Loja', value: 'LOJ'},
        {label: 'Cliente Físico', value: 'FIS'},
        {label: 'Arquiteto', value: 'ARQ'}
    ]
    
    constructor(private formBuilder: FormBuilder, private start: StartService){}
    
    ngOnInit() {
        this.start.start();
        
        this.orderForm = this.formBuilder.group({
            address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
            number: this.formBuilder.control('', [Validators.required]),
            optional: this.formBuilder.control(''),
            paymentOption: this.formBuilder.control('')
        })
        
        
        
    }

}