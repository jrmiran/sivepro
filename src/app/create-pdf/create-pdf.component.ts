import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'sivp-create-pdf',
  templateUrl: './create-pdf.component.html',
  styleUrls: ['./create-pdf.component.css']
})
export class CreatePdfComponent implements OnInit {

  constructor() { }

    public gerarPDF() {
        let documento = new jsPDF();
        documento.text("Relatório em PDF no Angular", 10, 10);
        documento.output("dataurlnewwindow");
    }
    
    
  ngOnInit() {
  }
    

}
