import React from 'react';

import { WrapProps } from '@interfaces/render';

export default class _Wrap extends React.Component<WrapProps, {}> {
  render() {
    const { Container, App, containerProps, appProps } = this.props;

    return (
      <Container {...containerProps}>
        <App {...appProps} />
      </Container>
    );
  }
}
