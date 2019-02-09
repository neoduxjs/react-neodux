import React from 'react';
import {Store} from 'neodux';

export function createConnect(store: Store) {
  return class extends React.Component<any, any> {
    _sub: Function | undefined;
    constructor(props: any) {
      super(props);
      this.__handleData = this.__handleData.bind(this);
      this.state = {
        data: undefined
      }
    }

    componentDidMount() {
      if (this.props.get) {
        this._sub = store.get(this.props.get).subscribe(this.__handleData);
      }
    }

    componentWillUnmount() {
      if (this._sub) {
        this._sub();
      }
    }

    render() {
      return (
        <React.Fragment>
          { this.props.render(this.state.data, store.actions) }
        </React.Fragment>
      );
    }

    __handleData(data: any) {
      this.setState({data});
    }
  }
}
