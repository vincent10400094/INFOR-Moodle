'use strict'

import React from 'react';
import Article from './Article';

export default class Home extends React.Component {
  render() {
    return (
        <section id='main'>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-8 col-md-offset-2">
                        <Article></Article>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}
