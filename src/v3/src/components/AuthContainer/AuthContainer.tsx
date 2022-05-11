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

import { Box } from '@okta/odyssey-react';
import classNames from 'classnames';
import { FunctionComponent, h } from 'preact';

import style from './style.scss';

const AuthContainer: FunctionComponent = ({ children }) => {
  const classes = classNames('auth-container', 'main-container', style.mainViewContainer);
  return (
    // @ts-ignore OKTA-471233
    <Box
      as="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes}
    >
      {/* @ts-ignore OKTA-471233 */}
      <Box
        flex="auto"
        flexDirection="column"
        borderColor="display"
        maxWidth="full"
        width="full"
        borderRadius="base"
        className={style.siwContainer}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthContainer;