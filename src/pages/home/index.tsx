import * as React from 'react';

interface IhomeProps {}

interface IhomeState {}

class home extends React.Component<IhomeProps, IhomeState> {
  constructor(props: IhomeProps) {
    super(props);

    this.state = {};
  }

  render() {
    return <h1>This is Home Page!</h1>;
  }
}

export default home;
