import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  mostrar: Boolean=false;
  mensaje: String="Innovation Group";
  mensaje_enlace:String ="Mostrar";

  constructor() { }

  ngOnInit(): void {
  }

  mostrarOcultar(){
    if(this.mostrar){
      this.mostrar=false;
      this.mensaje_enlace="Mostrar"
    }else{
      this.mostrar=true;
      this.mensaje_enlace="Ocultar"
    }

  }

  abrirPopup(job?:any) {

    const data = job?{mode:'Edit',job:job}:{mode:'Create'};

  }

}
