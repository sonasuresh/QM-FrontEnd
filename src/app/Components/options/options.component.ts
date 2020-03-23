import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {filter, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  form: FormGroup;
  constructor() { 
    this.form = new FormBuilder().group({
      chips: [['chip'], []]
  });
  }

  ngOnInit() {
  }




disabled = true;

items = ['Javascript', 'Typescript'];

inputText = 'text';

itemsAsObjects = [{id: 0, name: 'Angular', readonly: true}, {id: 1, name: 'React'}];

autocompleteItems = ['Javascript', 'Typescript', 'Rust', 'Go'];

autocompleteItemsAsObjects = [
    {value: 'Item1', id: 0, extra: 0},
    {value: 'item2', id: 1, extra: 1},
    'item3'
];

dragAndDropExample = ['C#', 'Java'];

dragAndDropObjects = [{display: 'Javascript', value: 'Javascript'}, {display: 'Typescript', value: 'Typescript'}];
dragAndDropStrings = ['CoffeScript', 'Scala.js'];



public options = {
    readonly: undefined,
    placeholder: '+ Tag'
};

public onAdd(item) {
    console.log('tag added: value is ' + item);
}

public onRemove(item) {
    console.log('tag removed: value is ' + item);
}

public onSelect(item) {
    console.log('tag selected: value is ' + item);
}

public onFocus(item) {
    console.log('input focused: current value is ' + item);
}

public onTextChange(text) {
    console.log('text changed: value is ' + text);
}

public onBlur(item) {
    console.log('input blurred: current value is ' + item);
}

public onTagEdited(item) {
    console.log('tag edited: current value is ' + item);
}

public onValidationError(item) {
    console.log('invalid tag ' + item);
}

public transform(value: string): Observable<object> {
    const item = {display: `@${value}`, value: `@${value}`};
    return of(item);
}

private startsWithAt(control: FormControl) {
    if (control.value.charAt(0) !== '@') {
        return {
            'startsWithAt@': true
        };
    }

    return null;
}

private endsWith$(control: FormControl) {
    if (control.value.charAt(control.value.length - 1) !== '$') {
        return {
            'endsWith$': true
        };
    }

    return null;
}

private validateAsync(control: FormControl): Promise<any> {
    return new Promise(resolve => {
        const value = control.value;
        const result: any = isNaN(value) ? {
            isNan: true
        } : null;

        setTimeout(() => {
            resolve(result);
        }, 400);
    });
}

public asyncErrorMessages = {
    isNan: 'Please only add numbers'
};

public validators = [this.startsWithAt, this.endsWith$];

public asyncValidators = [this.validateAsync];

public errorMessages = {
    'startsWithAt@': 'Your items need to start with \'@\'',
    'endsWith$': 'Your items need to end with \'$\''
};

public onAdding(tag): Observable<any> {
    const confirm = window.confirm('Do you really want to add this tag?');
    return of(tag)
        .pipe(filter(() => confirm));
}

public onRemoving(tag): Observable<any> {
    const confirm = window.confirm('Do you really want to remove this tag?');
    return of(tag)
        .pipe(filter(() => confirm));
}

public asyncOnAdding(tag): Observable<any> {
    const confirm = window.confirm('Do you really want to add this tag?');
    return of(tag)
        .pipe(filter(() => confirm));
}

public insertInputTag(): void {
    if (this.inputText) {
        this.items.push(this.inputText);

        this.inputText = '';
    }
}
}
