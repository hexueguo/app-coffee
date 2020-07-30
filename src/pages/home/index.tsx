import * as React from 'react';

interface IhomeProps {}

interface IhomeState {}

class home extends React.Component<IhomeProps, IhomeState> {
  constructor(props: IhomeProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div>x</div>
        <div>x</div>
      </div>
    );
  }
}

export default home;
