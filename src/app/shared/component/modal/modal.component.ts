import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  // constructor(public dialog: MatDialogRef<componentequesequiererenderisar>) { }
  constructor(
    public dialog: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public message: any
  ) {
    this.message = {
      data: {
        nombre: 'adrian jose bravo viloria',
      },
    };
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialog.close();
  }
}
