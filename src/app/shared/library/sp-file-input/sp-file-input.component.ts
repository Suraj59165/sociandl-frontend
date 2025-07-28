import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SpErrorHandlerData } from '../../models/sp-error-handler';

@Component({
  selector: 'app-sp-file-input',
  standalone: false,
  templateUrl: './sp-file-input.component.html',
  styleUrl: './sp-file-input.component.css'
})
export class SpFileInputComponent {

  @Input() accept = 'image/*,video/*';
  @Input() label = 'Upload Files';
  @Input() maxFiles: number | null = null;
  @Input() entityDocType: string;
  @Input() entityModuleCode: string;
  @Input() documents: any[] = [];
  @Input() hidden: boolean = false;
  @Input() errorHandler: SpErrorHandlerData | undefined;
  @Input() fileSizeLimits: any = {};

  @Output() documentsChange = new EventEmitter<any[]>();

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  // Method to trigger file select dialog
  openFileSelector() {
    this.fileInput.nativeElement.click();
  }

 onFilesSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;

  const files = Array.from(input.files);

  if (!Array.isArray(this.documents)) {
    this.documents = [];
  }

  // If only one file allowed
  if (this.maxFiles === 1) {
    const file = files[0];
    if (file) {
      this.readAndAddFile(file, true);
    }
    input.value = '';
    return;
  }

  const currentCount = this.documents.length;
  const selectedCount = files.length;

  if (this.maxFiles && currentCount + selectedCount > this.maxFiles) {
    alert(`You can only upload a maximum of ${this.maxFiles} file(s).`);
    input.value = '';
    return;
  }

  for (const file of files) {
    const isDuplicate = this.documents.some(
      doc => doc.fileName === file.name && doc.fileSize === file.size
    );

    if (isDuplicate) continue;

    const maxSizeKB = this.fileSizeLimits?.[file.type];
    if (maxSizeKB && file.size > maxSizeKB * 1024) {
      alert(`File "${file.name}" exceeds the allowed size of ${maxSizeKB} KB.`);
      continue;
    }

    this.readAndAddFile(file);
  }

  input.value = ''; // Reset file input
}



  private readAndAddFile(file: File, clearExisting = false): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result?.toString().split(',')[1];

      const doc = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        entityDocType: this.entityDocType,
        entityModuleCode: this.entityModuleCode,
        fileData: base64
      };

      if (clearExisting) {
        this.documents = [doc];
      } else {
        this.documents.push(doc);
      }

      this.documentsChange.emit(this.documents);
    };
    reader.readAsDataURL(file);
  }

  getSelectedFileNames(): string {
    if (!this.documents || this.documents?.length === 0) {
      return 'No file chosen';
    }
    return this.documents.map(doc => doc.fileName).join(', ');
  }

  removeFile(index: number): void {
    this.documents.splice(index, 1);
    this.documentsChange.emit(this.documents);
  }

}
