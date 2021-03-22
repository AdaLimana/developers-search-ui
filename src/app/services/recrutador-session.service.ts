import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class Recrutador {
	id: string;
	email: string;
}

@Injectable({
	providedIn: 'root'
})
export class RecurtadorSessionService {

	public readonly RECRUTADOR_KEY: string = "recrutador_ativo";

	//Monitor de Recrutador ativo
	private recrutadorBehaviorSubject = new BehaviorSubject<Recrutador>(new Recrutador());

	constructor() { }

	/*^
     * Recebe um recrutador salvando-a no local storage e disparando
     * o recrutadorBehaviorSubject para que todos que se inscreveram nele
     * saibam que a propriedade foi atualizada
     * 
     */
	public alterarRecrutador(recrutador: Recrutador) {
		if (!recrutador) {
			return;
		}

		localStorage.setItem(this.RECRUTADOR_KEY, JSON.stringify(recrutador));
		this.recrutadorBehaviorSubject.next(recrutador);
	}

	/*Retorna o recrutador selecionado*/
	public obterRecrutador() {
		return this.recrutadorBehaviorSubject;
	}

	/**
     * Busca o recrutador ativo que esta salvo no local storage
     */
	public getRecrutadorAtivoFromStorage() {
        
		if (!localStorage.hasOwnProperty(this.RECRUTADOR_KEY)) {
			return;
		}

		let recrutadorStorage = localStorage?.getItem(this.RECRUTADOR_KEY) ?? null;
		let recrutadorAtivo = null;
		recrutadorAtivo = JSON.parse(recrutadorStorage);
		return recrutadorAtivo;
	}

}
