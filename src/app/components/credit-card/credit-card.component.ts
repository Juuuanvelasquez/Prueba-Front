import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  listCards: any[] = [];
  action = 'Add';
  form: FormGroup;
  _id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _cardService: CardService) { 
    this.form = this.fb.group({
      titular: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      expireDate: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
  })
  }

  ngOnInit(): void {
    this.getCard();
  }

  getCard(){
    this._cardService.getListCards().subscribe(data => {
      console.log(data);
      this.listCards = data;
    }, error => {
      console.log(error);
    });
  }

  addCard(){

    const card: any = {
      titular: this.form.get('titular')?.value,
      cardNumber: this.form.get('cardNumber')?.value,
      expireDate: this.form.get('expireDate')?.value,
      cvv: this.form.get('cvv')?.value
    }
    if(this._id == undefined){
        this._cardService.saveCard(card).subscribe(data => {
        this.toastr.success('Successfully Added Card!', 'Card Register!');
        this.getCard();
        this.form.reset(); 
      }, error => {
        this.toastr.error('Something Went Wrong!', 'Error')
        console.log(error);
      });
    } else {
        card._id = this._id;
        this._cardService.updateCard(this._id, card).subscribe( data => {
        this.form.reset();
        this.action = 'Add';
        this._id = undefined;
        this.toastr.info('Card Updated Successfully!', 'Card Updated')
        this.getCard();
      }, error => {
        console.log(error);
      })
    }
  }

  editCard(card: any){
    this.action = 'Edit';
    this._id = card._id;

    this.form.patchValue({
      titular: card.titular,
      cardNumber: card.cardNumber,
      expireDate: card.expireDate,
      cvv: card.cvv
    })
  }

  deleteCard(_id: number) {
    this._cardService.deleteCard(_id).subscribe( data => {
      this.toastr.error('Successfully Deleted Card!', 'Card Deleted');
      this.getCard();
    }, error => {
      console.log(error);
    })
  }
}
