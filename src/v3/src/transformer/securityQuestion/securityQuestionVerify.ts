/*
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { ControlElement } from '@jsonforms/core';
import { IdxStepTransformer, TitleElement } from 'src/types';

import { ButtonOptionType } from '../getButtonControls';
import { getUIElementWithScope } from '../utils';

export const transformSecurityQuestionVerify: IdxStepTransformer = (transaction, formBag) => {
  const { nextStep: { authenticator } } = transaction;
  const { schema, uischema } = formBag;

  schema.properties = schema.properties ?? {};
  const answerElement = getUIElementWithScope('#/properties/answer', uischema.elements as ControlElement[]);
  if (answerElement) {
    // @ts-ignore OKTA-483184 (profile missing from authenticator interface)
    answerElement.label = authenticator?.profile?.question;
    // TODO: OKTA-492925
    // this forced password format should not be necessary
    answerElement.options = {
      format: 'password',
    };
  }

  // Add the title to the top
  const titleElement: TitleElement = {
    type: 'Title',
    options: {
      content: 'oie.security.question.challenge.title',
    },
  };
  uischema.elements.unshift(titleElement);

  const primaryButton: ControlElement = {
    type: 'Control',
    label: 'oform.verify',
    scope: `#/properties/${ButtonOptionType.SUBMIT}`,
    options: {
      format: 'button',
      type: ButtonOptionType.SUBMIT,
      idxMethod: 'proceed',
    },
  };
  uischema.elements.push(primaryButton);

  return formBag;
};