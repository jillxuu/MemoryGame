import React from 'react';

export default class Footer extends React.Component {
  constructor(){
    super();

  }

  render(){
    return (
      <div>
        <div className="footer">
          <a href="https://github.com/dongjinxujill"><i className="fab fa-github" aria-hidden="true"></i></a>
          <a href="https://www.linkedin.com/in/dongjinxu"><i className="fab fa-linkedin" aria-hidden="true"></i></a>
          <a href="https://dongjinxu.com"><i className="fa fa-plus" aria-hidden="true"></i></a>
        </div>
        <p className="copyright">Copyright © Dongjin Xu 2018</p>
      </div>
    );
  }
}
