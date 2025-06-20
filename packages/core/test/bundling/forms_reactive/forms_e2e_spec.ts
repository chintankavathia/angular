/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import '@angular/compiler';

import {withBody} from '@angular/private/testing';
import * as path from 'path';
import * as url from 'url';

const BUNDLE = path.resolve('./bundles/main.js');

describe('functional test for reactive forms', () => {
  it(
    'should render template form',
    withBody('<app-root></app-root>', async () => {
      // load the bundle
      await import(url.pathToFileURL(BUNDLE).toString());
      // the bundle attaches the following fields to the `window` global.
      const {bootstrapApp} = window as any;

      await bootstrapApp();

      // Reactive forms
      const reactiveFormsComponent = (window as any).reactiveFormsComponent;
      const reactiveForm = document.querySelector('app-reactive-forms')!;

      // Check for inputs
      const inputs = reactiveForm.querySelectorAll('input');
      expect(inputs.length).toBe(5);

      // Check for button
      const reactiveButtons = reactiveForm.querySelectorAll('button');
      expect(reactiveButtons.length).toBe(1);
      expect(reactiveButtons[0]).toBeDefined();

      // Make sure button click works
      const reactiveFormSpy = spyOn(reactiveFormsComponent, 'addCity').and.callThrough();
      reactiveButtons[0].click();
      expect(reactiveFormSpy).toHaveBeenCalled();
      expect(reactiveFormsComponent.addresses.length).toBe(2);
    }),
  );
});
