import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sivp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

    @Input() name: string;
    @Input() headers: string[];
    @Input() datas: Array<Object>;
    @Input() ids: string[];
    filter: Object;
    
    ngOnInit() {
        
    }
    
    
    /*pageChanged($event){
        this.numberOfPage = this.numberOfPage + 1;
    }*/

}
