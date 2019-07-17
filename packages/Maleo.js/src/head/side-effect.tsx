/*
  Fully inspired by Next.js' way of handling Header
  The MIT License (MIT)
  Copyright (c) 2016-present ZEIT, Inc.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import React from 'react';

export default class extends React.Component<any> {
  constructor(props: any) {
    super(props);

    if (__IS_SERVER__) {
      props.addMountInstance(this);
      props.emitChange(this);
    }
  }

  componentDidMount() {
    this.props.addMountInstance(this);
    this.props.emitChange(this);
  }
  componentDidUpdate() {
    this.props.emitChange(this);
  }
  componentWillUnmount() {
    this.props.removeMountedInstance(this);
    this.props.emitChange(this);
  }

  render() {
    return null;
  }
}
