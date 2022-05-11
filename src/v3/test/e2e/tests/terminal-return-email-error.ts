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

import { Selector } from 'testcafe';

fixture('Terminal Email Error Verification Test')
  .page('http://localhost:8080/?siw-use-mocks=true&siw-mock-scenario=terminal-return-email-error');

test('Email link with error renders error message with a link to sign in', async (t) => {
  // Verifying authcoin
  await t
    .expect(Selector('svg[aria-labelledby="emailAuthenticator"]').exists)
    .ok();
  await t.expect(Selector('span')
    .withText('Could not process this email link. Return to the screen where you requested it.').innerText)
    .eql('Could not process this email link. Return to the screen where you requested it.');
  await t
    .expect(
      Selector('a').innerText,
    ).eql('Back to sign in');

  // OKTA-485565, OKTA-485564, OKTA-485562
  // await checkA11y(t);
});