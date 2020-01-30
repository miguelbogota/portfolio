import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {

  @Output() media = new EventEmitter<File>(); // Send image to the parent component
  imgSrc: string = 'https://firebasestorage.googleapis.com/v0/b/miguelporfolio.appspot.com/o/images%2Fresources%2Fdefault.png?alt=media&token=46797e10-1db2-4da4-9766-ce082dc3823e'; // Image to load preview
  imgSelected: boolean = false; // Check if the image was already selected
  imageUploadEvent: any; // Event for the image uploaded
  imageCroppedEvent: ImageCroppedEvent;
  croppedImage: string = ''; // Cropped image in text

  // Constructor
  constructor() { }

  ngOnInit() {
  }

  // Handle for upload an file
  uploadFile(event: any) {
    this.imageUploadEvent = event; // Save event
    this.imgSelected = true; // Change to true since it was selected

    // Show modal
    const changeModal: HTMLElement = document.getElementById('changeModal') as HTMLElement;
    changeModal.click();
  }

  // Handle whe the image is cropped
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imageCroppedEvent = event;
  }

  // Function to remove the photo
  removeImage() {
    // Resets by defaults the values
    this.imgSrc = 'https://firebasestorage.googleapis.com/v0/b/miguelporfolio.appspot.com/o/images%2Fresources%2Fdefault.png?alt=media&token=46797e10-1db2-4da4-9766-ce082dc3823e';
    this.imgSelected = false;
    this.imageUploadEvent = null;
    this.croppedImage = '';
  }

  // Function to submit the image
  submitImage() {
    this.imgSrc = this.croppedImage;
    const fileBeforeCropped = this.imageUploadEvent.target.files[0];
    const uploadFile: File = this.convertToFile(this.croppedImage, fileBeforeCropped.name, 'image/png');
    this.media.emit(uploadFile); // Send image to an event to be getter by the parent
  }

  // Convert base 64 image to file
  convertToFile(base64Ulr: string, filename: string, filetype?: string): File {
    const arr = base64Ulr.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: filetype ? filetype : mime });
  }

}
