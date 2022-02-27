import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loja-compra-realizada',
  templateUrl: './loja-compra-realizada.component.html',
  styleUrls: ['./loja-compra-realizada.component.scss']
})
export class LojaCompraRealizadaComponent implements OnInit {

  public pedidoId: string = "";
  constructor() { }

  ngOnInit(): void {
    this.pedidoId = sessionStorage.getItem("pedidoId")!;
  }

}
